import { z } from "zod"
import { filterSchema, sortingItemSchema } from "./types"

export * from "./types"

export function sortParser<T>(value: string, validKeys: Set<string> | null) {
  try {
    const parsed = JSON.parse(value)
    const result = z.array(sortingItemSchema).safeParse(parsed)

    if (!result.success) return null

    if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
      return null
    }

    return result.data as T
  } catch {
    return null
  }
}

export function filterParser<T>(value: string, validKeys: Set<string> | null) {
  try {
    const parsed = JSON.parse(value)
    const result = z.array(filterSchema).safeParse(parsed)

    if (!result.success) return null

    if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
      return null
    }

    return result.data as T
  } catch {
    return null
  }
}
