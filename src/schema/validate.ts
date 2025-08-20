import isEmail from "validator/lib/isEmail"
import isMobilePhone from "validator/lib/isMobilePhone"
import isStrongPassword from "validator/lib/isStrongPassword"
import isURL from "validator/lib/isURL"

export const defaultURLOptions = {
  protocols: ["http", "https", "ftp"],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_port: false,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
  allow_fragments: true,
  allow_query_components: true,
  validate_length: true,
  max_allowed_length: 2084,
}
export type DefaultURLOptions = typeof defaultURLOptions

export const defaultPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10,
}
export type DefaultPasswordOptions = typeof defaultPasswordOptions

export const isValidEmail = (value: string): boolean => isEmail(value)
export const isValidPassword = (value: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(value)

// @ts-ignore
export const isValidStrongPassword = (
  value: string,
  options: DefaultPasswordOptions = defaultPasswordOptions
  // @ts-ignore
): boolean => isStrongPassword(value, options)

export const isValidColumnName = (value: string): boolean =>
  /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)
export const isValidTableName = (value: string): boolean =>
  /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)
export const isValidUrl = (
  value: string,
  options: DefaultURLOptions = defaultURLOptions
): boolean => isURL(value, options)
export const isValidPhoneNumber = (value: string): boolean => {
  let phoneValue = value
  if (!phoneValue.startsWith("+")) {
    phoneValue = `+${phoneValue}` // Ensure E.164 format
  }
  return isMobilePhone(phoneValue)
}
export const isValidDate = (value: string): boolean =>
  !Number.isNaN(Date.parse(value)) // Check if the date can be parsed
export const isValidJson = (value: string): boolean => {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}
export const isValidHexColor = (value: string): boolean =>
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
export function isValidIPAddress(ip: string): boolean {
  const parts = ip.split(".")

  if (parts.length !== 4) {
    return false
  }

  for (const part of parts) {
    if (!/^\d+$/.test(part)) {
      return false
    }

    const num = Number.parseInt(part, 10)
    if (Number.isNaN(num) || num < 0 || num > 255) {
      return false
    }

    if (part.length > 1 && part.startsWith("0")) {
      return false
    }
  }
  return true
}
export const isValidMacAddress = (value: string): boolean =>
  /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value)
export const isValidTime = (value: string): boolean =>
  /^([01]\d|2[0-3]):([0-5]\d)$/.test(value) // HH:mm format
export const isValidLatitude = (value: string): boolean =>
  /^-?(90(\.0+)?|([1-8]?\d(\.\d+)?))$/.test(value)
export const isValidLongitude = (value: string): boolean =>
  /^-?(180(\.0+)?|((1[0-7]\d|[1-9]?\d)(\.\d+)?))$/.test(value)
export const isValidUSPostalCode = (value: string): boolean =>
  /^[0-9]{5}(?:-[0-9]{4})?$/.test(value) // US ZIP code format
export const isValidPostalCode = (value: string, country = "US"): boolean => {
  // Add country-specific validation logic
  switch (country.toUpperCase()) {
    case "US":
      return isValidUSPostalCode(value)
    case "CA":
      return /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(value) // Canada
    case "UK":
      return /^[A-Za-z]{1,2}\d[A-Za-z\d]? ?\d[A-Za-z]{2}$/.test(value) // UK
    default:
      return /^[\w\s-]{3,10}$/.test(value) // Generic fallback
  }
}
export const isValidCountryCode = (value: string): boolean =>
  /^[A-Z]{2}$/.test(value) // ISO 3166-1 alpha-2 format
export const isValidCurrencyCode = (value: string): boolean =>
  /^[A-Z]{3}$/.test(value) // ISO 4217 format
