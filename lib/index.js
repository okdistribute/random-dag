var util = require('util')
var stream = require('readable-stream')

function Random (opts, genNode) {
  /**
  opts:
    - num (int): number of nodes to generate
    - probability (float): prob that any node is connected to another node
    - directed (bool): if it is a directed graph
    - cyclic (bool): if it is a cyclic graph (allow self-loops)
  **/
  if ((typeof opts) === 'function') return new Random({}, opts)
  if (!(this instanceof Random)) return new Random(opts, genNode)
  if (!opts) opts = {}
  this._limit = opts.limit || 1
  this._i = 0
  this.nodes = []
  this.genNode = genNode || function () { return {'hello': 'world'} }
  stream.Readable.call(this, {objectMode: true, highWaterMark: 16})
}

util.inherits(Random, stream.Readable)

Random.prototype._read = function () {
  if (this._i >= this._limit) return this._end()
  var node = this.genNode()
  this.push(node)
  this._i += 1
  this.nodes.push(node)
}

Random.prototype._end = function () {
  this.push(null)
}
