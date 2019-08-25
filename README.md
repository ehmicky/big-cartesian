[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/big-cartesian.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/big-cartesian)
[![Travis](https://img.shields.io/badge/cross-platform-4cc61e.svg?logo=travis)](https://travis-ci.org/ehmicky/big-cartesian)
[![Node](https://img.shields.io/node/v/big-cartesian.svg?logo=node.js)](https://www.npmjs.com/package/big-cartesian)
[![Gitter](https://img.shields.io/gitter/room/ehmicky/big-cartesian.svg?logo=gitter)](https://gitter.im/ehmicky/big-cartesian)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

Cartesian product for big inputs.

Retrieves every possible combination between several arrays
([cartesian product](https://en.wikipedia.org/wiki/Cartesian_product)):
  - can handle an infinite number of combinations
  - requires almost no memory

This module is perfect when you combine hundreds of arrays or when those arrays
produce millions of combinations. Otherwise, you should use
[`fast-cartesian`](https://github.com/ehmicky/fast-cartesian)
instead as it is much faster.

# Example

<!-- eslint-disable fp/no-loops -->

```js
const cartesian = require('big-cartesian')

for (const values of cartesian([['red', 'blue'], ['circle', 'square']])) {
  console.log(values)
}
// [ 'red', 'circle' ]
// [ 'red', 'square' ]
// [ 'blue', 'circle' ]
// [ 'blue', 'square' ]
```

# Demo

You can try this library:

- either directly [in your browser](https://repl.it/@ehmicky/big-cartesian).
- or by executing the [`examples` files](examples/README.md) in a terminal.

# Install

```
npm install big-cartesian
```

# Usage

<!-- eslint-disable fp/no-loops, no-empty -->

```js
const cartesian = require('big-cartesian')

for (const combination of iterate([['red', 'blue', ['circle','square']]])) {
}
```

# API

## bigCartesian(inputs)

`inputs`: `Array<Array | Generator>`<br> _Return value_:
[`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

Iterates over each combination of `inputs`.

## Limits

This works with an infinite number of combinations.

Arrays in JavaScript have a size limit of 4 trillions of elements. You can
bypass this limit by using a generator function instead.

<!-- eslint-disable fp/no-loops, no-empty -->

```js
const generator = function*() {
  // This generator can generate an infinite number of elements
}

// Notice we pass the function itself: `generator` not `generator()`
for (const combination of iterate([['red', 'blue'], generator])) {
}
```

# Benchmarks

See the [following benchmarks](https://github.com/ehmicky/fast-cartesian#benchmarks).

# Support

If you found a bug or would like a new feature, _don't hesitate_ to
[submit an issue on GitHub](../../issues).

For other questions, feel free to
[chat with us on Gitter](https://gitter.im/ehmicky/big-cartesian).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/big-cartesian/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/big-cartesian/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
