import { describe, expect, it } from "vitest"
import { omit } from "./omit"

describe("omit", () => {
  it("should omit keys from object", () => {
    expect(omit(["a", "b"])({ a: "a", b: "b", c: "c" })).toEqual({ c: "c" })
  })
})
it("should handle omitting keys that don't exist", () => {
  expect(omit(["d"])({ a: "a", b: "b", c: "c" })).toEqual({
    a: "a",
    b: "b",
    c: "c",
  })
})

it("should handle empty keys array", () => {
  expect(omit([])({ a: "a", b: "b" })).toEqual({ a: "a", b: "b" })
})

it("should handle empty object", () => {
  expect(omit(["a", "b"])({})).toEqual({})
})
