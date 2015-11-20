var test = require('tape')
var Random = require('./')

test('generate node function works', function (t) {
  var opts = {limit: 10}
  var stream = Random.DAG(opts)

  stream.on('data', function (data) {
    console.log(data)
  })

  stream.on('error', function (err) {
    t.ifError(err)
  })

  stream.on('end', function () {
    t.end()
  })
})
