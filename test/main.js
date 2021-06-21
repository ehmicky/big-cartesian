import test from 'ava'
import bigCartesian from 'big-cartesian'
import prettyFormat from 'pretty-format'

const getTitle = function (args) {
  return prettyFormat(args, { min: true })
}

const ARGS = [
  [],
  [[]],
  [[], []],
  [[0]],
  [[0], [1]],
  [[0, 1]],
  [[0, 1], [2]],
  [
    [0, 1],
    [2, 3],
  ],
  [
    [0, 1, 2],
    [3, 2],
  ],
  [[[0]]],
  [[0, undefined, 1]],
  [
    [0, 1],
    function* generator() {
      yield* [2, 3]
    },
  ],
  [[0, 1], new Set([2, 3])],
]
ARGS.forEach((args) => {
  test(`iterate | ${getTitle(args)}`, (t) => {
    t.snapshot(bigCartesian(args))
  })
})

const INVALID_ARGS = [
  true,
  [undefined],
  // eslint-disable-next-line unicorn/no-null
  [null],
  [[], true],
  [() => true],
  [
    function getObject() {
      return {}
    },
  ],
  [
    function getNull() {
      // eslint-disable-next-line unicorn/no-null
      return null
    },
  ],
  [
    function getInvalidIterator() {
      return { next: true }
    },
  ],
]
INVALID_ARGS.forEach((args) => {
  test(`should throw | ${getTitle(args)}`, (t) => {
    // eslint-disable-next-line max-nested-callbacks
    t.throws(() => [...bigCartesian(args)])
  })
})

// We should do 1e10x1 and 32x2, unfortunately that takes hours to complete
const COMBINATIONS_ITERATE = [
  { length: 1e5, size: 1 },
  { length: 21, size: 2 },
]
COMBINATIONS_ITERATE.forEach(({ length, size }) => {
  test(`iterate | should not throw on high number of combinations | ${length}x${size}`, (t) => {
    const args = getBigArray(length, size)

    // eslint-disable-next-line fp/no-loops, no-empty, no-empty-pattern
    for (const [] of bigCartesian(args)) {
    }

    t.pass()
  })
})

const getBigArray = function (length, size) {
  return Array.from({ length }, () => Array.from({ length: size }, getTrue))
}

const getTrue = function () {
  return true
}
