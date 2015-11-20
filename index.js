var util = require('util')
var random = require('random-js')
var stream = require('readable-stream')
var graphlib = require('graphlib')

module.exports = {
  stream: DAGStream,
  graphlib: DAG
}

function DAG (opts, cb) {
  if ((typeof opts === 'function')) return DAG({}, opts)
  var g = new graphlib.Graph()
  var stream = DAGStream(opts)
  stream.on('data', function (edge) {
    g.setNode(edge.from, {label: edge.from})
    g.setNode(edge.to, {label: edge.to})
    g.setEdge(edge.from, edge.to)
  })
  stream.on('error', cb)
  stream.on('end', function () {
    cb(null, g)
  })
}

function DAGStream (opts) {
  /**
  opts:
    - min_per_rank (int): how 'fat' the DAG should be
    - max_per_rank (int):
    - min_ranks (int): how 'tall' the DAG should be
    - max_ranks (int)
    - probability (float): chance of having an edge
  **/
  var self = this
  if (!(self instanceof DAGStream)) return new DAGStream(opts)
  opts = opts || {}
  self.min_per_rank = opts.min_per_rank || 1
  self.max_per_rank = opts.max_per_rank || 5
  self.probability = opts.probability || 0.3
  self.engine = opts.engine || random.engines.nativeMath
  self.ranks = random.integer(opts.min_ranks || 3, opts.max_ranks || 5)(self.engine)

  self._i = 0
  self.nodes = 1

  stream.Readable.call(self, {objectMode: true, highWaterMark: 16})
}

util.inherits(DAGStream, stream.Readable)

DAGStream.prototype._read = function () {
  var self = this
  if (self._i >= self.ranks) return self._end()
  var new_nodes = random.integer(self.min_per_rank, self.max_per_rank)(self.engine)
  self.nodes += new_nodes
  var pushed = 0
  self._i += 1
  addRank()
  function addRank () {
    for (var j = 0; j < self.nodes; j++) {
      for (var k = 0; k < new_nodes; k++) {
        var rand = random.real(0, 1)(self.engine)
        if (rand < self.probability) {
          pushed += 1
          self.push({from: j, to: k + self.nodes})
        }
      }
    }
    if (pushed < self.min_per_rank) addRank()
  }
}

DAGStream.prototype._end = function () {
  this.push(null)
}
