import { describe, expect, it } from "vitest"
import { capitalizedToCamel, isJSONString as isJSON } from "./index"
// adjust the path as needed

describe("isJSON", () => {
  it("should return true for valid JSON objects", () => {
    expect(isJSON("{}")).toBe(true)
    expect(isJSON('{"key": "value"}')).toBe(true)
    expect(isJSON('{"key": 123}')).toBe(true)
    expect(isJSON('{"key": true}')).toBe(true)
    expect(isJSON('{"key": null}')).toBe(true)
    expect(isJSON('{"key": [1, 2, 3]}')).toBe(true)
    expect(isJSON('{"key": {"nestedKey": "nestedValue"}}')).toBe(true)
  })

  it("should return true for valid JSON arrays", () => {
    expect(isJSON("[]")).toBe(true)
    expect(isJSON("[1, 2, 3]")).toBe(true)
    expect(isJSON('[{"key": "value"}, {"key2": "value2"}]')).toBe(true)
    expect(isJSON('[null, false, true, 123, "string"]')).toBe(true)
  })

  it("should return false for invalid JSON strings", () => {
    expect(isJSON("")).toBe(false)
    expect(isJSON("{key: value}")).toBe(false)
    expect(isJSON('{"key": value}')).toBe(false)
    expect(isJSON('{"key": "value"')).toBe(false)
    expect(isJSON('{"key": "value",}')).toBe(false)
    expect(isJSON('"string"')).toBe(false) // Not wrapped in an array or object
    expect(isJSON("123")).toBe(false) // Not wrapped in an array or object
  })

  it("should return false for non-JSON strings", () => {
    expect(isJSON("Hello, World!")).toBe(false)
    expect(isJSON("123, 456, 789")).toBe(false)
    expect(isJSON("true")).toBe(false) // Not wrapped in an array or object
    expect(isJSON("false")).toBe(false) // Not wrapped in an array or object
  })

  it("should return true for JSON strings with spaces and newlines", () => {
    expect(isJSON(' { "key": "value" } ')).toBe(true)
    expect(isJSON(' {\n"key": "value"\n} ')).toBe(true)
    expect(isJSON('[\n  {"key": "value"}\n]')).toBe(true)
  })
})

describe("capitalizedToCamel", () => {
  it("should convert capitalized words to camelCase", () => {
    const input = "Hello World Example Test"
    const expectedOutput = "helloWorldExampleTest"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle single-word input", () => {
    const input = "Hello"
    const expectedOutput = "hello"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle input where all words are already camel case", () => {
    const input = "helloWorldExampleTest"
    const expectedOutput = "helloworldexampletest"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle an empty string", () => {
    const input = ""
    const expectedOutput = ""
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle strings with multiple spaces between words", () => {
    const input = "Hello    World"
    const expectedOutput = "helloWorld"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle strings with leading and trailing spaces", () => {
    const input = " Hello World "
    const expectedOutput = "helloWorld"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle strings with mixed casing", () => {
    const input = "HeLLo WoRLd ExamPLe"
    const expectedOutput = "helloWorldExample"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should return lowercase if the word is in uppercase", () => {
    const input = "HELLO"
    const expectedOutput = "hello"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should correctly format input with non-letter characters", () => {
    const input = "Hello_World Example-Test"
    const expectedOutput = "hello_worldExample-test"
    console.log("capitalizedToCamel(input): ", capitalizedToCamel(input))
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle numeric characters correctly", () => {
    const input = "Hello World 123"
    const expectedOutput = "helloWorld123"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })
})
