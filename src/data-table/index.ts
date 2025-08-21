import { z } from "zod"
import {
  type Filter,
  type Sort,
  filterSchema,
  sortingItemSchema,
} from "./types"

export * from "./types"

export interface ParserOptions {
  validKeys?: Set<string> | null
  maxItems?: number
  throwOnError?: boolean
}

export interface ParserResult<T> {
  data: T | null
  error?: string
}

function parseJSON(value: string): unknown | null {
  try {
    return JSON.parse(value)
  } catch (_error) {
    return null
  }
}

function validateKeys<T extends { id: string }>(
  items: T[],
  validKeys: Set<string>
): boolean {
  return items.every((item) => validKeys.has(item.id))
}

export function sortParser<T extends Sort<string>>(
  value: string,
  options: ParserOptions = {}
): ParserResult<T[]> {
  const { validKeys, maxItems = 10, throwOnError = false } = options

  const parsed = parseJSON(value)
  if (!parsed) {
    const error = "Invalid JSON format"
    if (throwOnError) throw new Error(error)
    return { data: null, error }
  }

  const result = z.array(sortingItemSchema).safeParse(parsed)
  if (!result.success) {
    const error = result.error.message
    if (throwOnError) throw new Error(error)
    return { data: null, error }
  }

  if (result.data.length > maxItems) {
    const error = `Too many sort items (max: ${maxItems})`
    if (throwOnError) throw new Error(error)
    return { data: null, error }
  }

  if (validKeys && !validateKeys(result.data, validKeys)) {
    const error = "Invalid sort keys"
    if (throwOnError) throw new Error(error)
    return { data: null, error }
  }

  return { data: result.data as T[] }
}

export function filterParser<T extends Filter<string>>(
  value: string,
  options: ParserOptions = {}
): ParserResult<T[]> {
  const { validKeys, maxItems = 20, throwOnError = false } = options

  const parsed = parseJSON(value)
  if (!parsed) {
    const error = "Invalid JSON format"
    if (throwOnError) throw new Error(error)
    return { data: null, error }
  }

  const result = z.array(filterSchema).safeParse(parsed)
  if (!result.success) {
    const error = result.error.message
    if (throwOnError) throw new Error(error)
    return { data: null, error }
  }

  if (result.data.length > maxItems) {
    const error = `Too many filter items (max: ${maxItems})`
    if (throwOnError) throw new Error(error)
    return { data: null, error }
  }

  if (validKeys && !validateKeys(result.data, validKeys)) {
    const error = "Invalid filter keys"
    if (throwOnError) throw new Error(error)
    return { data: null, error }
  }

  return { data: result.data as T[] }
}

export function buildQueryString(
  params: Record<string, unknown>,
  allowedKeys: string[] = []
): string {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (allowedKeys.length > 0 && !allowedKeys.includes(key)) continue

    if (value === null || value === undefined) continue

    if (typeof value === "object") {
      searchParams.set(key, JSON.stringify(value))
    } else {
      searchParams.set(key, String(value))
    }
  }

  return searchParams.toString()
}
