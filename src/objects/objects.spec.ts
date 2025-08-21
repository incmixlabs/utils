import { describe, expect, it } from "vitest"
import {
  arrayToCapitalObject,
  deepClone,
  groupBy,
  isEmpty,
  isObject,
  isShallowEqual,
  mergeDeep,
  pick,
} from "./index"

describe("isObject function", () => {
  it("should return true for an empty object", () => {
    expect(isObject({})).toBe(true)
  })

  it("should return true for a non-empty object", () => {
    expect(isObject({ key: "value" })).toBe(true)
  })

  it("should return false for a string", () => {
    expect(isObject("string")).toBe(false)
  })

  it("should return false for an array", () => {
    expect(isObject([1, 2, 3])).toBe(false)
  })

  it("should return false for null", () => {
    expect(isObject(null)).toBe(false)
  })

  it("should return false for undefined", () => {
    expect(isObject(undefined)).toBe(false)
  })

  it("should return false for primitive values", () => {
    expect(isObject(42)).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(Symbol("test"))).toBe(false)
  })
})

describe("arrayToCapitalObject function", () => {
  it("should convert camelCase keys to capitalized values", () => {
    const keys = ["firstName", "lastName", "emailAddress"] as const
    const result = arrayToCapitalObject(keys)
    expect(result).toEqual({
      firstName: "First Name",
      lastName: "Last Name",
      emailAddress: "Email Address",
    })
  })

  it("should handle empty array", () => {
    const result = arrayToCapitalObject([])
    expect(result).toEqual({})
  })

  it("should handle single word keys", () => {
    const keys = ["name", "age"] as const
    const result = arrayToCapitalObject(keys)
    expect(result).toEqual({
      name: "Name",
      age: "Age",
    })
  })
})

describe("mergeDeep function", () => {
  it("should merge simple objects", () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { b: 3, c: 4 }
    const result = mergeDeep(obj1, obj2)
    expect(result).toEqual({ a: 1, b: 3, c: 4 })
  })

  it("should merge nested objects", () => {
    const obj1 = { a: { x: 1, y: 2 }, b: 1 }
    const obj2 = { a: { y: 3, z: 4 }, c: 2 }
    const result = mergeDeep(obj1, obj2)
    expect(result).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 1, c: 2 })
  })

  it("should merge arrays", () => {
    const obj1 = { arr: [1, 2] }
    const obj2 = { arr: [3, 4] }
    const result = mergeDeep(obj1, obj2)
    expect(result).toEqual({ arr: [1, 2, 3, 4] })
  })

  it("should handle empty objects", () => {
    expect(mergeDeep()).toEqual({})
    expect(mergeDeep({}, {})).toEqual({})
  })

  it("should handle null/undefined values", () => {
    const obj1 = { a: 1 }
    const result = mergeDeep(obj1, null, undefined, { b: 2 })
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it("should override primitives with objects", () => {
    const obj1 = { a: 5 }
    const obj2 = { a: { x: 1 } }
    const result = mergeDeep(obj1, obj2)
    expect(result).toEqual({ a: { x: 1 } })
  })
})

describe("isShallowEqual function", () => {
  it("should return true for identical objects", () => {
    const obj = { a: 1, b: 2 }
    expect(isShallowEqual(obj, obj)).toBe(true)
  })

  it("should return true for objects with same shallow properties", () => {
    const obj1 = { a: 1, b: "test" }
    const obj2 = { a: 1, b: "test" }
    expect(isShallowEqual(obj1, obj2)).toBe(true)
  })

  it("should return false for objects with different values", () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, b: 3 }
    expect(isShallowEqual(obj1, obj2)).toBe(false)
  })

  it("should return false for objects with different keys", () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { a: 1, c: 2 }
    expect(isShallowEqual(obj1, obj2)).toBe(false)
  })

  it("should return false for nested objects with different values", () => {
    const obj1 = { a: { x: 1 } }
    const obj2 = { a: { x: 1 } }
    expect(isShallowEqual(obj1, obj2)).toBe(false)
  })

  it("should handle null/undefined", () => {
    expect(isShallowEqual(null as any, {})).toBe(false)
    expect(isShallowEqual({}, null as any)).toBe(false)
  })
})

