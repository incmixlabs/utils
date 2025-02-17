import { arrayToCapitalObject } from "@objects/objects"

const dashboardTranslationKeys = ["title", "welcome", "editMode"] as const
type DashboardTranslations = {
  [key in (typeof dashboardTranslationKeys)[number]]: string
}
const defaultDashboardTranslations: DashboardTranslations =
  arrayToCapitalObject(
    Array.from(dashboardTranslationKeys)
  ) as DashboardTranslations
export type I18nTranslations = {
  dashboard: DashboardTranslations
}
export const keys = {
  dashboard: dashboardTranslationKeys,
}
export const defaults: I18nTranslations = {
  dashboard: defaultDashboardTranslations,
}
