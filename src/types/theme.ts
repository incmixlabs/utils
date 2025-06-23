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
export type ThemeConfig = {
  appearance?: LanguageOption
  isSystemAppearance?: boolean
  accentColor: RadixColor
  secondaryColor: RadixColor
  grayColor: (typeof RADIX_GRAY_COLORS)[number]
  radius: (typeof RADIX_RADIUS)[number]
  scaling: (typeof SCALING_OPTIONS)[number]
  // panelBackground     : typeof PANEL_BACKGROUND_OPTIONS[number];

  /* brand-specific extensions */
  sidebarBg: string
  pastel?: boolean
  pastelShade?: number
  brightShade?: number
  avatarRadius?: RadixRadius
  workspaceRadius?: RadixRadius
  orgRadius?: RadixRadius
  dashboard: {
    color1: RadixColor
    color2: RadixColor
    color3: RadixColor
    color4: RadixColor
  }
  indicators: {
    danger?: RadixColor
    success?: RadixColor
    warning?: RadixColor
    info?: RadixColor
    default?: RadixGrayColor
  }
  breakFontColor: BreakFontColor
  direction?: "ltr" | "rtl"
}
