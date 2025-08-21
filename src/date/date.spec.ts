import { describe, expect, it, vi } from "vitest"
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIMEZONE,
  addDays,
  endOfDay,
  formatDate,
  getDate,
  getRelativeTime,
  getWeekDay,
  isSameDay,
  isValidDate,
  startOfDay,
  subtractDays,
} from "./index"

import { shortFormatDistanceToNow } from "./index"

describe("shortFormatDistanceToNow function", () => {
  it("should format minutes to min", () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    const result = shortFormatDistanceToNow(fiveMinutesAgo)
    expect(result).toContain("min")
    expect(result).not.toContain("minutes")
  })

  it("should format hours to hrs", () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)
    const result = shortFormatDistanceToNow(twoHoursAgo)
    expect(result).toContain("hrs")
    expect(result).not.toContain("hours")
  })

  it("should format seconds to sec", () => {
    const result = shortFormatDistanceToNow(new Date(Date.now() - 45 * 1000))
    // date-fns shows "less than a minute" for times under 1 minute, so we check the replacement works
    expect(result).toContain("min")
    expect(result).not.toContain("minutes")
  })

  it("should format days to d", () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    const result = shortFormatDistanceToNow(threeDaysAgo)
    expect(result).toContain("d")
    expect(result).not.toContain("days")
  })

  it("should format months to mo", () => {
    const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    const result = shortFormatDistanceToNow(twoMonthsAgo)
    expect(result).toContain("mo")
    expect(result).not.toContain("months")
  })

  it("should format years to y", () => {
    const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000)
    const result = shortFormatDistanceToNow(twoYearsAgo)
    expect(result).toContain("y")
    expect(result).not.toContain("years")
  })

  it("should handle current time", () => {
    const now = new Date()
    const result = shortFormatDistanceToNow(now)
    expect(typeof result).toBe("string")
    expect(result.length).toBeGreaterThan(0)
  })

  it("should handle future dates", () => {
    const futureDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour in future
    const result = shortFormatDistanceToNow(futureDate)
    expect(typeof result).toBe("string")
    expect(result.length).toBeGreaterThan(0)
  })

  it("should handle edge case with 1 minute", () => {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000)
    const result = shortFormatDistanceToNow(oneMinuteAgo)
    expect(result).toContain("min")
    expect(result).not.toContain("minute ")
  })

  it("should handle edge case with 1 hour", () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const result = shortFormatDistanceToNow(oneHourAgo)
    expect(result).toContain("hrs")
    expect(result).not.toContain("hour ")
  })
})

describe("getDate function", () => {
  it("should return date and time components for default timezone", () => {
    const result = getDate()
    expect(result).toHaveProperty("date")
    expect(result).toHaveProperty("time")
    expect(typeof result.date).toBe("string")
    expect(typeof result.time).toBe("string")
    expect(result.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(result.time).toMatch(/^\d{2}:\d{2}:\d{2}$/)
  })

  it("should return date and time components for specific timezone", () => {
    const result = getDate("Europe/London")
    expect(result).toHaveProperty("date")
    expect(result).toHaveProperty("time")
    expect(typeof result.date).toBe("string")
    expect(typeof result.time).toBe("string")
  })

  it("should fallback to default timezone for invalid timezone", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
    const result = getDate("Invalid/Timezone")
    expect(consoleSpy).toHaveBeenCalledWith(
      "Invalid timezone: Invalid/Timezone, falling back to America/New_York"
    )
    expect(result).toHaveProperty("date")
    expect(result).toHaveProperty("time")
    consoleSpy.mockRestore()
  })
})

describe("getWeekDay function", () => {
  it("should return weekday for valid date string", () => {
    const result = getWeekDay("2023-01-01")
    expect(typeof result).toBe("string")
    expect(result).toBe("Sun")
  })

  it("should return weekday for Date object", () => {
    const date = new Date("2023-01-02T12:00:00.000Z")
    const result = getWeekDay(date)
    expect(typeof result).toBe("string")
    expect(result).toBe("Mon")
  })

  it("should return weekday for timestamp", () => {
    const timestamp = new Date("2023-01-03T12:00:00.000Z").getTime()
    const result = getWeekDay(timestamp)
    expect(typeof result).toBe("string")
    expect(result).toBe("Tue")
  })

  it("should return null for invalid date", () => {
    const result = getWeekDay("invalid-date")
    expect(result).toBe(null)
  })

  it("should handle different locales", () => {
    const result = getWeekDay("2023-01-01", "pt-BR")
    expect(typeof result).toBe("string")
  })
})

