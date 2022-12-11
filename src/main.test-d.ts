import bigCartesian from 'big-cartesian'
import { expectType, expectNever } from 'tsd'

const emptyArray = [] as const
const oneEmptyArray = [emptyArray] as const
const firstArray = [0, 1] as const
const secondArray = [2, 3] as const
const stringArg = 'abcde'

const generator = function* () {
  yield 'a'
}

expectType<Generator<[0 | 1, 2 | 3], void, void>>(
  bigCartesian([firstArray, secondArray] as const),
)
expectType<Generator<[], void, void>>(bigCartesian(emptyArray))
expectType<Generator<[never], void, void>>(bigCartesian(oneEmptyArray))
expectType<Generator<[0 | 1, string], void, void>>(
  bigCartesian([firstArray, stringArg] as const),
)

expectType<Generator<[0 | 1, string], void, void>>(
  bigCartesian([firstArray, generator] as const),
)

/* eslint-disable fp/no-loops */
for (const [one, two] of bigCartesian([firstArray, secondArray] as const)) {
  expectType<0 | 1>(one)
  expectType<2 | 3>(two)
}

// eslint-disable-next-line no-empty-pattern, no-empty
for (const [] of bigCartesian(emptyArray)) {
}

for (const [one] of bigCartesian(oneEmptyArray)) {
  expectNever(one)
}

for (const [one, two] of bigCartesian([firstArray, stringArg] as const)) {
  expectType<0 | 1>(one)
  expectType<string>(two)
}

for (const [one, two] of bigCartesian([firstArray, generator] as const)) {
  expectType<0 | 1>(one)
  expectType<string>(two)
}
/* eslint-enable fp/no-loops */

// @ts-expect-error
bigCartesian(0)
// @ts-expect-error
bigCartesian(emptyArray, 0)
// @ts-expect-error
bigCartesian([firstArray, 0])
// @ts-expect-error
bigCartesian(firstArray, secondArray)
