// Demo of big-cartesian.
// This file can be directly run:
//   - first install `big-cartesian`
//   - then `node node_modules/big-cartesian/examples/main.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/big-cartesian

// eslint-disable-next-line node/no-missing-import
import bigCartesian from 'big-cartesian'

// Iterate over combinations
// eslint-disable-next-line fp/no-loops
for (const values of bigCartesian([
  ['red', 'blue'],
  ['circle', 'square'],
])) {
  console.log(values)
}
// [ 'red', 'circle' ]
// [ 'red', 'square' ]
// [ 'blue', 'circle' ]
// [ 'blue', 'square' ]

const generator = function* () {
  yield 'circle'
  yield 'square'
}

// Notice we pass the function itself: `generator` not `generator()`
// eslint-disable-next-line fp/no-loops
for (const values of bigCartesian([['red', 'blue'], generator])) {
  console.log(values)
}
// [ 'red', 'circle' ]
// [ 'red', 'square' ]
// [ 'blue', 'circle' ]
// [ 'blue', 'square' ]
