import type { LocalizedText } from "../i18n/index"
export interface CalendarEvent {
  id: string
  title: string
  start: Date // Using the native Date object for simplicity
  end: Date
  allDay?: boolean // Optional property for all-day events
  description?: string // Optional description
  location?: string // Optional location
  color?: string // Optional color for display purposes
}

// Define an interface for a collection of events or a calendar view
export interface CalendarData {
  events: CalendarEvent[]
  // Potentially add other properties like current view, selected date range, etc.
  currentView?: "day" | "week" | "month" | "year"
  selectedDateRange?: {
    start: Date
    end: Date
  }
}

// Define the type of holiday
export enum HolidayType {
  PUBLIC = "public", // Public holiday, widely observed
  BANK = "bank", // Bank holiday, banks and often offices are closed
  SCHOOL = "school", // School holiday, schools are closed
  OPTIONAL = "optional", // Optional holiday, many people take the day off
  OBSERVANCE = "observance", // Observance, a festivity, but not typically a paid day off
  OTHER = "other",
}

// Define the structure of a single holiday
export interface Holiday {
  id?: string // Optional unique ID for the holiday
  date: string // The date of the holiday, in ISO 8601 format (e.g., "YYYY-MM-DD")
  name: LocalizedText[] // Array of localized names for the holiday
  type: HolidayType // The type of the holiday (e.g., public, bank, school)
  nationwide?: boolean // Whether the holiday is observed nationwide
  comment?: LocalizedText[] // Optional array of localized comments or notes
  substitute?: boolean // Indicates if this holiday is a substitute for another
  countryCode?: string // ISO 3166-1 alpha-2 country code (e.g., "US", "GB")
  stateCode?: string // Optional ISO 3166-2 code for a state/region within the country
}

// Define the structure of a holiday calendar itself
export interface HolidayCalendar {
  id: string // Unique ID for the calendar
  name: LocalizedText[] // Array of localized names for the calendar
  description?: LocalizedText[] // Optional array of localized descriptions
  holidays: Holiday[] // Array of Holiday objects included in this calendar
  countryCode: string // ISO 3166-1 alpha-2 country code this calendar applies to
  stateCode?: string // Optional ISO 3166-2 code for a state/region
  startDate?: string // Optional start date for the calendar's effective period
  endDate?: string // Optional end date for the calendar's effective period
}

export interface DateDimension {
  dateKey: number // YYYYMMDD (e.g., 20250820) - Primary Key
  fullDateUSA: string // MM/DD/YYYY (e.g., "08/20/2025")
  dayOfMonth: number // 1-31
  daySuffix: string // "st", "nd", "rd", "th"
  dayName: string // "Monday", "Tuesday", etc.
  dayOfWeekUSA: number // 1-7 (1 = Sunday)
  dayOfYear: number // 1-366
  weekOfYear: number // 1-53
  halfYear: number // 1 or 2
  monthName: string // "January", "February", etc.
  monthOfQuarter: number // 1-3
  quarter: number // 1-4
  quarterName: string // "Q1", "Q2", etc.
  year: number // e.g., 2025
  monthYear: string // MM/YYYY (e.g., "08/2025")
  isWeekday: boolean // true or false
  // Optional: Fiscal calendar attributes if applicable
  fiscalDayOfYear?: number
  fiscalPeriod?: number
  fiscalQuarter?: number
  fiscalQuarterName?: string
  fiscalYear?: number
}
export type Time = {
  hour24: number // 0-23
  minute: number // 0-59
  dailyperiods?: DailyPeriod[]
}
export type TimeDimension = Time & {
  hour24: number // 0-23
  minute: number // 0-59
}
export const dailyPeriods = {
  eod: "eod",
  bod: "bod",
  mid: "mid",
  hourly: "hourly",
} as const
export type DailyPeriod = (typeof dailyPeriods)[keyof typeof dailyPeriods]
export const weeklyPeriods = {
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
  sunday: "sunday",
  bow: "bow",
  eow: "eow",
} as const
export const monthlyPeriods = {
  january: "january",
  february: "february",
  march: "march",
  april: "april",
  may: "may",
  june: "june",
  july: "july",
  august: "august",
  september: "september",
  october: "october",
  november: "november",
  december: "december",
  eoy: "eoy",
  qtrly: "qtrly",
} as const
export type burstyPeriods = {
  from: number
  to: number
  frequency?: number // no of expected transactions etc
}
export const periodDefinition = {
  eoy: "eoy",
  qtrly: "qtrly",
  monthly: "monthly",
  weekly: "weekly",
  daily: "daily",
  bow: "bow",
  eow: "eow",
  eod: "eod",
  bod: "bod",
  mid: "mid",
}
export type PeriodDefinition =
  (typeof periodDefinition)[keyof typeof periodDefinition]
// set for each org and workspace
export const periodDefinitions = {
  // Define period definitions for each org and workspace here
}
/*
CREATE TABLE dim_date (
    date_key INT PRIMARY KEY,
    full_date DATE NOT NULL UNIQUE,
    calendar_year INT NOT NULL,
    calendar_quarter INT NOT NULL,
    calendar_quarter_name VARCHAR(10) NOT NULL,
    calendar_month INT NOT NULL,
    calendar_month_name VARCHAR(20) NOT NULL,
    calendar_day_of_month INT NOT NULL,
    calendar_day_of_year INT NOT NULL,
    day_of_week INT NOT NULL,
    day_name VARCHAR(20) NOT NULL,
    day_is_weekday BOOLEAN NOT NULL,
    week_of_year INT NOT NULL,
    fiscal_year INT,
    fiscal_quarter INT,
    fiscal_month INT,
    is_holiday BOOLEAN DEFAULT FALSE,
    holiday_name VARCHAR(50)
);

CREATE TABLE time_dim (
    time_key INT PRIMARY KEY,
    time_value TIME NOT NULL,
    hour_24 SMALLINT NOT NULL,
    hour_12 SMALLINT NOT NULL,
    minute_of_hour SMALLINT NOT NULL,
    second_of_minute SMALLINT NOT NULL,
    day_of_week SMALLINT NOT NULL,
    day_of_week_name VARCHAR(10) NOT NULL,
    day_of_year SMALLINT NOT NULL,
    week_of_year SMALLINT NOT NULL,
    month SMALLINT NOT NULL,
    month_name VARCHAR(10) NOT NULL,
    quarter SMALLINT NOT NULL,
    year SMALLINT NOT NULL,
    am_pm VARCHAR(2) NOT NULL,
    is_holiday BOOLEAN DEFAULT FALSE,
    holiday_name VARCHAR(50)
);

*/

export const updateFreqs = {
  stream: "stream",
  asap: "asap",
  sla: "10S", // in seconds
  hourly: "hourly", // or every n hours
  periodic: "periodic", // perioidic in UTC (like morning, lunch, eod)
  daily: "daily",
}
export type UpdateFreq = (typeof updateFreqs)[keyof typeof updateFreqs]
