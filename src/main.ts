/**
 * Iterates over each cartesian product combination of `inputs`.
 *
 * @example
 * ```js
 * for (const values of bigCartesian([
 *   ['red', 'blue'],
 *   ['circle', 'square'],
 * ])) {
 *   console.log(values)
 * }
 * // [ 'red', 'circle' ]
 * // [ 'red', 'square' ]
 * // [ 'blue', 'circle' ]
 * // [ 'blue', 'square' ]
 * ```
 */
export default function* bigCartesian<
  InputArrays extends readonly InputArray[],
>(iterables: readonly [...InputArrays]): CartesianProducts<InputArrays> {
  if (!Array.isArray(iterables)) {
    return throwValidation()
  }

  if (iterables.length === 0) {
    return
  }

  const iteratorFuncs = iterables.map(getIteratorFuncs)

  yield* getResults(iteratorFuncs)
}

type CartesianProducts<InputArrays extends readonly InputArray[]> = Generator<
  {
    [index in keyof InputArrays]: InputArrays[index] extends (infer InputElement)[]
      ? InputElement
      : InputArrays[index] extends Iterable<infer InputElement>
        ? InputElement
        : InputArrays[index] extends () => Generator<infer InputElement>
          ? InputElement
          : never
  },
  void,
  void
>

type InputArray = readonly unknown[] | Iterable<unknown> | (() => Generator)

const getIteratorFuncs = (input: InputArray) => {
  const iterator = (input as { [Symbol.iterator]: unknown })[
    Symbol.iterator
  ] as GetIteratorFunc

  if (typeof iterator === 'function') {
    return iterator.bind(input)
  }

  if (typeof input !== 'function') {
    return throwValidation()
  }

  return input
}

type GetIteratorFunc = () => UnknownIterator

type UnknownIterator = Iterator<unknown, undefined>

type UnknownIteratorResult = IteratorResult<unknown, undefined>

type UnknownIteratorYieldResult = IteratorYieldResult<unknown>

// Slower than `fast-cartesian` and other libraries but:
//  - requires much less memory
//  - can handle an infinite number of combinations (`returnValue.length`)
//  - can handle infinitely large inputs (`inputs[index].length`)
//  - can handle 4e9 dimensions (`inputs.length`).
//    This is the maximum size of an array in JavaScript.
const getResults = function* (
  iteratorFuncs: readonly GetIteratorFunc[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Generator<any> {
  const iterators = iteratorFuncs.map(getIterator)
  const results = iterators.map(getInitialValue)

  if (hasEmptyIterators(results)) {
    return
  }

  const result = (results as IteratorYieldResult<unknown>[]).map(getValue)

  // eslint-disable-next-line fp/no-loops
  do {
    yield [...result]
  } while (!getResult(iteratorFuncs, iterators, result))
}

const getIterator = (iteratorFunc: GetIteratorFunc) => {
  const iterator = iteratorFunc()

  if (!isIterator(iterator)) {
    return throwValidation()
  }

  return iterator
}

const throwValidation = () => {
  throw new TypeError('Argument must be an array of arrays or generators')
}

const isIterator = (value: UnknownIterator) =>
  typeof value === 'object' &&
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  value !== null &&
  typeof value.next === 'function'

const getInitialValue = (iterator: UnknownIterator) => iterator.next()

const hasEmptyIterators = (results: UnknownIteratorResult[]) =>
  results.some(isEmptyIterator)

const isEmptyIterator = ({ done }: UnknownIteratorResult) => done!

const getValue = ({ value }: UnknownIteratorYieldResult) => value

// We use imperative code for performance purpose, which is why those ESLint
// rules are disabled.
/* eslint-disable fp/no-let, fp/no-mutation, no-param-reassign, max-depth,
no-plusplus, fp/no-loops, max-statements */
const getResult = (
  iteratorFuncs: readonly GetIteratorFunc[],
  iterators: UnknownIterator[],
  result: unknown[],
) => {
  let reset = false
  let index = iterators.length - 1

  do {
    const iterator = iterators[index]!

    const { done, value } = iterator.next()

    result[index] = value

    if (reset) {
      reset = false
      index--

      if (index === -1) {
        return true
      }
    } else if (done === true) {
      reset = true
      iterators[index] = iteratorFuncs[index]!()
    } else {
      break
    }
  } while (true)

  return false
}
/* eslint-enable fp/no-let, fp/no-mutation, no-param-reassign, max-depth,
no-plusplus, fp/no-loops, max-statements */
