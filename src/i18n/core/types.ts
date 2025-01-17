import { arrayToCapitalObject } from "@objects"

type ProfileImageTranslationMessage = {
  uploadProfilePicture: string
  addProfilePicture: string
  deleteProfilePicture: string
}
type ProfileImageTranslations = {
  error: ProfileImageTranslationMessage
  success: ProfileImageTranslationMessage
}

const calendarTranslationKeys = [
  "eventsFor",
  "addEvent",
  "editEvent",
  "deleteEvent",
  "newEvent",
]

type CalendarTranslations = {
  [K in (typeof calendarTranslationKeys)[number]]: string
}
const defaultCalendarTranslations: CalendarTranslations = arrayToCapitalObject(
  calendarTranslationKeys
) as CalendarTranslations

export type I18nTranslations = {
  profileImage: ProfileImageTranslations
  calendar: CalendarTranslations
}

export const keys = {
  profileImage: [
    "uploadProfilePicture",
    "addProfilePicture",
    "deleteProfilePicture",
  ],
  calendar: calendarTranslationKeys,
}

export const defaults: I18nTranslations = {
  profileImage: {
    error: {
      uploadProfilePicture:
        "An error occurred while uploading the profile picture",
      addProfilePicture: "An error occurred while adding the profile picture",
      deleteProfilePicture:
        "An error occurred while deleting the profile picture",
    },
    success: {
      uploadProfilePicture: "Profile picture uploaded successfully",
      addProfilePicture: "Profile picture added successfully",
      deleteProfilePicture: "Profile picture deleted successfully",
    },
  },
  calendar: defaultCalendarTranslations,
}
