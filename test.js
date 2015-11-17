var test = require('tape')
var Random = require('./')

test('generate node function works', function (t) {
  var opts = {limit: 10}
  var stream = Random(opts, function () {
    return {index: this._i}
  })

  stream.on('data', function (data) {
    t.equal((typeof data.index), 'number')
  })

  stream.on('error', function (err) {
    t.ifError(err)
  })

  stream.on('end', function () {
    t.end()
  })
})
