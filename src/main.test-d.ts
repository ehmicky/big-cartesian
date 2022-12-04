/* eslint-disable fp/no-loops */
import bigCartesian from 'big-cartesian'
import { expectType, expectNever } from 'tsd'

for (const [one, two] of bigCartesian([
  [true, 'a'],
  [1, 2],
])) {
  expectType<string | boolean>(one)
  expectType<number>(two)
}

// eslint-disable-next-line no-empty-pattern, no-empty
for (const [] of bigCartesian([])) {
}

expectType<Generator<[], void, void>>(bigCartesian([]))

for (const [one] of bigCartesian([[]])) {
  expectNever(one)
}

expectType<Generator<[never], void, void>>(bigCartesian([[]]))

// @ts-expect-error
bigCartesian(true)
// @ts-expect-error
bigCartesian([], 'a')
// @ts-expect-error
bigCartesian([[true, 'a'], 1])
// @ts-expect-error
bigCartesian([true, 'a'], [1, 2])

for (const [one, two] of bigCartesian([[true], 'abcde'])) {
  expectType<boolean>(one)
  expectType<string>(two)
}

expectType<Generator<[boolean, string], void, void>>(
  bigCartesian([[true], 'abcde']),
)

const generator = function* () {
  yield 'a'
}

for (const [one, two] of bigCartesian([[true], generator])) {
  expectType<boolean>(one)
  expectType<string>(two)
}

expectType<Generator<[boolean, string], void, void>>(
  bigCartesian([[true], generator]),
)
/* eslint-enable fp/no-loops */
