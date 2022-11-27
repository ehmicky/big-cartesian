// @ts-nocheck
type InputArray = unknown[] | Iterable<unknown> | (() => Generator<unknown>)

type CartesianProducts<InputArrays extends InputArray[]> = Generator<
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
export default function* bigCartesian<InputArrays extends InputArray[]>(
  iterables: [...InputArrays],
): CartesianProducts<InputArrays> {
  if (!Array.isArray(iterables)) {
    return throwValidation()
  }

  if (iterables.length === 0) {
    return
  }

  const iteratorFuncs = iterables.map(getIteratorFuncs)

  yield* getResults(iteratorFuncs)
}

const getIteratorFuncs = function (input) {
  if (typeof input[Symbol.iterator] === 'function') {
    return input[Symbol.iterator].bind(input)
  }

  if (typeof input !== 'function') {
    return throwValidation()
  }

  return input
}

// Slower than `fast-cartesian` and other libraries but:
//  - requires much less memory
//  - can handle an infinite number of combinations (`returnValue.length`)
//  - can handle infinitely large inputs (`inputs[index].length`)
//  - can handle 4e9 dimensions (`inputs.length`).
//    This is the maximum size of an array in JavaScript.
const getResults = function* (iteratorFuncs) {
  const iterators = iteratorFuncs.map(getIterator)
  const results = iterators.map(getInitialValue)

  if (hasEmptyIterators(results)) {
    return
  }

  const result = results.map(getValue)

  // eslint-disable-next-line fp/no-loops
  do {
    yield [...result]
  } while (!getResult(iteratorFuncs, iterators, result))
}

const getIterator = function (iteratorFunc) {
  const iterator = iteratorFunc()

  if (!isIterator(iterator)) {
    return throwValidation()
  }

  return iterator
}

const throwValidation = function () {
  throw new TypeError('Argument must be an array of arrays or generators')
}

const isIterator = function (value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.next === 'function'
  )
}

const getInitialValue = function (iterator) {
  return iterator.next()
}

const hasEmptyIterators = function (results) {
  return results.some(isEmptyIterator)
}

const isEmptyIterator = function ({ done }) {
  return done
}

const getValue = function ({ value }) {
  return value
}

// We use imperative code for performance purpose, which is why those ESLint
// rules are disabled.
/* eslint-disable fp/no-let, fp/no-mutation, no-param-reassign, max-depth,
no-plusplus, fp/no-loops, max-statements, complexity */
const getResult = function (iteratorFuncs, iterators, result) {
  let reset = false
  let index = iterators.length - 1

  do {
    const iterator = iterators[index]

    const { done, value } = iterator.next()

    result[index] = value

    if (reset) {
      reset = false
      index--

      if (index === -1) {
        return true
      }
    } else if (done) {
      reset = true
      iterators[index] = iteratorFuncs[index]()
    } else {
      break
    }
  } while (true)
}
/* eslint-enable fp/no-let, fp/no-mutation, no-param-reassign, max-depth,
no-plusplus, fp/no-loops, max-statements, complexity */
