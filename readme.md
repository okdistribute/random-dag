# random-dag

Create a random Directed Acyclic Graph as a stream or as a `graphlib` object.

```npm install random-dag```

[![build status](http://img.shields.io/travis/karissa/random-dag.svg?style=flat)](http://travis-ci.org/karissa/random-dag)

## API

### `dag.stream(opts)`

```js
var dag = require('random-dag')
var opts = {
  max_per_rank: 5, // how 'fat' the DAG should be
  min_per_rank: 1,
  max_ranks: 3, // how 'tall' the DAG should be
  min_ranks: 5,
  probability: 0.3 // chance of having an edge
}
var stream = dag.stream(opts)
stream.on('data', function (data) {
  // {from: 0, to: 1}
})
```

### `dag.graphlib(opts, cb)`

Can provide optional options as a first argument, same as above stream.

```js
var graphlib = require('graphlib')
var dag = require('random-dag')
dag.graphlib(function (err, g) {
  // g is a graphlib.Graph object
  console.log(graphlib.alg.isAcyclic(g)) // true
})
```

### Credits

Reimplementation of [this stackoverflow post](http://stackoverflow.com/questions/12790337/generating-a-random-dag) in Node.js