export const isValidEnumValue = (
  value: string,
  enumValues: string[]
): boolean => enumValues.includes(value)
export const isValidFileName = (value: string): boolean =>
  /^[^<>:"/\\|?*]+$/.test(value) // Basic validation for file names
export const isValidJsonSchema = (value: string): boolean => {
  try {
    const schema = JSON.parse(value)
    // Basic validation for JSON Schema structure
    return typeof schema === "object" && schema !== null && "type" in schema
  } catch {
    return false
  }
}
export const isValidXml = (value: string): boolean => {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(value, "application/xml")
    return xmlDoc.getElementsByTagName("parsererror").length === 0
  } catch {
    return false
  }
}
export const isValidMarkdown = (value: string): boolean => {
  // A simple regex to check for basic Markdown syntax
  const markdownRegex =
    /^(#{1,6} |[-*+] |\d+\.)|(\[.*?\]\(.*?\))|(```[\s\S]*?```)|(`[^`]+`)|(\*\*.*?\*\*)|(_.*?_)/
  return markdownRegex.test(value)
}
export const isValidCsv = (value: string): boolean => {
  const lines = value.split("\n")
  const regex = /^([^,]*,)*[^,]*$/ // Basic CSV line validation
  return lines.every((line) => regex.test(line))
}
export const isValidBase64 = (value: string): boolean => {
  try {
    // Handle both standard and URL-safe Base64
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$|^[A-Za-z0-9_-]*$/
    if (!base64Regex.test(value)) return false
    // Test decoding
    atob(value.replace(/-/g, "+").replace(/_/g, "/"))
    return true
  } catch {
    return false
  }
}
export const isValidHtml = (value: string): boolean => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(value, "text/html")
  return !doc.querySelector("parsererror") // Check if there are any parsing errors
}
export const isValidSlug = (value: string): boolean =>
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) // Slug format: lowercase letters, numbers, and hyphens
export const isValidTimeZone = (value: string): boolean => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: value })
    return true
  } catch {
    return false
  }
}

export const isValidIBAN = (value: string): boolean => {
  const regex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/ // Basic IBAN format
  if (!regex.test(value)) return false

  // Rearrange the IBAN for validation
  const rearranged = value.slice(4) + value.slice(0, 4)
  const numericIBAN = rearranged.replace(/[A-Z]/g, (char) =>
    (char.charCodeAt(0) - 55).toString()
  ) // Convert letters to numbers

  // Check if the numeric IBAN is divisible by 97
  return BigInt(numericIBAN) % BigInt(97) === BigInt(1)
}
export const isValidSwiftCode = (value: string): boolean => {
  const regex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/ // Basic SWIFT/BIC format
  return regex.test(value)
}
export const isValidGitHubUsername = (value: string): boolean => {
  const regex = /^(?!-)[a-zA-Z0-9-]{1,39}(?<!-)$/ // GitHub username rules
  return regex.test(value)
}
export const isValidTwitterHandle = (value: string): boolean => {
  const regex = /^@?([A-Za-z0-9_]{1,15})$/ // Twitter handle rules
  return regex.test(value)
}
export const isValidInstagramHandle = (value: string): boolean => {
  const regex = /^@?([A-Za-z0-9._]{1,30})$/ // Instagram handle rules
  return regex.test(value)
}
export const isValidLinkedInProfile = (value: string): boolean => {
  const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/ // LinkedIn profile URL format
  return regex.test(value)
}
export const isValidYouTubeChannel = (value: string): boolean => {
  const regex =
    /^(https?:\/\/)?(www\.)?youtube\.com\/(channel|user)\/[A-Za-z0-9_-]+\/?$/ // YouTube channel URL format
  return regex.test(value)
}
export const isValidFacebookProfile = (value: string): boolean => {
  const regex = /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9._-]+\/?$/ // Facebook profile URL format
  return regex.test(value)
}

// export const validateProjectData = (
//   data: ProjectFormData
// ): ValidatedProjectData => {
//   // Validate status
//   let validStatus: ProjectStatus
//   if (VALID_STATUSES.includes(data.status as ProjectStatus)) {
//     validStatus = data.status as ProjectStatus
//   } else {
//     console.warn(
//       `Invalid status "${data.status}" provided, defaulting to "started"`
//     )
//     validStatus = "started"
//   }

//   // Validate timeType
//   let validTimeType: TimeType
//   if (VALID_TIME_TYPES.includes(data.timeType as TimeType)) {
//     // Map "days" to "day" if needed
//     validTimeType =
//       data.timeType === "days"
//         ? ("day" as TimeType)
//         : (data.timeType as TimeType)
//   } else {
//     console.warn(
//       `Invalid timeType "${data.timeType}" provided, defaulting to "week"`
//     )
//     validTimeType = "week"
//   }

