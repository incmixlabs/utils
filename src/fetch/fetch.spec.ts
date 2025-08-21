import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { FetchError, secureFetch } from "./index"

// Mock global fetch
const mockFetch = vi.fn()
vi.stubGlobal("fetch", mockFetch)

describe("FetchError class", () => {
  // … existing tests …
})

describe("secureFetch function", () => {
  afterEach(() => {
    vi.clearAllTimers()
    mockFetch.mockReset()
    vi.useRealTimers()
  })

  afterAll(() => {
    vi.unstubAllGlobals()
  })

  // … existing tests …
})
describe("FetchError class", () => {
  it("should create FetchError with correct properties", () => {
    const error = new FetchError(
      "Test error",
      404,
      "https://example.com",
      "Not found"
    )

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(FetchError)
    expect(error.name).toBe("FetchError")
    expect(error.message).toBe("Test error")
    expect(error.status).toBe(404)
    expect(error.url).toBe("https://example.com")
    expect(error.responseText).toBe("Not found")
  })

  it("should create FetchError without responseText", () => {
    const error = new FetchError("Test error", 500, "https://example.com")

    expect(error.responseText).toBeUndefined()
  })
})

describe("secureFetch function", () => {
  beforeEach(() => {
    mockFetch.mockClear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should make successful GET request", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ data: "test" }),
      headers: {
        get: vi.fn().mockReturnValue("application/json"),
      },
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await secureFetch("https://example.com/api")

    expect(mockFetch).toHaveBeenCalledWith("https://example.com/api", {
      signal: expect.any(AbortSignal),
      credentials: "same-origin",
      headers: {},
    })
    expect(result).toEqual({ data: "test" })
  })

  it("should make successful POST request with JSON", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
      headers: {
        get: vi.fn().mockReturnValue("application/json"),
      },
    }
    mockFetch.mockResolvedValue(mockResponse)

    const postData = { name: "test" }
    const result = await secureFetch("https://example.com/api", {
      method: "POST",
      json: postData,
    })

    expect(mockFetch).toHaveBeenCalledWith("https://example.com/api", {
      method: "POST",
      signal: expect.any(AbortSignal),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
    expect(result).toEqual({ success: true })
  })

  it("should handle non-JSON responses", async () => {
    const mockResponse = {
      ok: true,
      text: vi.fn().mockResolvedValue("plain text response"),
      headers: {
        get: vi.fn().mockReturnValue("text/plain"),
      },
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await secureFetch("https://example.com/api")

    expect(result).toBe("plain text response")
  })

  it("should handle blob responses", async () => {
    const mockBlob = new Blob(["test"], { type: "application/octet-stream" })
    const mockResponse = {
      ok: true,
      blob: vi.fn().mockResolvedValue(mockBlob),
      headers: {
        get: vi.fn().mockReturnValue("application/octet-stream"),
      },
    }
    mockFetch.mockResolvedValue(mockResponse)

    const result = await secureFetch("https://example.com/api")

    expect(result).toBe(mockBlob)
  })

  it("should throw FetchError for HTTP error status", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      text: vi.fn().mockResolvedValue("Not found"),
    }
    mockFetch.mockResolvedValue(mockResponse)

    await expect(secureFetch("https://example.com/api")).rejects.toThrow(
      FetchError
    )
    await expect(secureFetch("https://example.com/api")).rejects.toThrow(
      "Request failed with status 404"
    )
  })

  it("should handle error when reading response text fails", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: vi.fn().mockRejectedValue(new Error("Failed to read text")),
    }
    mockFetch.mockResolvedValue(mockResponse)

    await expect(secureFetch("https://example.com/api")).rejects.toThrow(
      FetchError
    )
  })

  it("should handle timeout", async () => {
    const abortError = new Error("The operation was aborted")
    abortError.name = "AbortError"
    mockFetch.mockRejectedValue(abortError)

    await expect(
      secureFetch("https://example.com/api", { timeout: 1000 })
    ).rejects.toThrow(FetchError)
  })

  it("should retry on failure", async () => {
    vi.useRealTimers() // Use real timers for this test

    mockFetch
      .mockRejectedValueOnce(new Error("Network error"))
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: true }),
        headers: {
          get: vi.fn().mockReturnValue("application/json"),
        },
      })

    const result = await secureFetch("https://example.com/api", {
      retries: 2,
      retryDelay: 10, // Reduce delay for faster test
    })

    expect(mockFetch).toHaveBeenCalledTimes(3)
    expect(result).toEqual({ success: true })

    vi.useFakeTimers() // Return to fake timers
  })

  it("should fail after max retries", async () => {
    vi.useRealTimers() // Use real timers for this test

    mockFetch.mockRejectedValue(new Error("Network error"))

    await expect(
      secureFetch("https://example.com/api", {
        retries: 2,
        retryDelay: 10, // Reduce delay for faster test
      })
    ).rejects.toThrow(FetchError)

    expect(mockFetch).toHaveBeenCalledTimes(3) // Initial + 2 retries

    vi.useFakeTimers() // Return to fake timers
  })

  it("should handle AbortError", async () => {
    const abortError = new Error("The operation was aborted")
    abortError.name = "AbortError"
    mockFetch.mockRejectedValue(abortError)

    await expect(secureFetch("https://example.com/api")).rejects.toThrow(
      FetchError
    )
    await expect(secureFetch("https://example.com/api")).rejects.toThrow(
      "Request timeout"
    )
  })

  it("should handle unknown errors", async () => {
    mockFetch.mockRejectedValue("Unknown error")

    await expect(secureFetch("https://example.com/api")).rejects.toThrow(
      FetchError
    )
    await expect(secureFetch("https://example.com/api")).rejects.toThrow(
      "Unknown error occurred"
    )
  })

  it("should preserve custom headers", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({}),
      headers: {
        get: vi.fn().mockReturnValue("application/json"),
      },
    }
    mockFetch.mockResolvedValue(mockResponse)

    await secureFetch("https://example.com/api", {
      headers: {
        Authorization: "Bearer token",
        "Custom-Header": "value",
      },
    })

    expect(mockFetch).toHaveBeenCalledWith("https://example.com/api", {
      signal: expect.any(AbortSignal),
      credentials: "same-origin",
      headers: {
        Authorization: "Bearer token",
        "Custom-Header": "value",
      },
    })
  })

  it("should merge JSON headers with custom headers", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({}),
      headers: {
        get: vi.fn().mockReturnValue("application/json"),
      },
    }
    mockFetch.mockResolvedValue(mockResponse)

    await secureFetch("https://example.com/api", {
      json: { data: "test" },
      headers: {
        Authorization: "Bearer token",
      },
    })

    expect(mockFetch).toHaveBeenCalledWith("https://example.com/api", {
      signal: expect.any(AbortSignal),
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token",
      },
      body: '{"data":"test"}',
    })
  })

  it("should handle custom credentials", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({}),
      headers: {
        get: vi.fn().mockReturnValue("application/json"),
      },
    }
    mockFetch.mockResolvedValue(mockResponse)

    await secureFetch("https://example.com/api", {
      credentials: "include",
    })

    expect(mockFetch).toHaveBeenCalledWith("https://example.com/api", {
      signal: expect.any(AbortSignal),
      credentials: "include",
      headers: {},
    })
  })

  it("should handle no timeout", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({}),
      headers: {
        get: vi.fn().mockReturnValue("application/json"),
      },
    }
    mockFetch.mockResolvedValue(mockResponse)

    await secureFetch("https://example.com/api", { timeout: 0 })

    expect(mockFetch).toHaveBeenCalledWith("https://example.com/api", {
      signal: expect.any(AbortSignal),
      credentials: "same-origin",
      headers: {},
    })
  })
})
