import test from 'ava'
import { format } from 'pretty-format'

import bigCartesian from 'big-cartesian'

const getTitle = function (args: unknown) {
  return format(args, { min: true })
}

const ARGS = [
  { input: [], output: [] },
  { input: [[]], output: [] },
  { input: [[], []], output: [] },
  { input: [[0]], output: [[0]] },
  { input: [[0], [1]], output: [[0, 1]] },
  { input: [[0, 1]], output: [[0], [1]] },
  {
    input: [[0, 1], [2]],
    output: [
      [0, 2],
      [1, 2],
    ],
  },
  {
    input: [
      [0, 1],
      [2, 3],
    ],
    output: [
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
    ],
  },
  {
    input: [
      [0, 1, 2],
      [3, 2],
    ],
    output: [
      [0, 3],
      [0, 2],
      [1, 3],
      [1, 2],
      [2, 3],
      [2, 2],
    ],
  },
  { input: [[[0]]], output: [[[0]]] },
  { input: [[0, undefined, 1]], output: [[0], [undefined], [1]] },
  {
    input: [
      [0, 1],
      function* generator() {
        yield* [4, 5]
      },
    ],
    output: [
      [0, 4],
      [0, 5],
      [1, 4],
      [1, 5],
    ],
  },
  {
    input: [[0], new Set([2, 3])],
    output: [
      [0, 2],
      [0, 3],
    ],
  },
]
ARGS.forEach(({ input, output }) => {
  test(`iterate | ${getTitle(input)}`, (t) => {
    const iterator = bigCartesian(input as unknown[][])
    t.false(Array.isArray(iterator))
    t.deepEqual([...iterator], output)
  })
})

const INVALID_ARGS = [
  true,
  [undefined],
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
    t.throws(() => [...bigCartesian(args as never)])
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

    // eslint-disable-next-line fp/no-loops, no-empty-pattern
    for (const [] of bigCartesian(args)) {
    }

    t.pass()
  })
})

const getBigArray = function (length: number, size: number) {
  return Array.from({ length }, () => Array.from({ length: size }, getTrue))
}

const getTrue = function () {
  return true
}
