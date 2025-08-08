export function camelize(str: string) {
  return str.replace(
    /(?:^\w|[A-Z]|\b\w|\s+)/g,
    (match: string, index: number) => {
      if (+match === 0) return "" // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase()
    }
  )
}
export function isNumeric(str: string) {
  return (
    !Number.isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !Number.isNaN(Number.parseFloat(str))
  ) // ...and ensure strings of whitespace fail
}
export function isJSONString(str: any): boolean {
  if (typeof str !== "string") {
    return false
  }

  try {
    const parsed = JSON.parse(str)
    // Only accept objects and arrays as "JSON strings"
    return typeof parsed === "object" && parsed !== null
  } catch {
    return false
  }
}

export function capitalize(str: string) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1)
}

export function strEnum<T extends string>(o: T[]): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key
    return res
  }, Object.create(null))
}
export function camelToCapitalize(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()
}

// console.log(camelToCapitalize('camelCaseString')); // Output: CAMEL CASE STRING
export function camelToCapitalized(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase())
}

export const getInitials = (name: string) => {
  if (!name) return ""
  return (
    name
      .match(/(\b\S)?/g)
      ?.join("")
      .match(/(^\S|\S$)?/g)
      ?.join("")
      .toUpperCase() || ""
  )
}
// console.log(capitalizedToCamel("This Is A Capitalized Sentence"); // Output: thisIsACapitalizedSentence
export function capitalizedToCamel(str: string): string {
  const words = str.trim().split(" ")
  const camelCase = words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join("")
  return camelCase
}

export function encodeHTML(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
export function decodeHTML(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
}
