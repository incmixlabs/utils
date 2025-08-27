import { describe, expect, it, vi } from "vitest"
import {
  generateNameBasedId,
  generateSlug,
  getBigID,
  getBigUUID,
  getCurrentTimestamp,
  getCurrentUser,
  getDefaultUser,
  getTransactionTime,
  parseBUUID,
} from "./helper"

describe("getBigID", () => {
  it("should generate a BigInt ID", () => {
    const id = getBigID()
    expect(typeof id).toBe("bigint")
    expect(id).toBeGreaterThan(0n)
  })

  it("should generate different IDs when called multiple times", async () => {
    const id1 = getBigID()
    // Small delay to ensure different timestamp
    await new Promise((resolve) => setTimeout(resolve, 1))
    const id2 = getBigID()
    expect(id1).not.toBe(id2)
  })

  it("should use custom offset", () => {
    const offset = BigInt(1000)
    const id1 = getBigID(offset)
    const id2 = getBigID(BigInt(0))
    expect(id2).toBeGreaterThan(id1)
  })
})

describe("getBigUUID", () => {
  it("should generate a formatted UUID string", () => {
    const uuid = getBigUUID({ id: BigInt(Date.now()) * 1000000n, mn: "test" })
    expect(typeof uuid).toBe("string")
    expect(uuid).toContain("test_")
    expect(uuid.split("_").length).toBe(3)
  })
})

describe("parseBUUID", () => {
  it("should parse a valid UUID", () => {
    const bigId = BigInt(Date.now()) * 1000000n
    const uuid = getBigUUID({ id: bigId, mn: "test" })
    const parsed = parseBUUID(uuid)

    expect(parsed).not.toBeNull()
    expect(parsed?.mn).toBe("test")
    expect(typeof parsed?.timestamp).toBe("number")
  })

  it("should return null for invalid UUID", () => {
    const parsed = parseBUUID("invalid-uuid")
    expect(parsed).toBeNull()
  })
})

describe("getTransactionTime", () => {
  it("should extract Temporal.Instant from UUID", () => {
    const bigId = BigInt(Date.now()) * 1000000n
    const uuid = getBigUUID({ id: bigId, mn: "test" })
    const instant = getTransactionTime(uuid)

    expect(instant).not.toBeNull()
    expect(instant?.epochNanoseconds).toBe(bigId)
  })

  it("should return null for invalid UUID", () => {
    const instant = getTransactionTime("invalid")
    expect(instant).toBeNull()
  })
})

describe("generateSlug", () => {
  it("should create a URL-friendly slug from a string", () => {
    const text = "This is Sample Text"
    const expectedSlug = "this-is-sample-text"
    const slug = generateSlug(text)
    expect(slug).toBe(expectedSlug)
  })

  it("should remove special characters from the text", () => {
    const text = "Hello, World! @ 2021"
    const expectedSlug = "hello-world-2021"
    const slug = generateSlug(text)
    expect(slug).toBe(expectedSlug)
  })

  it("should convert consecutive spaces into a single hyphen", () => {
    const text = "Hello    World"
    const expectedSlug = "hello-world"
    const slug = generateSlug(text)
    expect(slug).toBe(expectedSlug)
  })

  it("should ensure lowercase conversion", () => {
    const text = "JavaScript Is Awesome"
    const expectedSlug = "javascript-is-awesome"
    const slug = generateSlug(text)
    expect(slug).toBe(expectedSlug)
  })
})

describe("generateNameBasedId", () => {
  it("should generate a unique name-based id", async () => {
    const name = "Sample Name"
    const checkExists = vi.fn().mockResolvedValue(false)
    const id = await generateNameBasedId(name, checkExists)
    expect(id).toBe("sample-nam") // MAX_SLUG_LENGTH = 10
  })

  it("should append counter when id already exists", async () => {
    const name = "Duplicate Name"
    const checkExists = vi
      .fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValue(false)
    const id = await generateNameBasedId(name, checkExists)
    expect(id).toBe("duplicate-name_1") // Uses JOIN_CHAR = '_' for counter
  })

  it("should fallback to random id after max attempts", async () => {
    const name = "Unlucky Name"
    const checkExists = vi.fn().mockResolvedValue(true)
    const id = await generateNameBasedId(name, checkExists, 2)
    expect(id).toHaveLength(10) // MAX_SLUG_LENGTH
    expect(typeof id).toBe("string")
  })

  it("should use timestamp hash when name is empty", async () => {
    const checkExists = vi.fn().mockResolvedValue(false)
    const id = await generateNameBasedId("", checkExists)
    expect(typeof id).toBe("string")
    expect(id.length).toBeGreaterThan(0)
    expect(id.length).toBeLessThanOrEqual(10)
  })
})

describe("getCurrentTimestamp", () => {
  it("should return the current timestamp", () => {
    const timestamp = getCurrentTimestamp()
    expect(timestamp).toBeLessThanOrEqual(Date.now())
  })
})

describe("getDefaultUser", () => {
  it("should return the default user object", () => {
    const user = getDefaultUser()
    expect(user).toEqual({
      id: "system-default",
      name: "System",
      src: "/placeholder-avatar.png",
    })
  })
})

describe("getCurrentUser", () => {
  it("should return the current user object", () => {
    const user = getCurrentUser()
    expect(user).toEqual({
      id: "user-id",
      name: "Current User",
      src: "/placeholder.svg",
    })
  })
})
