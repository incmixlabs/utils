import {
  addDays as addDaysDateFns,
  endOfDay as endOfDayDateFns,
  format,
  formatDistanceToNow,
  formatRelative,
  isSameDay as isSameDayDateFns,
  isValid,
  parse,
  parseISO,
  startOfDay as startOfDayDateFns,
  subDays,
} from "date-fns"
import { format as formatTz } from "date-fns-tz"
export interface DateTimeComponents {
  time: string
  date: string
}

export interface FormatOptions extends Intl.DateTimeFormatOptions {
  locale?: string
}

export interface RelativeTimeOptions {
  format?: string
  base?: Date
  locale?: string
}

export const DEFAULT_TIMEZONE = "America/New_York"
export const DEFAULT_DATE_FORMAT = "MM/dd/yyyy, hh:mm a, ZZZ"

export function shortFormatDistanceToNow(date: Date): string {
  const full = formatDistanceToNow(date, { addSuffix: false })

  return full
    .replace(/minutes?/, "min")
    .replace(/hours?/, "hrs")
    .replace(/seconds?/, "sec")
    .replace(/days?/, "d")
    .replace(/months?/, "mo")
    .replace(/years?/, "y")
}
function parseDateTime(input: string | Date | number): Date {
  if (typeof input === "string") {
    const dt = parseISO(input)
    return isValid(dt) ? dt : new Date(input)
  }
  if (input instanceof Date) {
    return input
  }
  return new Date(Number(input))
}

export function getDate(
  timezone: string = DEFAULT_TIMEZONE
): DateTimeComponents {
  try {
    const now = new Date()
    const isoString = formatTz(now, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", {
      timeZone: timezone,
    })

    const [date, timeWithZone] = isoString.split("T")
    const time = timeWithZone.split(".")[0]

    return { time, date }
  } catch (_error) {
    console.warn(
      `Invalid timezone: ${timezone}, falling back to ${DEFAULT_TIMEZONE}`
    )
    if (timezone !== DEFAULT_TIMEZONE) {
      return getDate(DEFAULT_TIMEZONE)
    }
    // Fallback to UTC if default timezone also fails
    const now = new Date()
    const isoString = now.toISOString()
    const [date, timeWithZone] = isoString.split("T")
    const time = timeWithZone.split(".")[0]
    return { time, date }
  }
}

export function getWeekDay(
  dateTime: string | Date | number,
  _locale = "en-US"
): string | null {
  try {
    const dt = parseDateTime(dateTime)
    if (!isValid(dt)) {
      return null
    }
    return format(dt, "EEE")
  } catch {
    return null
  }
}

export function getRelativeTime(
  dateTime: string | Date | number,
  options: RelativeTimeOptions = {}
): string | null {
  const { format: dateFormat = DEFAULT_DATE_FORMAT, base = new Date() } =
    options

  let dt: Date

  try {
    if (typeof dateTime === "string" && dateFormat !== DEFAULT_DATE_FORMAT) {
      dt = parse(dateTime.replace(" UTC", ""), dateFormat, new Date())
    } else {
      dt = parseDateTime(dateTime)
    }

    if (!isValid(dt)) {
      console.warn("Invalid date provided to getRelativeTime")
      return null
    }

    return formatRelative(dt, base)
  } catch {
    console.warn("Invalid date provided to getRelativeTime")
    return null
  }
}

export function formatDate(
  date: Date | string | number,
  options: FormatOptions = {}
): string {
  const { locale = "en-US", ...formatOptions } = options

  try {
    const dateObj = date instanceof Date ? date : new Date(date)

    if (Number.isNaN(dateObj.getTime())) {
      console.warn("Invalid date provided to formatDate")
      return "Invalid Date"
    }

    return new Intl.DateTimeFormat(locale, {
      month: "long",
      day: "numeric",
      year: "numeric",
      ...formatOptions,
    }).format(dateObj)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

export function isValidDate(date: unknown): boolean {
  if (!date) return false

  if (date instanceof Date) {
    return !Number.isNaN(date.getTime())
  }

  if (typeof date === "string" || typeof date === "number") {
    const dt = parseDateTime(date)
    return isValid(dt)
  }

  return false
}

export function addDays(date: Date | string | number, days: number): Date {
  const dt = parseDateTime(date)
  return addDaysDateFns(dt, days)
}

export function subtractDays(date: Date | string | number, days: number): Date {
  const dt = parseDateTime(date)
  return subDays(dt, days)
}

export function isSameDay(
  date1: Date | string | number,
  date2: Date | string | number
): boolean {
  const dt1 = parseDateTime(date1)
  const dt2 = parseDateTime(date2)
  return isSameDayDateFns(dt1, dt2)
}

export function startOfDay(date: Date | string | number): Date {
  return startOfDayDateFns(parseDateTime(date))
}

export function endOfDay(date: Date | string | number): Date {
  return endOfDayDateFns(parseDateTime(date))
}