//   // Handle required fields that might be missing
//   const startDate: number = data.startDate ?? Date.now()
//   const endDate: number = data.endDate ?? Date.now() + 7 * 24 * 60 * 60 * 1000 // Default to 1 week from now
//   const budget: number = data.budget ?? 0

//   // Return a sanitized object with all fields properly typed
//   return {
//     id: data.id,
//     orgId: data.orgId,
//     name: data.name,
//     company: data.company,
//     logo: data.logo,
//     description: data.description,
//     progress: data.progress,
//     timeLeft: data.timeLeft,
//     timeType: validTimeType,
//     members: data.members,
//     status: validStatus,
//     startDate: startDate,
//     endDate: endDate,
//     budget: budget,
//     // We'll handle fileInfo separately
//   }
// }

/**
 * Creates a proper File object from various possible input formats
 * @param fileData The file data from the form submission
 * @returns A proper File object or null if invalid
 */

// export const ensureFileObject = async (
//   fileData: File | Blob | FileLikeObject | FileInput | null | undefined
// ): Promise<File | null> => {
//   // Early return for null/undefined
//   if (!fileData) {
//     return null
//   }
//   // Case 1: Already a File object
//   if (fileData instanceof File) {
//     // Validate file size and type
//     if (fileData.size === 0) {
//       console.warn("File is empty")
//       return null
//     }
//     return fileData
//   }

//   // Case 2: It's a Blob
//   if (fileData instanceof Blob) {
//     // Blobs don't have a name property, so we need to provide a default name
//     return new File([fileData], "blob_file", { type: fileData.type })
//   }

//   // Case 3: It's a serialized file-like object with necessary properties
//   if (
//     fileData &&
//     typeof fileData === "object" &&
//     "name" in fileData &&
//     "type" in fileData &&
//     "size" in fileData
//   ) {
//     try {
//       // If we have base64 data
//       if ("data" in fileData && typeof fileData.data === "string") {
//         const dataUrlPattern =
//           /^data:([a-zA-Z][a-zA-Z0-9]*[\/][a-zA-Z0-9][a-zA-Z0-9\-\+]*);base64,([A-Za-z0-9+/=]+)$/
//         if (dataUrlPattern.test(fileData.data)) {
//           const [, mimeType] = fileData.data.match(dataUrlPattern) || []
//           // Validate MIME type matches expected type
//           if (fileData.type && mimeType !== fileData.type) {
//             console.warn(
//               "MIME type mismatch between data URL and declared type"
//             )
//             return null
//           }
//           // Check if the data is a valid Base64 string
//           // Explicitly validate the data URL format
//           try {
//             const res = await fetch(fileData.data)
//             const blob = await res.blob()
//             return new File([blob], fileData.name, { type: fileData.type })
//           } catch (error) {
//             console.error("Error processing data URL:", error)
//             return null
//           }
//         } else {
//           console.warn("Invalid or unsupported data URL format")
//           return null
//         }
//       }

//       // If we have ArrayBuffer or similar
//       if ("arrayBuffer" in fileData || "buffer" in fileData) {
//         const buffer = fileData.arrayBuffer || fileData.buffer
//         if (buffer !== undefined) {
//           return new File([buffer], fileData.name, { type: fileData.type })
//         }
//         console.warn("File-like object provided but buffer is undefined")
//         return null
//       }

//       console.warn("File-like object provided but missing data content")
//       return null
//     } catch (error) {
//       console.error("Error converting to File object:", error)
//       return null
//     }
//   }
//   console.warn("Unable to process file data:", fileData)
//   return null
// }

export async function getFileSizeFromUrl(url: string): Promise<number | null> {
  try {
    const response = await fetch(url, { method: "HEAD" })
    const contentLength = response.headers.get("content-length")
    return contentLength ? Number.parseInt(contentLength, 10) : null
  } catch (error) {
    console.error("Error fetching file size:", error)
    return null
  }
}
