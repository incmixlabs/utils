import { describe, expect, it } from "vitest"
import { countriesWithoutMap } from "./countries"
import { countryToCurrency, currencySymbol } from "./currencies"
import { countries, getFlag } from "./index"

describe("getFlag", () => {
  it("should return the correct flag for a valid country code", () => {
    expect(getFlag("US")).toBe("🇺🇸")
    expect(getFlag("IN")).toBe("🇮🇳")
    expect(getFlag("JP")).toBe("🇯🇵")
  })

  it("should handle lowercase country codes correctly", () => {
    expect(getFlag("us")).toBe("🇺🇸")
    expect(getFlag("in")).toBe("🇮🇳")
  })

  it("should return an empty string for invalid country code", () => {
    expect(getFlag("")).toBe("")
  })
})

describe("countries object", () => {
  it("should have correct structure and data for a country", () => {
    expect(countries["US"]).toEqual({
      name: "United States",
      short: "US",
      flag: "🇺🇸",
      currency: {
        code: "USD",
        symbol: "$",
      },
    })

    expect(countries["IN"]).toEqual({
      name: "India",
      flag: "🇮🇳",
      currency: {
        code: "INR",
        symbol: "₹",
      },
    })
  })
})
