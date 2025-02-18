import { arrayToCapitalObject } from "@objects/objects"

export const settingTranslationKeys = [
  "settings",
  "generalInfo",
  "nameRequired",
  "saving",
  "saveChanges",
  "changePassword",
  "currentPassword",
  "currentPasswordRequired",
  "newPassword",
  "newPasswordLength",
  "confirmNewPassword",
  "confirmPasswordRequired",
  "organizations",
  "organization",
  "languageSettings",
  "selectLanguage",
  "sidebarSettings",
  "minifySidebar",
  "themeSettings",
  "darkMode",
]
export type SettingsTranslations = {
  [K in (typeof settingTranslationKeys)[number]]: string
}
export const defaultSettingsTranslations: SettingsTranslations =
  arrayToCapitalObject(settingTranslationKeys) as SettingsTranslations

const statusKeys = [
  "uploadProfilePicture",
  "addProfilePicture",
  "updateUser",
  "changePassword",
]
const profileTranslationKeys = [
  "profileInformation",
  "logout",
  "uploadProfilePicture",
  "addProfilePicture",
  "updateUser",
  "deleteProfilePicture",
  "changePassword",
]
export type ProfileTranslations = {
  [K in (typeof profileTranslationKeys)[number]]: string & {
    error: Status
    success: Status
  }
}
export type Status = {
  [K in (typeof statusKeys)[number]]: string
}
export const defaultProfileTranslations: ProfileTranslations =
  arrayToCapitalObject(profileTranslationKeys) as ProfileTranslations

export type I18nTranslations = {
  settings: SettingsTranslations
  profile: ProfileTranslations
}
export const keys = {
  settings: settingTranslationKeys,
  profile: {
    keys: typeof profileTranslationKeys,
  },
}
export const defaults: I18nTranslations = {
  settings: defaultSettingsTranslations,
  profile: defaultProfileTranslations,
}
