export const RADIX_ACCENT_COLORS = [
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "lime",
  "yellow",
  "amber",
  "orange",
  "brown",
  "sky",
  "mint",
] as const
export type RadixColor = (typeof RADIX_ACCENT_COLORS)[number] | "gray"
export const RADIX_GRAY_COLORS = [
  "gray",
  "mauve",
  "slate",
  "sage",
  "olive",
  "sand",
] as const
export const RADIX_ANY_COLORS_OPTIONS = [
  ...RADIX_ACCENT_COLORS,
  ...RADIX_GRAY_COLORS,
] as const
export type RadixGrayColor = (typeof RADIX_GRAY_COLORS)[number]
export type RadixAnyColor = (typeof RADIX_ANY_COLORS_OPTIONS)[number]

export const RADIX_RADIUS = [
  "none",
  "small",
  "medium",
  "large",
  "full",
] as const
export type RadixRadius = (typeof RADIX_RADIUS)[number]
// export const PANEL_BACKGROUND_OPTIONS = ['solid','translucent','none'] as const;
export const SCALING_OPTIONS = ["90%", "95%", "100%", "105%", "110%"] as const
export type RadixScaling = (typeof SCALING_OPTIONS)[number]
export const APPEARANCE_OPTIONS = ["light", "dark"] as const
export type AppearanceOption = (typeof APPEARANCE_OPTIONS)[number]
export const LANGUAGE_OPTIONS = ["en", "pt"]
export type LanguageOption = (typeof LANGUAGE_OPTIONS)[number]
export const fontColor = {
  light: "var(--gray-12)",
  dark: "var(--gray-1)",
}
export type BreakFontColor = {
  default: number
} & {
  [K in RadixColor]?: number
}
// default shade when font color is light
// for yellow foe example is 10
export const breakFontColor: BreakFontColor = {
  default: 9,
  yellow: 10,
  gray: 10,
}
export type Variables = {
  [key: string]: string
}

export const KEY_OPTIONS = [
  "google_maps",
  "google_drive",
  "google_calendar",
  "gemini",
  "claude",
] as const
export type KeyOption = (typeof KEY_OPTIONS)[number]
export const KEY_STATUS = ["active", "inactive", "expired"] as const
export type KeyStatus = (typeof KEY_STATUS)[number]
export type APIKey = {
  [K in KeyOption]?: {
    key: string
    secret?: string
    redirectURI?: string
    expiresIn?: number
    status?: boolean
    error?: string
    rateLimit?: {
      limit: number
      remaining: number
    }
  }
}
export type UserPreference = {
  appearance?: AppearanceOption
  isSystemAppearance: boolean
  language?: LanguageOption
  direction?: "ltr" | "rtl"
}
export type DashboardColor = {
  color1: RadixColor
  color2: RadixColor
  color3: RadixColor
  color4: RadixColor
}
export type IndicatorColor = {
  danger?: RadixColor
  success?: RadixColor
  warning?: RadixColor
  info?: RadixColor
  default?: RadixGrayColor
}
export type ThemeConfig = {
  accentColor: RadixColor
  secondaryColor: RadixColor
  grayColor: (typeof RADIX_GRAY_COLORS)[number]
  radius: (typeof RADIX_RADIUS)[number]
  scaling: (typeof SCALING_OPTIONS)[number]
  sidebarBg: string
  pastel?: boolean
  pastelShade?: number
  brightShade?: number
  avatarRadius?: RadixRadius
  workspaceRadius?: RadixRadius
  orgRadius?: RadixRadius
  dashboard: DashboardColor
  indicators: IndicatorColor
  breakFontColor: BreakFontColor
}
export type IntegrationConfig = {
  variables?: Variables
  keys?: APIKey
}
export type SettingsConfig = {
  userPreference: UserPreference
  integration?: IntegrationConfig
  theme: ThemeConfig
}
