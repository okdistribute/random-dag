# random-graph
[![NPM](https://nodei.co/npm/random-graph.png)](https://nodei.co/npm/random-graph/)


## Example
```js
var dag = require('random-dag')
var opts = {
  max_per_rank: 5, // how 'fat' the DAG should be
  min_per_rank: 1,
  max_ranks: 3, // how 'tall' the DAG should be
  min_ranks: 5,
  probability: 0.3 // chance of having an edge
}
var stream = dag(opts)
stream.on('data', function (data) {
  // {from: 0, to: 1}
})
```
