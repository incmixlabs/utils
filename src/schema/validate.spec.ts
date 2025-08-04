import { describe, expect, it, vi } from "vitest"

import { VALID_STATUSES } from "./types"
import type { TimeType, ValidatedProjectData } from "./types"

import {
  ensureFileObject,
  getFileSizeFromUrl,
  isValidColumnName,
  isValidEmail,
  isValidEnumValue,
  isValidIPAddress,
  isValidJson,
  isValidLatitude,
  isValidLongitude,
  isValidPassword,
  isValidPhoneNumber,
  isValidStrongPassword,
  isValidUrl,
  validateProjectData,
} from "./validate"

// Tests for validators
describe("Validators", () => {
  it("isValidEmail should correctly validate emails", () => {
    expect(isValidEmail("test@example.com")).toBe(true)
    expect(isValidEmail("invalid-email")).toBe(false)
  })
})

it("isValidPassword should validate basic password rules", () => {
  expect(isValidPassword("Password123")).toBe(true)
  expect(isValidPassword("short1")).toBe(false)
})

it("isValidStrongPassword should validate complex password rules", () => {
  expect(isValidStrongPassword("StrongPass1!")).toBe(true)
  expect(isValidStrongPassword("weakpass")).toBe(false)
})

it("isValidColumnName should validate SQL-like column names", () => {
  expect(isValidColumnName("valid_column")).toBe(true)
  expect(isValidColumnName("1invalid")).toBe(false)
})

it("isValidUrl should validate URLs with given options", () => {
  expect(isValidUrl("http://example.com")).toBe(true)
  expect(isValidUrl("ftp://example.com")).toBe(true)
  expect(isValidUrl("invalid-url")).toBe(false)
})

it("isValidPhoneNumber should validate E.164 formatted phone numbers", () => {
  expect(isValidPhoneNumber("+12345678901")).toBe(true)
  expect(isValidPhoneNumber("123456")).toBe(false)
  expect(isValidPhoneNumber("12345678901")).toBe(true) // Should pass due to auto-prefix  expect(isValidPhoneNumber("123456")).toBe(false) // Too short
  expect(isValidPhoneNumber("+")).toBe(false) // Just plus sign
  expect(isValidPhoneNumber("")).toBe(false) // Empty string
})

it("isValidJson should correctly validate JSON", () => {
  expect(isValidJson('{"key": "value"}')).toBe(true)
  expect(isValidJson("invalid-json")).toBe(false)
})

it("isValidIPAddress should validate IP addresses", () => {
  expect(isValidIPAddress("192.168.0.1")).toBe(true)
  expect(isValidIPAddress("256.256.256.256")).toBe(false)
})

it("isValidLatitude should validate latitude values", () => {
  expect(isValidLatitude("45.123")).toBe(true)
  expect(isValidLatitude("100.123")).toBe(false)
})

it("isValidLongitude should validate longitude values", () => {
  expect(isValidLongitude("-75.123")).toBe(true)
  expect(isValidLongitude("200.123")).toBe(false)
})

it("isValidEnumValue should validate against enumerated values", () => {
  expect(isValidEnumValue("started", VALID_STATUSES)).toBe(true)
  expect(isValidEnumValue("invalid", VALID_STATUSES)).toBe(false)
})

it("validateProjectData should appropriately validate and sanitize data", () => {
  const validData: ValidatedProjectData = {
    id: "proj_01",
    orgId: "org_01",
    name: "Project Name",
    company: "Company Name",
    logo: "http://example.com/logo.png",
    description: "Project description",
    progress: 50,
    timeLeft: "2 weeks",
    timeType: "week" as TimeType, // Use a valid TimeType value here
    members: [{ name: "John Doe", value: "john.doe" }],
    status: "completed",
    startDate: Date.now(),
    endDate: Date.now() + 100000,
    budget: 1000,
  }

  const result = validateProjectData(validData)
  expect(result.status).toBe("completed")
  expect(result.timeType).toBe("week") // Should default
})

it("ensureFileObject should correctly convert valid file inputs", async () => {
  const mockFile = new File(["fileContent"], "filename.txt", {
    type: "text/plain",
  })
  const result = await ensureFileObject(mockFile)
  expect(result).toBeInstanceOf(File)
  expect(result?.name).toBe("filename.txt")
})

it("getFileSizeFromUrl should return file size for a valid URL", async () => {
  // Mock fetch to work in this test
  const _originalFetch = global.fetch
  const mockFetch = vi.fn(() =>
    Promise.resolve({
      headers: {
        get: () => "1024",
      },
      ok: true,
    } as unknown as Response)
  )
  global.fetch = mockFetch
  const size = await getFileSizeFromUrl("http://example.com/file")
  expect(size).toBe(1024)
})