describe("getRelativeTime function", () => {
  it("should return relative time for recent date", () => {
    const now = new Date()
    const anHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString()
    const result = getRelativeTime(anHourAgo)
    expect(typeof result).toBe("string")
    expect(result).toContain("at")
  })

  it("should return relative time for future date", () => {
    const now = new Date()
    const inAnHour = new Date(now.getTime() + 60 * 60 * 1000).toISOString()
    const result = getRelativeTime(inAnHour)
    expect(typeof result).toBe("string")
    expect(result).toContain("at")
  })

  it("should return null for invalid date", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
    const result = getRelativeTime("invalid-date")
    expect(result).toBe(null)
    expect(consoleSpy).toHaveBeenCalledWith(
      "Invalid date provided to getRelativeTime"
    )
    consoleSpy.mockRestore()
  })

  it("should handle custom base date", () => {
    const base = new Date("2023-01-01T12:00:00Z")
    const target = new Date("2023-01-01T13:00:00Z")
    const result = getRelativeTime(target.toISOString(), { base })
    expect(typeof result).toBe("string")
  })

  it("should handle custom format", () => {
    const result = getRelativeTime("2023-01-01T12:00:00.000Z")
    expect(typeof result).toBe("string")
  })
})

describe("formatDate function", () => {
  it("should format Date object", () => {
    const date = new Date("2023-01-01T12:00:00.000Z")
    const result = formatDate(date)
    expect(typeof result).toBe("string")
    expect(result).toContain("January")
    expect(result).toContain("1")
    expect(result).toContain("2023")
  })

  it("should format date string", () => {
    const result = formatDate("2023-01-01T12:00:00.000Z")
    expect(typeof result).toBe("string")
    expect(result).toContain("January")
  })

  it("should format timestamp", () => {
    const timestamp = new Date("2023-01-01T12:00:00.000Z").getTime()
    const result = formatDate(timestamp)
    expect(typeof result).toBe("string")
    expect(result).toContain("January")
  })

  it("should handle custom options", () => {
    const date = new Date("2023-01-01T12:00:00.000Z")
    const result = formatDate(date, {
      month: "short",
      day: "2-digit",
      year: "2-digit",
    })
    expect(typeof result).toBe("string")
    expect(result).toContain("Jan")
  })

  it("should handle different locales", () => {
    const date = new Date("2023-01-01T12:00:00.000Z")
    const result = formatDate(date, { locale: "pt-BR" })
    expect(typeof result).toBe("string")
  })

  it("should return Invalid Date for invalid input", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
    const result = formatDate("invalid-date")
    expect(result).toBe("Invalid Date")
    expect(consoleSpy).toHaveBeenCalledWith(
      "Invalid date provided to formatDate"
    )
    consoleSpy.mockRestore()
  })

  it("should handle errors gracefully", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    const result = formatDate(Number.NaN)
    expect(result).toBe("Invalid Date")
    consoleSpy.mockRestore()
  })
})

describe("isValidDate function", () => {
  it("should return true for valid Date objects", () => {
    expect(isValidDate(new Date())).toBe(true)
    expect(isValidDate(new Date("2023-01-01"))).toBe(true)
  })

  it("should return false for invalid Date objects", () => {
    expect(isValidDate(new Date("invalid"))).toBe(false)
  })

  it("should return true for valid date strings", () => {
    expect(isValidDate("2023-01-01")).toBe(true)
    expect(isValidDate("2023-01-01T12:00:00Z")).toBe(true)
  })

  it("should return false for invalid date strings", () => {
    expect(isValidDate("invalid-date")).toBe(false)
    expect(isValidDate("")).toBe(false)
  })

  it("should return true for valid timestamps", () => {
    expect(isValidDate(Date.now())).toBe(true)
    expect(isValidDate(1672531200000)).toBe(true)
  })

  it("should return false for falsy values", () => {
    expect(isValidDate(null)).toBe(false)
    expect(isValidDate(undefined)).toBe(false)
    expect(isValidDate(false)).toBe(false)
    expect(isValidDate(0)).toBe(false)
  })

  it("should return false for non-date objects", () => {
    expect(isValidDate({})).toBe(false)
    expect(isValidDate([])).toBe(false)
    expect(isValidDate("not a date")).toBe(false)
  })
})

