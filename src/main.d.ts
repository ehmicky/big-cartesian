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
export default function bigCartesian<InputArrays extends InputArray[]>(
  factors: [...InputArrays],
): CartesianProducts<InputArrays>
