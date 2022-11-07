[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/big-cartesian)
[![Browsers](https://img.shields.io/badge/-Browsers-808080?logo=firefox&colorA=404040)](https://unpkg.com/big-cartesian?module)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/types/main.d.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/big-cartesian)
[![Minified size](https://img.shields.io/bundlephobia/minzip/big-cartesian?label&colorA=404040&colorB=808080&logo=webpack)](https://bundlephobia.com/package/big-cartesian)
[![Twitter](https://img.shields.io/badge/-Twitter-808080.svg?logo=twitter&colorA=404040)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

Cartesian product for big inputs.

Retrieves every possible combination between several arrays
([cartesian product](https://en.wikipedia.org/wiki/Cartesian_product)):

- can handle an infinite number of combinations
- requires almost no memory

This module is perfect when you combine hundreds of arrays or when those arrays
produce millions of combinations. Otherwise you should use
[`fast-cartesian`](https://github.com/ehmicky/fast-cartesian) instead as it is
much faster.

# Example

<!-- eslint-disable fp/no-loops -->

```js
import bigCartesian from 'big-cartesian'

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
```

# Demo

You can try this library:

- either directly [in your browser](https://repl.it/@ehmicky/big-cartesian).
- or by executing the [`examples` files](examples/README.md) in a terminal.

# Install

```
npm install big-cartesian
```

This package works in both Node.js >=14.18.0 and browsers. It is an ES module
and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## bigCartesian(inputs)

`inputs`: `Array<Array | Iterable | GeneratorFunction>`\
_Return value_: [`Iterable<Array>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

Iterates over each combination of `inputs`.

## Limits

This works with an infinite number of combinations.

Arrays in JavaScript have a size limit of 4 trillions of elements. You can
bypass this limit by using iterables or generator functions instead.

<!-- eslint-disable fp/no-loops -->

```js
import bigCartesian from 'big-cartesian'

const generator = function* () {
  // This generator can generate an infinite number of elements
}

// Notice we pass the function itself: `generator` not `generator()`
for (const values of bigCartesian([['red', 'blue'], generator])) {
  console.log(values)
}
```

# Benchmarks

See the
[following benchmarks](https://github.com/ehmicky/fast-cartesian#benchmarks).

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

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
