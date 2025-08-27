import { describe, expect, it, vi } from "vitest"

import {
  // ensureFileObject,
  getFileSizeFromUrl,
  isValidBase64,
  isValidColumnName,
  isValidCountryCode,
  isValidCurrencyCode,
  isValidEmail,
  isValidEnumValue,
  isValidFileName,
  isValidGitHubUsername,
  isValidHexColor,
  isValidIPAddress,
  isValidInstagramHandle,
  isValidJson,
  isValidJsonSchema,
  isValidLatitude,
  isValidLongitude,
  isValidMacAddress,
  isValidPassword,
  isValidPhoneNumber,
  isValidPostalCode,
  isValidSlug,
  isValidStrongPassword,
  isValidTime,
  isValidTimeZone,
  isValidTwitterHandle,
  isValidUSPostalCode,
  isValidUrl,
} from "./validate"

// Tests for validators
describe("Validators", () => {
  it("isValidEmail should correctly validate emails", () => {
    expect(isValidEmail("test@example.com")).toBe(true)
    expect(isValidEmail("user.name@example.co.uk")).toBe(true)
    expect(isValidEmail("invalid-email")).toBe(false)
    expect(isValidEmail("@example.com")).toBe(false)
    expect(isValidEmail("user@")).toBe(false)
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
    const testEnums = ["started", "completed", "pending"] as const
    expect(isValidEnumValue("started", testEnums)).toBe(true)
    expect(isValidEnumValue("completed", testEnums)).toBe(true)
    expect(isValidEnumValue("invalid", testEnums)).toBe(false)
  })

  it("isValidHexColor should validate hex color codes", () => {
    expect(isValidHexColor("#FF5733")).toBe(true)
    expect(isValidHexColor("#abc")).toBe(true)
    expect(isValidHexColor("#123456")).toBe(true)
    expect(isValidHexColor("FF5733")).toBe(false)
    expect(isValidHexColor("#GGG")).toBe(false)
  })

  it("isValidMacAddress should validate MAC addresses", () => {
    expect(isValidMacAddress("00:1B:63:84:45:E6")).toBe(true)
    expect(isValidMacAddress("00-1B-63-84-45-E6")).toBe(true)
    expect(isValidMacAddress("001B638445E6")).toBe(false)
    expect(isValidMacAddress("ZZ:1B:63:84:45:E6")).toBe(false)
  })

  it("isValidTime should validate time in HH:mm format", () => {
    expect(isValidTime("12:30")).toBe(true)
    expect(isValidTime("00:00")).toBe(true)
    expect(isValidTime("23:59")).toBe(true)
    expect(isValidTime("24:00")).toBe(false)
    expect(isValidTime("12:60")).toBe(false)
  })

  it("isValidUSPostalCode should validate US postal codes", () => {
    expect(isValidUSPostalCode("12345")).toBe(true)
    expect(isValidUSPostalCode("12345-6789")).toBe(true)
    expect(isValidUSPostalCode("1234")).toBe(false)
    expect(isValidUSPostalCode("ABCDE")).toBe(false)
  })

  it("isValidPostalCode should validate postal codes by country", () => {
    expect(isValidPostalCode("12345", "US")).toBe(true)
    expect(isValidPostalCode("K1A 0B1", "CA")).toBe(true)
    expect(isValidPostalCode("SW1A 1AA", "UK")).toBe(true)
    expect(isValidPostalCode("10115", "DE")).toBe(true)
    expect(isValidPostalCode("75001", "FR")).toBe(true)
  })

  it("isValidCountryCode should validate ISO country codes", () => {
    expect(isValidCountryCode("US")).toBe(true)
    expect(isValidCountryCode("GB")).toBe(true)
    expect(isValidCountryCode("USA")).toBe(false)
    expect(isValidCountryCode("us")).toBe(false)
  })

  it("isValidCurrencyCode should validate ISO currency codes", () => {
    expect(isValidCurrencyCode("USD")).toBe(true)
    expect(isValidCurrencyCode("EUR")).toBe(true)
    expect(isValidCurrencyCode("US")).toBe(false)
    expect(isValidCurrencyCode("usd")).toBe(false)
  })

  it("isValidFileName should validate file names", () => {
    expect(isValidFileName("document.pdf")).toBe(true)
    expect(isValidFileName("my-file_123.txt")).toBe(true)
    expect(isValidFileName("file<>name.doc")).toBe(false)
    expect(isValidFileName("file/name.txt")).toBe(false)
  })

  it("isValidJsonSchema should validate JSON Schema", () => {
    expect(isValidJsonSchema('{"type": "object"}')).toBe(true)
    expect(isValidJsonSchema('{"type": "string", "minLength": 5}')).toBe(true)
    expect(isValidJsonSchema('{"invalid": "schema"}')).toBe(false)
    expect(isValidJsonSchema("not json")).toBe(false)
  })

  it("isValidBase64 should validate Base64 strings", () => {
    expect(isValidBase64("SGVsbG8gV29ybGQ=")).toBe(true)
    expect(isValidBase64("VGVzdA==")).toBe(true)
    expect(isValidBase64("Invalid!@#")).toBe(false)
  })

  it("isValidSlug should validate URL slugs", () => {
    expect(isValidSlug("my-awesome-post")).toBe(true)
    expect(isValidSlug("post-123")).toBe(true)
    expect(isValidSlug("My-Post")).toBe(false)
    expect(isValidSlug("post_123")).toBe(false)
  })

  it("isValidTimeZone should validate time zones", () => {
    expect(isValidTimeZone("America/New_York")).toBe(true)
    expect(isValidTimeZone("Europe/London")).toBe(true)
    expect(isValidTimeZone("Invalid/Zone")).toBe(false)
  })

  it("isValidGitHubUsername should validate GitHub usernames", () => {
    expect(isValidGitHubUsername("octocat")).toBe(true)
    expect(isValidGitHubUsername("user-123")).toBe(true)
    expect(isValidGitHubUsername("-invalid")).toBe(false)
    expect(
      isValidGitHubUsername("toolongusernameexceedingthirtyninecharacterslimit")
    ).toBe(false)
  })

  it("isValidTwitterHandle should validate Twitter handles", () => {
    expect(isValidTwitterHandle("@username")).toBe(true)
    expect(isValidTwitterHandle("username")).toBe(true)
    expect(isValidTwitterHandle("user_name_123")).toBe(true)
    expect(isValidTwitterHandle("toolongusernameexceedingfifteen")).toBe(false)
  })

  it("isValidInstagramHandle should validate Instagram handles", () => {
    expect(isValidInstagramHandle("@username")).toBe(true)
    expect(isValidInstagramHandle("user.name")).toBe(true)
    expect(isValidInstagramHandle("user_name_123")).toBe(true)
    expect(isValidInstagramHandle("user-name")).toBe(false)
  })
})

