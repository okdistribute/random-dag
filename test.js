var test = require('tape')
var dag = require('./')

test('basic dag generation', function (t) {
  var stream = dag()

  stream.on('data', function (data) {
    t.ok(data.from)
    t.ok(data.to)
  })

  stream.on('error', function (err) {
    t.ifError(err)
  })

  stream.on('end', function () {
    t.end()
  })
})
