export function camelize(str: string): string {
  if (!str) return ""
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, (char) => char.toLowerCase())
}
export function isNumeric(str: string): boolean {
  if (!str || typeof str !== "string") return false
  const trimmed = str.trim()
  if (trimmed === "") return false
  return (
    !Number.isNaN(Number(trimmed)) && !Number.isNaN(Number.parseFloat(trimmed))
  )
}
export function isJSONString(str: unknown): boolean {
  if (typeof str !== "string") return false

  try {
    const parsed = JSON.parse(str)
    return typeof parsed === "object" && parsed !== null
  } catch {
    return false
  }
}

export function capitalize(str: string): string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function strEnum<T extends string>(
  o: readonly T[]
): { readonly [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key
    return res
  }, Object.create(null)) as { readonly [K in T]: K }
}
export function camelToCapitalize(str: string): string {
  if (!str) return ""
  return str.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()
}
export function camelToCapitalized(str: string): string {
  if (!str) return ""
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase())
}

export function getInitials(name: string): string {
  if (!name) return ""
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

export function capitalizedToCamel(str: string): string {
  if (!str) return ""

  const words = str.trim().split(/\s+/)
  return words
    .map((word, index) => {
      const lower = word.toLowerCase()
      return index === 0
        ? lower
        : lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join("")
}

const HTML_ENCODE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
}

const HTML_DECODE_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
}

export function encodeHTML(str: string): string {
  if (!str) return ""
  return str.replace(/[&<>"']/g, (char) => HTML_ENCODE_MAP[char] || char)
}

export function decodeHTML(str: string): string {
  if (!str) return ""
  return str.replace(
    /&(?:amp|lt|gt|quot|#039);/g,
    (entity) => HTML_DECODE_MAP[entity] || entity
  )
}

export function truncate(
  str: string,
  maxLength: number,
  suffix = "..."
): string {
  if (!str || str.length <= maxLength) return str
  if (maxLength <= 0) return ""
  if (suffix.length >= maxLength) return str.slice(0, maxLength)
  return str.slice(0, maxLength - suffix.length) + suffix
}

export function kebabCase(str: string): string {
  if (!str) return ""
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

export function snakeCase(str: string): string {
  if (!str) return ""
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase()
}

export function pascalCase(str: string): string {
  const camelized = camelize(str)
  return camelized.charAt(0).toUpperCase() + camelized.slice(1)
}

/**
 * Replaces [key] placeholders with values from `data`.
 * - Leaves the placeholder intact when `data[key]` is `undefined`.
 * - Coerces defined values to string via String(...).
 */
export function substituteVariables(
  template: string,
  data: Record<string, string | number | boolean | null | undefined>
): string {
  return template.replace(/\[(\w+)\]/g, (match, key) => {
    const val = data[key]
    return val === undefined ? match : String(val)
  })
}

export function hasUppercase(word: string): boolean {
  const uppercaseRegex = /[A-Z]/
  return uppercaseRegex.test(word)
}

export function getFirstUpperChars(word: string, maxLength = 2): string {
  const trimmedWord = word?.trim()
  if (!trimmedWord) {
    return "" // Handle empty or null input
  }
  let result = trimmedWord[0] // Get the first character and convert to lowercase

  if (!hasUppercase(trimmedWord)) {
    return result // Handle words without uppercase letters in rest  of word
  }
  for (let i = 1; i < trimmedWord.length; i++) {
    const char = trimmedWord[i]
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      // Check if the character is uppercase and not a number or symbol
      result += char.toLowerCase() // Append the uppercase character (converted to lowercase)
    }
    if (result.length >= maxLength) {
      break // Stop if we've reached the maximum length
    }
  }
  return result
}
