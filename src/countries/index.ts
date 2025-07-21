// @ts-nocheck
import { countriesWithoutMap } from "./countries"
import { countryToCurrency, currencySymbol } from "./currencies"
/*
export function getFlag(countryCode: string) {
  if (!countryCode || countryCode.trim() === "") {
    return ""
  }

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
*/
export function getFlag(countryCode: string): string {
  // Convert the country code to uppercase to ensure consistency
  if (!countryCode) {
    return ""
  }
  const trimmedCode = countryCode.trim()
  if (!trimmedCode) {
    return ""
  }
  const upperCaseCode = trimmedCode.toUpperCase()

  // Check if the country code is exactly two letters long
  if (upperCaseCode.length !== 2) {
    // Return a default or handle invalid input as needed
    return "🇺🇸" // White flag emoji as a fallback
  }

  // Map each letter to its corresponding Regional Indicator Symbol Unicode point
  // The 'A' regional indicator symbol starts at U+1F1E6.
  // We add the character code of the letter (A=0, B=1, etc.) to this base.
  const regionalIndicatorSymbols = upperCaseCode
    .split("")
    .map((char) =>
      String.fromCodePoint(0x1f1e6 + (char.charCodeAt(0) - "A".charCodeAt(0)))
    )

  // Join the two regional indicator symbols to form the flag emoji
  return regionalIndicatorSymbols.join("")
}

interface CountryData {
  name: string
  flag: string
  short?: string
  currency: {
    code: string
    symbol: string
  }
}

export const countries: Record<string, CountryData> =
  countriesWithoutMap.reduce(
    (countriesObject: Record<string, CountryData>, country) => {
      const code = countryToCurrency[country.code] ?? "USD"
      countriesObject[country.code] = {
        name: country.name,
        flag: getFlag(country.code),
        currency: {
          code: code,
          symbol: currencySymbol[code] ?? "$",
        },
      }
      if (country.short) {
        countriesObject[country.code] = {
          ...countriesObject[country.code],
          short: country.short,
        }
      }
      return countriesObject
    },
    {}
  )

export type Countries = keyof typeof countries

export { timeZones } from "./timezones"
