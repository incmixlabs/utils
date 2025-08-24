import { describe, expect, it } from "vitest"
import {
  camelToCapitalize,
  camelToCapitalized,
  camelize,
  capitalize,
  capitalizedToCamel,
  decodeHTML,
  encodeHTML,
  getInitials,
  isJSONString as isJSON,
  isNumeric,
  kebabCase,
  pascalCase,
  snakeCase,
  strEnum,
  substituteVariables,
  truncate,
} from "./index"

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

  it("should return false for non-string input", () => {
    expect(isJSON(123)).toBe(false)
    expect(isJSON(null)).toBe(false)
    expect(isJSON(undefined)).toBe(false)
    expect(isJSON({})).toBe(false)
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

describe("camelize function", () => {
  it("should convert kebab-case to camelCase", () => {
    expect(camelize("hello-world")).toBe("helloWorld")
    expect(camelize("first-name-last-name")).toBe("firstNameLastName")
  })

  it("should convert snake_case to camelCase", () => {
    expect(camelize("hello_world")).toBe("helloWorld")
    expect(camelize("first_name_last_name")).toBe("firstNameLastName")
  })

  it("should handle mixed separators", () => {
    expect(camelize("hello-world_test")).toBe("helloWorldTest")
  })

  it("should handle empty string", () => {
    expect(camelize("")).toBe("")
  })

  it("should handle single word", () => {
    expect(camelize("hello")).toBe("hello")
  })

  it("should lowercase first character if uppercase", () => {
    expect(camelize("Hello-World")).toBe("helloWorld")
  })
})

describe("isNumeric function", () => {
  it("should return true for valid numbers", () => {
    expect(isNumeric("123")).toBe(true)
    expect(isNumeric("123.45")).toBe(true)
    expect(isNumeric("-123")).toBe(true)
    expect(isNumeric("0")).toBe(true)
    expect(isNumeric("0.0")).toBe(true)
  })

  it("should return false for non-numeric strings", () => {
    expect(isNumeric("abc")).toBe(false)
    expect(isNumeric("123abc")).toBe(false)
    expect(isNumeric("")).toBe(false)
    expect(isNumeric("   ")).toBe(false)
  })

  it("should return false for non-string input", () => {
    expect(isNumeric(null as any)).toBe(false)
    expect(isNumeric(undefined as any)).toBe(false)
    expect(isNumeric(123 as any)).toBe(false)
  })

  it("should handle strings with whitespace", () => {
    expect(isNumeric(" 123 ")).toBe(true)
    expect(isNumeric(" 123.45 ")).toBe(true)
  })
})

describe("capitalize function", () => {
  it("should capitalize first letter", () => {
    expect(capitalize("hello")).toBe("Hello")
    expect(capitalize("HELLO")).toBe("Hello")
    expect(capitalize("hELLO")).toBe("Hello")
  })

  it("should handle empty string", () => {
    expect(capitalize("")).toBe("")
  })

  it("should handle single character", () => {
    expect(capitalize("a")).toBe("A")
    expect(capitalize("A")).toBe("A")
  })
})

describe("strEnum function", () => {
  it("should create enum object from array", () => {
    const colors = ["red", "green", "blue"] as const
    const result = strEnum(colors)
    expect(result).toEqual({
      red: "red",
      green: "green",
      blue: "blue",
    })
  })

  it("should handle empty array", () => {
    const result = strEnum([])
    expect(result).toEqual({})
  })
})

describe("camelToCapitalize function", () => {
  it("should convert camelCase to CAPITALIZED", () => {
    expect(camelToCapitalize("helloWorld")).toBe("HELLO WORLD")
    expect(camelToCapitalize("firstName")).toBe("FIRST NAME")
  })

  it("should handle empty string", () => {
    expect(camelToCapitalize("")).toBe("")
  })

  it("should handle single word", () => {
    expect(camelToCapitalize("hello")).toBe("HELLO")
  })
})

describe("camelToCapitalized function", () => {
  it("should convert camelCase to Capitalized", () => {
    expect(camelToCapitalized("helloWorld")).toBe("Hello World")
    expect(camelToCapitalized("firstName")).toBe("First Name")
  })

  it("should handle empty string", () => {
    expect(camelToCapitalized("")).toBe("")
  })

  it("should handle single word", () => {
    expect(camelToCapitalized("hello")).toBe("Hello")
  })
})

describe("getInitials function", () => {
  it("should get initials from full name", () => {
    expect(getInitials("John Doe")).toBe("JD")
    expect(getInitials("Alice Bob Charlie")).toBe("AB")
  })

  it("should handle single name", () => {
    expect(getInitials("John")).toBe("JO")
  })

  it("should handle empty string", () => {
    expect(getInitials("")).toBe("")
  })

  it("should handle extra whitespace", () => {
    expect(getInitials("  John   Doe  ")).toBe("JD")
  })
})

describe("encodeHTML function", () => {
  it("should encode HTML entities", () => {
    expect(encodeHTML("<div>")).toBe("&lt;div&gt;")
    expect(encodeHTML("Tom & Jerry")).toBe("Tom &amp; Jerry")
    expect(encodeHTML('"Hello"')).toBe("&quot;Hello&quot;")
    expect(encodeHTML("'Hello'")).toBe("&#039;Hello&#039;")
  })

  it("should handle empty string", () => {
    expect(encodeHTML("")).toBe("")
  })

  it("should handle string without HTML entities", () => {
    expect(encodeHTML("Hello World")).toBe("Hello World")
  })
})

describe("decodeHTML function", () => {
  it("should decode HTML entities", () => {
    expect(decodeHTML("&lt;div&gt;")).toBe("<div>")
    expect(decodeHTML("Tom &amp; Jerry")).toBe("Tom & Jerry")
    expect(decodeHTML("&quot;Hello&quot;")).toBe('"Hello"')
    expect(decodeHTML("&#039;Hello&#039;")).toBe("'Hello'")
  })

  it("should handle empty string", () => {
    expect(decodeHTML("")).toBe("")
  })

  it("should handle string without HTML entities", () => {
    expect(decodeHTML("Hello World")).toBe("Hello World")
  })
})

describe("truncate function", () => {
  it("should truncate long strings", () => {
    expect(truncate("Hello World", 5)).toBe("He...")
    expect(truncate("Hello World", 8)).toBe("Hello...")
  })

  it("should not truncate short strings", () => {
    expect(truncate("Hello", 10)).toBe("Hello")
    expect(truncate("Hello", 5)).toBe("Hello")
  })

  it("should handle custom suffix", () => {
    expect(truncate("Hello World", 5, ">>")).toBe("Hel>>")
  })

  it("should handle empty string", () => {
    expect(truncate("", 5)).toBe("")
  })
})

describe("kebabCase function", () => {
  it("should convert camelCase to kebab-case", () => {
    expect(kebabCase("helloWorld")).toBe("hello-world")
    expect(kebabCase("firstName")).toBe("first-name")
  })

  it("should convert spaces to hyphens", () => {
    expect(kebabCase("hello world")).toBe("hello-world")
  })

  it("should convert underscores to hyphens", () => {
    expect(kebabCase("hello_world")).toBe("hello-world")
  })

  it("should handle empty string", () => {
    expect(kebabCase("")).toBe("")
  })
})

describe("snakeCase function", () => {
  it("should convert camelCase to snake_case", () => {
    expect(snakeCase("helloWorld")).toBe("hello_world")
    expect(snakeCase("firstName")).toBe("first_name")
  })

  it("should convert spaces to underscores", () => {
    expect(snakeCase("hello world")).toBe("hello_world")
  })

  it("should convert hyphens to underscores", () => {
    expect(snakeCase("hello-world")).toBe("hello_world")
  })

  it("should handle empty string", () => {
    expect(snakeCase("")).toBe("")
  })
})

describe("pascalCase function", () => {
  it("should convert to PascalCase", () => {
    expect(pascalCase("hello-world")).toBe("HelloWorld")
    expect(pascalCase("hello_world")).toBe("HelloWorld")
    expect(pascalCase("hello world")).toBe("HelloWorld")
  })

  it("should handle empty string", () => {
    expect(pascalCase("")).toBe("")
  })

  it("should handle single word", () => {
    expect(pascalCase("hello")).toBe("Hello")
  })
})

describe("substituteVariables function", () => {
  it("should replace single variable", () => {
    const template = "Hello [name]!"
    const data = { name: "World" }
    expect(substituteVariables(template, data)).toBe("Hello World!")
  })

  it("should replace multiple variables", () => {
    const template = "Hello [firstName] [lastName], you are [age] years old"
    const data = { firstName: "John", lastName: "Doe", age: 30 }
    expect(substituteVariables(template, data)).toBe(
      "Hello John Doe, you are 30 years old"
    )
  })

  it("should handle multiple occurrences of same variable", () => {
    const template = "[name] is awesome! [name] rocks!"
    const data = { name: "TypeScript" }
    expect(substituteVariables(template, data)).toBe(
      "TypeScript is awesome! TypeScript rocks!"
    )
  })

  it("should preserve placeholders for missing variables", () => {
    const template = "Hello [name], welcome to [place]"
    const data = { name: "Alice" }
    expect(substituteVariables(template, data)).toBe(
      "Hello Alice, welcome to [place]"
    )
  })

  it("should handle empty template", () => {
    const template = ""
    const data = { name: "World" }
    expect(substituteVariables(template, data)).toBe("")
  })

  it("should handle empty data object", () => {
    const template = "Hello [name]!"
    const data = {}
    expect(substituteVariables(template, data)).toBe("Hello [name]!")
  })

  it("should handle template with no variables", () => {
    const template = "Hello World!"
    const data = { name: "Test" }
    expect(substituteVariables(template, data)).toBe("Hello World!")
  })

  it("should handle different data types", () => {
    const template = "[string] [number] [boolean] [null] [undefined]"
    const data = {
      string: "text",
      number: 42,
      boolean: true,
      null: null,
      undefined: undefined,
    }
    expect(substituteVariables(template, data)).toBe(
      "text 42 true null [undefined]"
    )
  })

  it("should handle variables with numeric characters", () => {
    const template = "[var1] and [var2]"
    const data = { var1: "first", var2: "second" }
    expect(substituteVariables(template, data)).toBe("first and second")
  })

  it("should handle nested brackets in non-variable context", () => {
    const template = "Array[0] is [value]"
    const data = { value: "test" }
    expect(substituteVariables(template, data)).toBe("Array[0] is test")
  })

  it("should handle variables at start and end of template", () => {
    const template = "[start] middle [end]"
    const data = { start: "BEGIN", end: "END" }
    expect(substituteVariables(template, data)).toBe("BEGIN middle END")
  })

  it("should handle adjacent variables", () => {
    const template = "[first][second]"
    const data = { first: "Hello", second: "World" }
    expect(substituteVariables(template, data)).toBe("HelloWorld")
  })
})
