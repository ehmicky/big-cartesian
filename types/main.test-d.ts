import { expectType, expectNever, expectError } from 'tsd'

import bigCartesian from 'big-cartesian'

for (const [a, b] of bigCartesian([
  [true, 'a'],
  [1, 2],
])) {
  expectType<string | boolean>(a)
  expectType<number>(b)
}

for (const [] of bigCartesian([])) {
}
expectType<Generator<[], void, void>>(bigCartesian([]))

for (const [a] of bigCartesian([[]])) {
  expectNever(a)
}
expectType<Generator<[never], void, void>>(bigCartesian([[]]))

expectError(bigCartesian(true))
expectError(bigCartesian([], 'a'))
expectError(bigCartesian([[true, 'a'], 1]))
expectError(bigCartesian([true, 'a'], [1, 2]))

for (const [a, b] of bigCartesian([[true], 'abcde'])) {
  expectType<boolean>(a)
  expectType<string>(b)
}
expectType<Generator<[boolean, string], void, void>>(
  bigCartesian([[true], 'abcde']),
)

const generator = function* () {
  yield 'a'
}
for (const [a, b] of bigCartesian([[true], generator])) {
  expectType<boolean>(a)
  expectType<string>(b)
}
expectType<Generator<[boolean, string], void, void>>(
  bigCartesian([[true], generator]),
)
