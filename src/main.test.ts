import test from 'ava'
import bigCartesian from 'big-cartesian'
import { each } from 'test-each'

const generator = function* () {
  yield* [-1, -2]
}

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
      input: [[0, 1], generator],
      output: [
        [0, -1],
        [0, -2],
        [1, -1],
        [1, -2],
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
      const iterator = bigCartesian(input as unknown[][])
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
    [() => ({})],
    [() => null],
    [() => ({ next: true })],
  ],
  ({ title }, input) => {
    test(`Invalid input | ${title}`, (t) => {
      t.throws(() => [...bigCartesian(input as unknown as unknown[][])])
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

const getBigArray = (length: number, size: number) =>
  Array.from({ length }, () => Array.from({ length: size }, getTrue))

const getTrue = () => true
