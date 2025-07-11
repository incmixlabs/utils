// @ts-nocheck
import { countriesWithoutMap } from "./countries"
import { countryToCurrency, currencySymbol } from "./currencies"

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
interface CountryData {
  name: string
  flag: string
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
      return countriesObject
    },
    {}
  )

export type Countries = keyof typeof countries

export { timeZones } from "./timezones"
