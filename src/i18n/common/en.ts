import type { I18nTranslations } from "@i18n/core/types"
import { defaults } from "@i18n/core/types"
export const enTranslations: I18nTranslations = {
  profileImage: {
    error: {
      ...defaults?.profileImage?.error,
      uploadProfilePicture: "Error uploading profile picture",
      addProfilePicture: "Error adding profile picture",
      deleteProfilePicture: "Error deleting profile picture",
    },
    success: {
      ...defaults?.profileImage?.success,
      uploadProfilePicture: "Profile picture uploaded successfully",
      addProfilePicture: "Profile picture added successfully",
      deleteProfilePicture: "Profile picture deleted successfully",
    },
  },
  calendar: {
    ...defaults.calendar,
  },
}