describe("pick function", () => {
  it("should pick specified keys from object", () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const result = pick(obj, ["a", "c"])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it("should handle non-existent keys", () => {
    const obj = { a: 1, b: 2 }
    const result = pick(obj, ["a", "c" as keyof typeof obj])
    expect(result).toEqual({ a: 1 })
  })

  it("should handle empty keys array", () => {
    const obj = { a: 1, b: 2 }
    const result = pick(obj, [])
    expect(result).toEqual({})
  })

  it("should preserve value types", () => {
    const obj = { a: "string", b: 42, c: true, d: null }
    const result = pick(obj, ["a", "b", "c", "d"])
    expect(result).toEqual({ a: "string", b: 42, c: true, d: null })
  })
})

describe("isEmpty function", () => {
  it("should return true for falsy values", () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty("")).toBe(true)
    expect(isEmpty(0)).toBe(true)
    expect(isEmpty(false)).toBe(true)
  })

  it("should return true for empty objects", () => {
    expect(isEmpty({})).toBe(true)
  })

  it("should return true for empty arrays", () => {
    expect(isEmpty([])).toBe(true)
  })

  it("should return false for non-empty objects", () => {
    expect(isEmpty({ a: 1 })).toBe(false)
  })

  it("should return false for non-empty arrays", () => {
    expect(isEmpty([1])).toBe(false)
  })

  it("should return false for non-object values", () => {
    expect(isEmpty("test")).toBe(false)
    expect(isEmpty(42)).toBe(false)
  })
})

describe("deepClone function", () => {
  it("should clone primitive values", () => {
    expect(deepClone(42)).toBe(42)
    expect(deepClone("test")).toBe("test")
    expect(deepClone(true)).toBe(true)
    expect(deepClone(null)).toBe(null)
  })

  it("should clone Date objects", () => {
    const date = new Date("2023-01-01")
    const cloned = deepClone(date)
    expect(cloned).toEqual(date)
    expect(cloned).not.toBe(date)
  })

  it("should clone arrays", () => {
    const arr = [1, 2, [3, 4]]
    const cloned = deepClone(arr)
    expect(cloned).toEqual(arr)
    expect(cloned).not.toBe(arr)
    expect(cloned[2]).not.toBe(arr[2])
  })

  it("should clone Set objects", () => {
    const set = new Set([1, 2, { a: 1 }])
    const cloned = deepClone(set)
    expect(cloned).toEqual(set)
    expect(cloned).not.toBe(set)
  })

  it("should clone Map objects", () => {
    const map = new Map([
      ["key1", { a: 1 }],
      ["key2", "value"],
    ])
    const cloned = deepClone(map)
    expect(cloned).toEqual(map)
    expect(cloned).not.toBe(map)
  })

  it("should clone nested objects", () => {
    const obj = {
      a: 1,
      b: { c: 2, d: { e: 3 } },
      f: [1, { g: 4 }],
    }
    const cloned = deepClone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.b).not.toBe(obj.b)
    expect(cloned.b.d).not.toBe(obj.b.d)
    expect(cloned.f).not.toBe(obj.f)
  })
})

describe("groupBy function", () => {
  it("should group array items by key function", () => {
    const items = [
      { type: "fruit", name: "apple" },
      { type: "fruit", name: "banana" },
      { type: "vegetable", name: "carrot" },
      { type: "fruit", name: "orange" },
    ]
    const result = groupBy(items, (item) => item.type)
    expect(result).toEqual({
      fruit: [
        { type: "fruit", name: "apple" },
        { type: "fruit", name: "banana" },
        { type: "fruit", name: "orange" },
      ],
      vegetable: [{ type: "vegetable", name: "carrot" }],
    })
  })

  it("should handle empty array", () => {
    const result = groupBy([], () => "key")
    expect(result).toEqual({})
  })

  it("should handle numeric keys", () => {
    const items = [1, 2, 3, 4, 5]
    const result = groupBy(items, (x) => x % 2)
    expect(result).toEqual({
      0: [2, 4],
      1: [1, 3, 5],
    })
  })

  it("should handle string values", () => {
    const words = ["apple", "banana", "apricot", "blueberry"]
    const result = groupBy(words, (word) => word[0])
    expect(result).toEqual({
      a: ["apple", "apricot"],
      b: ["banana", "blueberry"],
    })
  })
})
