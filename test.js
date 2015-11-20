var test = require('tape')
var graphlib = require('graphlib')
var dag = require('./')

test('basic random dag stream', function (t) {
  var stream = dag.stream()

  stream.on('data', function (data) {
    t.true((typeof data.to) === 'number')
    t.true((typeof data.from) === 'number')
  })

  stream.on('error', function (err) {
    t.ifError(err)
  })

  stream.on('end', function () {
    t.end()
  })
})

test('test graphlib', function (t) {
  dag.graphlib(function (err, g) {
    t.ifError(err)
    var json = graphlib.json.write(g)
    t.true(graphlib.alg.isAcyclic(g))
    t.true(g instanceof graphlib.Graph)
    t.true(json.options.directed)
    t.end()
  })
})
