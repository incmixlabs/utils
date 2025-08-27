export const omit =
  <T extends object, K extends keyof T>(keys: readonly K[]) =>
  (obj: T): Omit<T, K> => {
    const result = {} as Omit<T, K>

    for (const key in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        !keys.includes(key as unknown as K)
      ) {
        ;(result as any)[key] = obj[key]
      }
    }

    return result
  }
