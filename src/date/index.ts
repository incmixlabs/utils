import { DateTime, type DateTimeOptions } from "luxon"

export interface DateTimeComponents {
  time: string
  date: string
}

export interface FormatOptions extends Intl.DateTimeFormatOptions {
  locale?: string
}

export interface RelativeTimeOptions {
  format?: string
  base?: DateTime
  locale?: string
}

export const DEFAULT_TIMEZONE = "America/New_York"
export const DEFAULT_DATE_FORMAT = "MM/dd/yyyy, hh:mm a, ZZZ"

function parseDateTime(input: string | Date | number): DateTime {
  if (typeof input === "string") {
    const dt = DateTime.fromISO(input)
    return dt.isValid ? dt : DateTime.fromRFC2822(input)
  }
  if (input instanceof Date) {
    return DateTime.fromJSDate(input)
  }
  return DateTime.fromMillis(Number(input))
}

export function getDate(
  timezone: string = DEFAULT_TIMEZONE
): DateTimeComponents {
  const dt = DateTime.now().setZone(timezone)

  if (!dt.isValid) {
    console.warn(
      `Invalid timezone: ${timezone}, falling back to ${DEFAULT_TIMEZONE}`
    )
    return getDate(DEFAULT_TIMEZONE)
  }

  const isoString = dt.toISO()
  if (!isoString) {
    return { time: "", date: "" }
  }

  const [date, timeWithZone] = isoString.split("T")
  const time = timeWithZone.split(".")[0]

  return { time, date }
}

export function getWeekDay(
  dateTime: string | Date | number,
  locale = "en-US"
): string | null {
  const dt = parseDateTime(dateTime)
  return dt.isValid ? (dt.setLocale(locale).weekdayShort ?? null) : null
}

export function getRelativeTime(
  dateTime: string | Date | number,
  options: RelativeTimeOptions = {}
): string | null {
  const {
    format = DEFAULT_DATE_FORMAT,
    base = DateTime.now(),
    locale = "en-US",
  } = options

  let dt: DateTime

  if (typeof dateTime === "string" && format !== DEFAULT_DATE_FORMAT) {
    dt = DateTime.fromFormat(dateTime.replace(" UTC", ""), format, {
      zone: "utc",
      locale,
    })
  } else {
    dt = parseDateTime(dateTime)
  }

  if (!dt.isValid) {
    console.warn("Invalid date provided to getRelativeTime")
    return null
  }

  return dt.toRelative({ base, locale })
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
    return dt.isValid
  }

  return false
}

export function addDays(date: Date | string | number, days: number): Date {
  const dt = parseDateTime(date)
  return dt.plus({ days }).toJSDate()
}

export function subtractDays(date: Date | string | number, days: number): Date {
  const dt = parseDateTime(date)
  return dt.minus({ days }).toJSDate()
}

export function isSameDay(
  date1: Date | string | number,
  date2: Date | string | number
): boolean {
  const dt1 = parseDateTime(date1)
  const dt2 = parseDateTime(date2)
  return dt1.hasSame(dt2, "day")
}

export function startOfDay(date: Date | string | number): Date {
  return parseDateTime(date).startOf("day").toJSDate()
}

export function endOfDay(date: Date | string | number): Date {
  return parseDateTime(date).endOf("day").toJSDate()
}
