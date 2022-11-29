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
export default function bigCartesian<
  InputArrays extends Array<any[] | Iterable<any> | (() => Generator<any>)>,
>(
  factors: [...InputArrays],
): Generator<
  {
    [index in keyof InputArrays]: InputArrays[index] extends Array<
      infer InputElement
    >
      ? InputElement
      : InputArrays[index] extends Iterable<infer InputElement>
      ? InputElement
      : InputArrays[index] extends () => Generator<infer InputElement>
      ? InputElement
      : any
  },
  void,
  void
>
