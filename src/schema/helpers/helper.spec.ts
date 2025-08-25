import { describe, expect, it, vi } from "vitest"
import {
  generateNameBasedId,
  generateSlug,
  generateUniqueId,
  getCurrentTimestamp,
  getCurrentUser,
  getDefaultUser,
} from "./helper" // Replace with your actual module path

describe("generateUniqueId", () => {
  it("should generate a unique id with default length", () => {
    const id = generateUniqueId()
    expect(id).toHaveLength(10)
  })

  it("should generate a unique id with specified length", () => {
    const length = 15
    const id = generateUniqueId(undefined, length)
    expect(id).toHaveLength(length)
  })

  it("should generate a unique id with a prefix", () => {
    const prefix = "test"
    const id = generateUniqueId(prefix)
    expect(id.startsWith(`${prefix}-`)).toBe(true)
  })

  it("should generate unique ids at each call", () => {
    const id1 = generateUniqueId()
    const id2 = generateUniqueId()
    expect(id1).not.toBe(id2)
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
    expect(id).toBe("sample-name")
  })

  it("should append counter when id already exists", async () => {
    const name = "Duplicate Name"
    const checkExists = vi
      .fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValue(false)
    const id = await generateNameBasedId(name, checkExists)
    expect(id).toBe("duplicate-name-1")
  })

  it("should fallback to random id with name prefix after max attempts", async () => {
    const name = "Unlucky Name"
    const checkExists = vi.fn().mockResolvedValue(true)
    const id = await generateNameBasedId(name, checkExists, 2)
    expect(id.startsWith("unlucky-name-")).toBe(true)
    expect(id).toHaveLength(23)
  })

  it("should use random id when name is empty", async () => {
    const checkExists = vi.fn().mockResolvedValue(false)
    const id = await generateNameBasedId("", checkExists)
    expect(id).toHaveLength(10)
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
      image: "/placeholder-avatar.png",
    })
  })
})

describe("getCurrentUser", () => {
  it("should return the current user object", () => {
    const user = getCurrentUser()
    expect(user).toEqual({
      id: "user-id",
      name: "Current User",
      image: "/placeholder.svg",
    })
  })
})
