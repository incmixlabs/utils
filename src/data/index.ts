import { default as countriesWithoutMap } from "./countries"

function getFlag(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
export const countries = countriesWithoutMap.map((country) => ({
  ...country,
  flag: getFlag(country.code),
}))

export { timeZones } from "./timezones"