// it("validateProjectData should appropriately validate and sanitize data", () => {
//   const validData: ValidatedProjectData = {
//     id: "proj_01",
//     orgId: "org_01",
//     name: "Project Name",
//     company: "Company Name",
//     logo: "http://example.com/logo.png",
//     description: "Project description",
//     progress: 50,
//     timeLeft: "2 weeks",
//     timeType: "week" as TimeType, // Use a valid TimeType value here
//     members: [{ name: "John Doe", value: "john.doe" }],
//     status: "completed",
//     startDate: Date.now(),
//     endDate: Date.now() + 100000,
//     budget: 1000,
//   }

//   const result = validateProjectData(validData)
//   expect(result.status).toBe("completed")
//   expect(result.timeType).toBe("week") // Should default
// })

// it("ensureFileObject should correctly convert valid file inputs", async () => {
//   const mockFile = new File(["fileContent"], "filename.txt", {
//     type: "text/plain",
//   })
//   const result = await ensureFileObject(mockFile)
//   expect(result).toBeInstanceOf(File)
//   expect(result?.name).toBe("filename.txt")
// })

describe("getFileSizeFromUrl", () => {
  it("should return file size for a valid URL", async () => {
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

    // Restore original fetch
    global.fetch = _originalFetch
  })

  it("should return null for failed fetch", async () => {
    const _originalFetch = global.fetch
    const mockFetch = vi.fn(() => Promise.reject(new Error("Network error")))
    global.fetch = mockFetch

    // Mock console.error to suppress error logging during test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})

    const size = await getFileSizeFromUrl("http://example.com/file")
    expect(size).toBeNull()

    // Restore mocks
    consoleSpy.mockRestore()
    global.fetch = _originalFetch
  })
})
