import { nanoid } from "nanoid"

/**
 * Generates a unique ID with optional prefix and customizable length
 * @param prefix Optional prefix for the ID
 * @param length Length of the random part (default: 10)
 * @returns A unique ID string
 */
export function generateUniqueId(prefix?: string, length = 10): string {
  const randomId = nanoid(length)
  return prefix ? `${prefix}-${randomId}` : randomId
}

/**
 * Generates a URL-friendly slug from a string
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special chars except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
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
  const baseSlug = generateSlug(name)

  // If name is empty or generates empty slug, use random ID
  if (!baseSlug) {
    return generateUniqueId()
  }

  // Try with base slug first
  let newId = baseSlug

  // Check if exists and try with counters
  let counter = 1
  while ((await checkExists(newId)) && counter <= maxAttempts) {
    newId = `${baseSlug}-${counter}`
    counter++
  }

  // If we exceeded max attempts, fall back to a random ID with name prefix
  if (counter > maxAttempts) {
    return generateUniqueId(baseSlug.substring(0, 20))
  }

  return newId
}

// **
//  * Gets current timestamp as number
//  */
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
  image: "/placeholder-avatar.png",
})
export const getCurrentUser = () => ({
  id: "user-id", // Replace with actual user ID logic
  name: "Current User", // Replace with actual user name logic
  image: "/placeholder.svg", // Replace with actual user image logic
})