describe("addDays function", () => {
  it("should add days to Date object", () => {
    const date = new Date("2023-01-01T12:00:00.000Z")
    const result = addDays(date, 5)
    expect(result).toBeInstanceOf(Date)
    expect(result.getUTCDate()).toBe(6)
  })

  it("should add days to date string", () => {
    const result = addDays("2023-01-01T12:00:00.000Z", 10)
    expect(result).toBeInstanceOf(Date)
    expect(result.getUTCDate()).toBe(11)
  })

  it("should add days to timestamp", () => {
    const timestamp = new Date("2023-01-01T12:00:00.000Z").getTime()
    const result = addDays(timestamp, 3)
    expect(result).toBeInstanceOf(Date)
    expect(result.getUTCDate()).toBe(4)
  })

  it("should handle negative days (subtract)", () => {
    const date = new Date("2023-01-15T12:00:00.000Z")
    const result = addDays(date, -5)
    expect(result.getUTCDate()).toBe(10)
  })
})

describe("subtractDays function", () => {
  it("should subtract days from Date object", () => {
    const date = new Date("2023-01-15T12:00:00.000Z")
    const result = subtractDays(date, 5)
    expect(result).toBeInstanceOf(Date)
    expect(result.getUTCDate()).toBe(10)
  })

  it("should subtract days from date string", () => {
    const result = subtractDays("2023-01-15T12:00:00.000Z", 10)
    expect(result).toBeInstanceOf(Date)
    expect(result.getUTCDate()).toBe(5)
  })

  it("should subtract days from timestamp", () => {
    const timestamp = new Date("2023-01-15T12:00:00.000Z").getTime()
    const result = subtractDays(timestamp, 3)
    expect(result).toBeInstanceOf(Date)
    expect(result.getUTCDate()).toBe(12)
  })
})

describe("isSameDay function", () => {
  it("should return true for same day", () => {
    const date1 = new Date("2023-01-01T10:00:00")
    const date2 = new Date("2023-01-01T15:00:00")
    expect(isSameDay(date1, date2)).toBe(true)
  })

  it("should return false for different days", () => {
    const date1 = new Date("2023-01-01")
    const date2 = new Date("2023-01-02")
    expect(isSameDay(date1, date2)).toBe(false)
  })

  it("should work with mixed input types", () => {
    const date = new Date("2023-01-01T12:00:00.000Z")
    const dateString = "2023-01-01T12:00:00.000Z"
    const timestamp = new Date("2023-01-01T12:00:00.000Z").getTime()

    expect(isSameDay(date, dateString)).toBe(true)
    expect(isSameDay(dateString, timestamp)).toBe(true)
    expect(isSameDay(date, timestamp)).toBe(true)
  })
})

describe("startOfDay function", () => {
  it("should return start of day for Date object", () => {
    const date = new Date("2023-01-01T15:30:45")
    const result = startOfDay(date)
    expect(result).toBeInstanceOf(Date)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    expect(result.getMilliseconds()).toBe(0)
  })

  it("should return start of day for date string", () => {
    const result = startOfDay("2023-01-01T15:30:45")
    expect(result).toBeInstanceOf(Date)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
  })

  it("should return start of day for timestamp", () => {
    const timestamp = new Date("2023-01-01T15:30:45").getTime()
    const result = startOfDay(timestamp)
    expect(result).toBeInstanceOf(Date)
    expect(result.getHours()).toBe(0)
  })
})

describe("endOfDay function", () => {
  it("should return end of day for Date object", () => {
    const date = new Date("2023-01-01T10:30:45")
    const result = endOfDay(date)
    expect(result).toBeInstanceOf(Date)
    expect(result.getHours()).toBe(23)
    expect(result.getMinutes()).toBe(59)
    expect(result.getSeconds()).toBe(59)
    expect(result.getMilliseconds()).toBe(999)
  })

  it("should return end of day for date string", () => {
    const result = endOfDay("2023-01-01T10:30:45")
    expect(result).toBeInstanceOf(Date)
    expect(result.getHours()).toBe(23)
    expect(result.getMinutes()).toBe(59)
  })

  it("should return end of day for timestamp", () => {
    const timestamp = new Date("2023-01-01T10:30:45").getTime()
    const result = endOfDay(timestamp)
    expect(result).toBeInstanceOf(Date)
    expect(result.getHours()).toBe(23)
  })
})
