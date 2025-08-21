import { arrayToCapitalObject } from "@objects"

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
  "deleteProfilePicture",
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
  profileInformation: string
  logout: string
  uploadProfilePicture: string
  addProfilePicture: string
  updateUser: string
  deleteProfilePicture: string
  changePassword: string
  error: Status
  success: Status
}
export type Status = Record<(typeof statusKeys)[number], string>
export const defaultProfileTranslations: ProfileTranslations = {
  ...(arrayToCapitalObject(profileTranslationKeys) as any),
  error: {
    uploadProfilePicture: "Upload Profile Picture",
    addProfilePicture: "Add Profile Picture",
    updateUser: "Update User",
    deleteProfilePicture: "Delete Profile Picture",
    changePassword: "Change Password",
  },
  success: {
    uploadProfilePicture: "Upload Profile Picture",
    addProfilePicture: "Add Profile Picture",
    updateUser: "Update User",
    deleteProfilePicture: "Delete Profile Picture",
    changePassword: "Change Password",
  },
}

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
