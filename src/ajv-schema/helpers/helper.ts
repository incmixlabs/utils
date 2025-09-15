import { Temporal } from "@js-temporal/polyfill"
import {
  BIG_OFFSET,
  JOIN_CHAR,
  MAX_SLUG_LENGTH,
  MIN_SLUG_LENGTH,
} from "./constants"

export function getBigID(offset = BIG_OFFSET) {
  const instant = Temporal.Now.instant()
  const epochNanoseconds = instant.epochNanoseconds - offset
  return epochNanoseconds
}
export type BigUUID = {
  id: bigint
  mn: string
}
export type UUID = {
  id: number
  ts: number
  mn: string
}
export function getBigUUID({ id, mn }: BigUUID): string {
  const tim = new Temporal.Instant(id)
  const hash = generateTimestampHash(tim.epochMilliseconds)
  return `${mn}${JOIN_CHAR}${new Temporal.Instant(id).toString()}${JOIN_CHAR}${hash}`
}
export type UUIDTimeStamp = BigUUID & {
  timestamp: number
}
function nanosecondsToMilliseconds(nanoseconds: bigint): number {
  return Number(nanoseconds) / 1_000_000 // Using numeric separators for readability
}
export function parseBUUID(
  uuid: string,
  offset = BIG_OFFSET
): UUIDTimeStamp | null {
  const parts = uuid.split(JOIN_CHAR)
  if (parts.length !== 3) return null
  const mn = parts[0]
  const idStr = parts[1]
  const hash = parts[2]

  try {
    const instant = Temporal.Instant.from(idStr)
    const id = instant.epochNanoseconds
    let timestamp = instant.epochMilliseconds
    // verify hash
    if (hash !== generateTimestampHash(timestamp)) return null
    timestamp = timestamp + nanosecondsToMilliseconds(offset)
    return { id, mn, timestamp }
  } catch {
    return null
  }
}
export function getTransactionTime(uuid: string): Temporal.Instant | null {
  const parsed = parseBUUID(uuid)
  return parsed ? Temporal.Instant.fromEpochNanoseconds(parsed.id) : null
}

/**
 * Generates a unique ID with optional prefix and customizable length
 * @param prefix Optional prefix for the ID
 * @param length Length of the random part (default: 10)
 * @returns A unique ID string
 */

function generateTimestampHash(
  timestamp: number = Date.now(),
  length = 4
): string {
  // Get the current timestamp in milliseconds

  // Convert the timestamp to base 36 (alphanumeric characters)
  // This will result in a shorter string than decimal representation
  const base36Timestamp = timestamp.toString(36)

  // Take the last 4 characters of the base36 string
  // This provides a compact, time-based hash
  const hash = base36Timestamp.slice(length * -1)

  return hash
}

/**
 * Generates a URL-friendly slug from a string
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return !text?.trim()
    ? ""
    : text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
}

/**
 * Generates a unique ID based on a name with fallback to random ID
 * @param name The name to base the ID on
 * @param checkExists Function to check if ID already exists
 * @param maxAttempts Maximum number of attempts to add counter
 * @returns A unique ID string
 */
export async function generateNameBasedId(
  name: string,
  checkExists: (id: string) => Promise<boolean>,
  maxAttempts = 10
): Promise<string> {
  // Generate base slug from name
  const baseSlug = name ? generateSlug(name) : generateTimestampHash()
  let newId = baseSlug.substring(0, MAX_SLUG_LENGTH)
  // Check if exists and try with counters
  let counter = 1
  while ((await checkExists(newId)) && counter <= maxAttempts) {
    newId = `${baseSlug}${JOIN_CHAR}${counter}`
    counter++
    if (counter > maxAttempts) {
      return `${generateTimestampHash()}${JOIN_CHAR}${Math.random().toString(36).slice(2, MAX_SLUG_LENGTH)}`.substring(
        0,
        MAX_SLUG_LENGTH
      )
    }
  }
  return newId
}

/**
 * Gets current timestamp as number
 */
export function getCurrentTimestamp(): number {
  return Date.now()
}

/**
 * Creates a default user for audit fields when no real user data is available
 * Should be replaced with actual user authentication data in production
 */
export const getDefaultUser = () => ({
  id: "system-default",
  name: "System",
  src: "/placeholder-avatar.png",
})

export const getCurrentUser = () => ({
  id: "user-id", // Replace with actual user ID logic
  name: "Current User", // Replace with actual user name logic
  src: "/placeholder.svg", // Replace with actual user image logic
})
