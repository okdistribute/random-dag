#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2))
var dag = require('./')
var stream = dag.stream(args)

stream.on('data', function (data) {
  console.log(data)
})
