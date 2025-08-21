import { camelToCapitalized } from "../strings"

export interface AffixObj {
  parent?: object
  child?: object | string
  separator?: string
}

export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

export type DeepRequired<T> = T extends object
  ? { [P in keyof T]-?: DeepRequired<T[P]> }
  : T

export function arrayToCapitalObject<T extends string>(
  keys: readonly T[]
): Record<T, string> {
  return keys.reduce(
    (obj, key) => {
      obj[key] = camelToCapitalized(key)
      return obj
    },
    {} as Record<T, string>
  )
}
export function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj)
}

export function mergeDeep<T extends Record<string, any>>(...objects: T[]): T {
  if (objects.length === 0) return {} as T

  return objects.reduce((prev, obj) => {
    if (!obj) return prev

    Object.keys(obj).forEach((key) => {
      const pVal = prev[key]
      const oVal = obj[key]

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        ;(prev as any)[key] = [...pVal, ...oVal]
      } else if (isObject(pVal) && isObject(oVal)) {
        ;(prev as any)[key] = mergeDeep(pVal, oVal)
      } else {
        ;(prev as any)[key] = oVal
      }
    })

    return prev
  }, {} as T)
}

export function isShallowEqual(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
): boolean {
  if (obj1 === obj2) return true
  if (!obj1 || !obj2) return false

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  return keys1.every((key) => Object.is(obj1[key], obj2[key]))
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }

  return result
}

export function isEmpty(obj: unknown): boolean {
  if (!obj) return true

  if (typeof obj === "object") {
    if (Array.isArray(obj)) return obj.length === 0
    return Object.keys(obj).length === 0
  }

  return false
}

export function deepClone<T>(obj: T): T {
  // Fast path where available
  if (typeof (globalThis as any).structuredClone === "function") {
    try {
      return (globalThis as any).structuredClone(obj)
    } catch {
      // fall through to manual clone
    }
  }

  const seen = new WeakMap<object, any>()

  const clone = <U>(value: U): U => {
    if (value === null || typeof value !== "object") return value

    // Handle known built-ins
    if (value instanceof Date) return new Date(value.getTime()) as unknown as U
    if (value instanceof RegExp)
      return new RegExp(value.source, value.flags) as unknown as U
    if (Array.isArray(value))
      return (value as unknown as unknown[]).map((v) =>
        clone(v)
      ) as unknown as U
    if (value instanceof Set)
      return new Set(Array.from(value, (v) => clone(v))) as unknown as U
    if (value instanceof Map)
      return new Map(
        Array.from(value.entries(), ([k, v]) => [clone(k), clone(v)])
      ) as unknown as U

    // Cycle handling
    if (seen.has(value as unknown as object)) {
      return seen.get(value as unknown as object)
    }

    // Preserve prototype and property descriptors
    const proto = Object.getPrototypeOf(value as object)
    const result = Object.create(proto)
    seen.set(value as unknown as object, result)

    for (const key of Reflect.ownKeys(value as object)) {
      const desc = Object.getOwnPropertyDescriptor(
        value as object,
        key as PropertyKey
      )
      if (!desc) continue
      if ("value" in desc) {
        desc.value = clone((value as any)[key as any])
      }
      Object.defineProperty(result, key, desc)
    }
    return result
  }

  return clone(obj)
}

export function groupBy<T, K extends string | number | symbol>(
  array: readonly T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce(
    (result, item) => {
      const key = keyFn(item)
      if (!result[key]) {
        result[key] = []
      }
      result[key].push(item)
      return result
    },
    {} as Record<K, T[]>
  )
}
export * from "./omit"
