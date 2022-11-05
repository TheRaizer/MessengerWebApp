/**
 * Pushes properties from a partial typed object onto another object with the same type except it is not partial.
 *
 * @param original The original object to be modified (mutated).
 * @param partialObject The object whose properties will be pushed onto the original object.
 * @returns the updated original object.
 */
export const updateObjectWithPartial = <T>(
  original: T,
  partialObject: Partial<T>
) => {
  for (const key in original) {
    const newVal = partialObject[key];
    if (newVal) {
      original[key] = newVal as T[Extract<keyof T, string>];
    }
  }

  return original;
};
