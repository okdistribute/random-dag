var util = require('util')
var random = require('random-js')
var stream = require('readable-stream')

module.exports = DAG

function DAG (opts) {
  /**
  opts:
    - min_per_rank (int): how 'fat' the DAG should be
    - max_per_rank (int):
    - min_ranks (int): how 'tall' the DAG should be
    - max_ranks (int)
    - probability (float): chance of having an edge
  **/
  if (!(this instanceof DAG)) return new DAG(opts)
  this.opts = opts || {}
  this.min_per_rank = opts.min_per_rank || 1
  this.max_per_rank = opts.max_per_rank || 5
  this.probability = opts.probability || 0.3
  this.engine = opts.engine || random.engines.nativeMath
  this.ranks = random.integer(opts.min_ranks || 3, opts.max_ranks || 5)(this.engine)

  this._i = 0
  this.nodes = 1

  stream.Readable.call(this, {objectMode: true, highWaterMark: 16})
}

util.inherits(DAG, stream.Readable)

DAG.prototype._read = function () {
  if (this._i >= this.ranks) return this._end()
  var new_nodes = random.integer(this.min_per_rank, this.max_per_rank)(this.engine)
  for (var j = 0; j < this.nodes; j++) {
    for (var k = 0; k < new_nodes; k++) {
      var rand = random.real(0, 1)(this.engine)
      if (rand < this.probability) this.push({from: j, to: k + this.nodes})
    }
  }
  this.nodes += new_nodes
  this._i += 1
}

DAG.prototype._end = function () {
  this.push(null)
}
