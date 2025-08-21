import { describe, expect, it } from "vitest"
import {
  type Filter,
  type ParserOptions,
  type Sort,
  buildQueryString,
  filterParser,
  sortParser,
} from "./index"

describe("sortParser", () => {
  it("should parse valid sort JSON", () => {
    const input =
      '[{"id": "name", "desc": false}, {"id": "date", "desc": true}]'
    const result = sortParser(input)

    expect(result.data).toEqual([
      { id: "name", desc: false },
      { id: "date", desc: true },
    ])
    expect(result.error).toBeUndefined()
  })

  it("should return error for invalid JSON", () => {
    const result = sortParser("not json")

    expect(result.data).toBeNull()
    expect(result.error).toBe("Invalid JSON format")
  })

  it("should return error for invalid sort schema", () => {
    const input = '[{"id": "name"}]' // missing desc field
    const result = sortParser(input)

    expect(result.data).toBeNull()
    expect(result.error).toBeDefined()
  })

  it("should validate against valid keys", () => {
    const input = '[{"id": "name", "desc": false}]'
    const validKeys = new Set(["date", "amount"])
    const result = sortParser(input, { validKeys })

    expect(result.data).toBeNull()
    expect(result.error).toBe("Invalid sort keys")
  })

  it("should accept valid keys", () => {
    const input = '[{"id": "name", "desc": false}]'
    const validKeys = new Set(["name", "date"])
    const result = sortParser(input, { validKeys })

    expect(result.data).toEqual([{ id: "name", desc: false }])
    expect(result.error).toBeUndefined()
  })

  it("should enforce max items limit", () => {
    const items = Array(5)
      .fill(null)
      .map((_, i) => ({
        id: `field${i}`,
        desc: false,
      }))
    const input = JSON.stringify(items)
    const result = sortParser(input, { maxItems: 3 })

    expect(result.data).toBeNull()
    expect(result.error).toBe("Too many sort items (max: 3)")
  })

  it("should allow items within max limit", () => {
    const items = Array(3)
      .fill(null)
      .map((_, i) => ({
        id: `field${i}`,
        desc: false,
      }))
    const input = JSON.stringify(items)
    const result = sortParser(input, { maxItems: 5 })

    expect(result.data).toHaveLength(3)
    expect(result.error).toBeUndefined()
  })

  it("should throw error when throwOnError is true", () => {
    expect(() => sortParser("not json", { throwOnError: true })).toThrow(
      "Invalid JSON format"
    )
  })

  it("should handle empty array", () => {
    const result = sortParser("[]")

    expect(result.data).toEqual([])
    expect(result.error).toBeUndefined()
  })

  it("should preserve type with generic", () => {
    type CustomSort = Sort<"name" | "date">
    const input = '[{"id": "name", "desc": true}]'
    const result = sortParser<CustomSort>(input)

    expect(result.data).toEqual([{ id: "name", desc: true }])
  })
})

describe("filterParser", () => {
  it("should parse valid filter JSON", () => {
    const input = JSON.stringify([
      {
        id: "name",
        value: "John",
        type: "text",
        operator: "eq",
        rowId: "row1",
      },
      {
        id: "age",
        value: "25",
        type: "number",
        operator: "gt",
        rowId: "row2",
      },
    ])
    const result = filterParser(input)

    expect(result.data).toEqual([
      {
        id: "name",
        value: "John",
        type: "text",
        operator: "eq",
        rowId: "row1",
      },
      {
        id: "age",
        value: "25",
        type: "number",
        operator: "gt",
        rowId: "row2",
      },
    ])
    expect(result.error).toBeUndefined()
  })

  it("should parse filter with array value", () => {
    const input = JSON.stringify([
      {
        id: "status",
        value: ["active", "pending"],
        type: "multi-select",
        operator: "eq",
        rowId: "row1",
      },
    ])
    const result = filterParser(input)

    expect(result.data).toEqual([
      {
        id: "status",
        value: ["active", "pending"],
        type: "multi-select",
        operator: "eq",
        rowId: "row1",
      },
    ])
  })

  it("should return error for invalid JSON", () => {
    const result = filterParser("not json")

    expect(result.data).toBeNull()
    expect(result.error).toBe("Invalid JSON format")
  })

  it("should return error for invalid filter schema", () => {
    const input = '[{"id": "name"}]' // missing required fields
    const result = filterParser(input)

    expect(result.data).toBeNull()
    expect(result.error).toBeDefined()
  })

  it("should validate against valid keys", () => {
    const input = JSON.stringify([
      {
        id: "invalid",
        value: "test",
        type: "text",
        operator: "eq",
        rowId: "row1",
      },
    ])
    const validKeys = new Set(["name", "date"])
    const result = filterParser(input, { validKeys })

    expect(result.data).toBeNull()
    expect(result.error).toBe("Invalid filter keys")
  })

  it("should accept valid keys", () => {
    const input = JSON.stringify([
      {
        id: "name",
        value: "test",
        type: "text",
        operator: "eq",
        rowId: "row1",
      },
    ])
    const validKeys = new Set(["name", "date"])
    const result = filterParser(input, { validKeys })

    expect(result.data).toHaveLength(1)
    expect(result.error).toBeUndefined()
  })

  it("should enforce max items limit", () => {
    const items = Array(10)
      .fill(null)
      .map((_, i) => ({
        id: `field${i}`,
        value: "test",
        type: "text",
        operator: "eq",
        rowId: `row${i}`,
      }))
    const input = JSON.stringify(items)
    const result = filterParser(input, { maxItems: 5 })

    expect(result.data).toBeNull()
    expect(result.error).toBe("Too many filter items (max: 5)")
  })

  it("should allow items within max limit", () => {
    const items = Array(3)
      .fill(null)
      .map((_, i) => ({
        id: `field${i}`,
        value: "test",
        type: "text",
        operator: "eq",
        rowId: `row${i}`,
      }))
    const input = JSON.stringify(items)
    const result = filterParser(input, { maxItems: 5 })

    expect(result.data).toHaveLength(3)
    expect(result.error).toBeUndefined()
  })

  it("should throw error when throwOnError is true", () => {
    expect(() => filterParser("not json", { throwOnError: true })).toThrow(
      "Invalid JSON format"
    )
  })

  it("should handle empty array", () => {
    const result = filterParser("[]")

    expect(result.data).toEqual([])
    expect(result.error).toBeUndefined()
  })

  it("should validate all supported operators", () => {
    const operators = [
      "iLike",
      "notILike",
      "eq",
      "ne",
      "isEmpty",
      "isNotEmpty",
      "lt",
      "lte",
      "gt",
      "gte",
      "isBetween",
      "isRelativeToToday",
      "and",
      "or",
    ]

    for (const operator of operators) {
      const input = JSON.stringify([
        {
          id: "field",
          value: "test",
          type: "text",
          operator,
          rowId: "row1",
        },
      ])
      const result = filterParser(input)

      expect(result.data).toBeDefined()
      expect(result.data?.[0]?.operator).toBe(operator)
    }
  })

  it("should validate all supported column types", () => {
    const types = [
      "text",
      "number",
      "date",
      "boolean",
      "select",
      "multi-select",
    ]

    for (const type of types) {
      const input = JSON.stringify([
        {
          id: "field",
          value: "test",
          type,
          operator: "eq",
          rowId: "row1",
        },
      ])
      const result = filterParser(input)

      expect(result.data).toBeDefined()
      expect(result.data?.[0]?.type).toBe(type)
    }
  })

  it("should preserve type with generic", () => {
    type CustomFilter = Filter<"name" | "age">
    const input = JSON.stringify([
      {
        id: "name",
        value: "John",
        type: "text",
        operator: "eq",
        rowId: "row1",
      },
    ])
    const result = filterParser<CustomFilter>(input)

    expect(result.data?.[0]?.id).toBe("name")
  })
})

