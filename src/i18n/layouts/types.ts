import { arrayToCapitalObject } from "@objects/objects"
const sidebarTranslationKeys = [
  "dashboard",
  "inbox",
  "ecommerce",
  "usersList",
  "profile",
  "feed",
  "settings",
  "pages",
  "organizations",
  "authentication",
  "docs",
  "components",
  "help",
]
export type SidebarTranslations = {
  [K in (typeof sidebarTranslationKeys)[number]]: string
}
export const defaultSidebarTranslations: SidebarTranslations =
  arrayToCapitalObject(sidebarTranslationKeys) as SidebarTranslations
export const navbarTranslationKeys = [
  "toggleSidebar",
  "search",
  "toggleTheme",
  "notifications",
  "settings",
  "profile",
  "logout",
]
export type NavbarTranslations = {
  [K in (typeof navbarTranslationKeys)[number]]: string
}

export const defaultNavbarTranslations: NavbarTranslations =
  arrayToCapitalObject(navbarTranslationKeys) as NavbarTranslations

export type I18nTranslations = {
  sidebar: SidebarTranslations
  navbar: NavbarTranslations
}
export const keys = {
  sidebar: sidebarTranslationKeys,
  navbar: navbarTranslationKeys,
}
export const defaults: I18nTranslations = {
  sidebar: defaultSidebarTranslations,
  navbar: defaultNavbarTranslations,
}
