import test from 'ava'
import bigCartesian from 'big-cartesian'
import { each } from 'test-each'

each(
  [
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
  ],
  ({ title }, { input, output }) => {
    test(`Success | ${title}`, (t) => {
      const iterator = bigCartesian(input)
      t.false(Array.isArray(iterator))
      t.deepEqual([...iterator], output)
    })
  },
)

each(
  [
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
  ],
  ({ title }, input) => {
    test(`Invalid input | ${title}`, (t) => {
      t.throws(() => [...bigCartesian(input)])
    })
  },
)

// We should do 1e10x1 and 32x2, unfortunately that takes hours to complete
each(
  [
    { length: 1e5, size: 1 },
    { length: 21, size: 2 },
  ],
  ({ title }, { length, size }) => {
    test(`High number of combinations | ${title}`, (t) => {
      const args = getBigArray(length, size)

      // eslint-disable-next-line fp/no-loops, no-empty-pattern
      for (const [] of bigCartesian(args)) {
      }

      t.pass()
    })
  },
)

const getBigArray = function (length: number, size: number) {
  return Array.from({ length }, () => Array.from({ length: size }, getTrue))
}

const getTrue = function () {
  return true
}