describe("buildQueryString", () => {
  it("should build query string from params", () => {
    const params = {
      page: 1,
      pageSize: 10,
      search: "test",
    }
    const result = buildQueryString(params)

    expect(result).toBe("page=1&pageSize=10&search=test")
  })

  it("should handle object values", () => {
    const params = {
      filters: [{ id: "name", value: "test" }],
      page: 1,
    }
    const result = buildQueryString(params)

    expect(result).toContain("filters=%5B%7B%22id%22%3A%22name")
    expect(result).toContain("page=1")
  })

  it("should skip null and undefined values", () => {
    const params = {
      page: 1,
      search: null,
      filter: undefined,
      pageSize: 10,
    }
    const result = buildQueryString(params)

    expect(result).toBe("page=1&pageSize=10")
    expect(result).not.toContain("search")
    expect(result).not.toContain("filter")
  })

  it("should filter by allowed keys", () => {
    const params = {
      page: 1,
      pageSize: 10,
      search: "test",
      private: "secret",
    }
    const allowedKeys = ["page", "pageSize", "search"]
    const result = buildQueryString(params, allowedKeys)

    expect(result).toBe("page=1&pageSize=10&search=test")
    expect(result).not.toContain("private")
  })

  it("should handle empty allowed keys array", () => {
    const params = {
      page: 1,
      pageSize: 10,
    }
    const result = buildQueryString(params, [])

    expect(result).toBe("page=1&pageSize=10")
  })

  it("should handle boolean values", () => {
    const params = {
      active: true,
      deleted: false,
    }
    const result = buildQueryString(params)

    expect(result).toBe("active=true&deleted=false")
  })

  it("should handle number values", () => {
    const params = {
      count: 42,
      ratio: 3.14,
    }
    const result = buildQueryString(params)

    expect(result).toBe("count=42&ratio=3.14")
  })

  it("should handle empty params", () => {
    const result = buildQueryString({})

    expect(result).toBe("")
  })

  it("should handle complex nested objects", () => {
    const params = {
      sort: [
        { id: "name", desc: false },
        { id: "date", desc: true },
      ],
      filters: {
        name: "test",
        age: { min: 18, max: 65 },
      },
    }
    const result = buildQueryString(params)

    expect(result).toContain("sort=")
    expect(result).toContain("filters=")

    const searchParams = new URLSearchParams(result)
    const sortValue = searchParams.get("sort")
    const filtersValue = searchParams.get("filters")

    expect(sortValue).toBeTruthy()
    expect(filtersValue).toBeTruthy()

    if (sortValue) {
      const parsed = JSON.parse(sortValue)
      expect(parsed).toEqual(params.sort)
    }

    if (filtersValue) {
      const parsed = JSON.parse(filtersValue)
      expect(parsed).toEqual(params.filters)
    }
  })

  it("should maintain consistent order", () => {
    const params = {
      zebra: "z",
      alpha: "a",
      beta: "b",
    }
    const result1 = buildQueryString(params)
    const result2 = buildQueryString(params)

    expect(result1).toBe(result2)
  })

  it("should handle special characters", () => {
    const params = {
      search: "hello world & friends",
      emoji: "🚀",
    }
    const result = buildQueryString(params)

    const searchParams = new URLSearchParams(result)
    expect(searchParams.get("search")).toBe("hello world & friends")
    expect(searchParams.get("emoji")).toBe("🚀")
  })
})
