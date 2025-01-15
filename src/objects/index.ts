import { camelToCapitalized } from "../strings"
export type AffixObj = {
  parent?: object
  child?: object | string
  separator?: string
}
export function arrayToCapitalObject<T extends string>(
  keys: T[]
): Record<T, any> {
  return keys.reduce(
    (obj, key) => {
      obj[key] = camelToCapitalized(key)
      return obj
    },
    {} as Record<T, any>
  )
}

export function isObject(obj: any) {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj)
}
