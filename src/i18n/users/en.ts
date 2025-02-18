import { mergeDeep } from "@objects/objects"
import type { I18nTranslations } from "./types"
import { type ProfileTranslations, defaults } from "./types"

const profile: ProfileTranslations = mergeDeep(defaults.profile, {
  error: {
    uploadProfilePicture: "Error uploading profile picture",
    addProfilePicture: "Error adding profile picture",
    updateUser: "Error updating user",
    deleteProfilePicture: "Error deleting profile picture",
    changePassword: "Error changing password",
  },
  success: {
    uploadProfilePicture: "Profile picture uploaded successfully",
    addProfilePicture: "Profile picture added successfully",
    updateUser: "User updated successfully",
    deleteProfilePicture: "Profile picture deleted successfully",
    changePassword: "Password changed successfully",
  },
})

export const enTranslations: I18nTranslations = {
  settings: {
    ...defaults.settings,
    generalInfo: "General information",
    nameRequired: "Name is required",
    saving: "Saving...",
    currentPasswordRequired: "Current password is required",
    newPasswordLength: "New password must be at least 8 characters",
    confirmPasswordRequired: "Please confirm your new password",
  },
  profile,
}
