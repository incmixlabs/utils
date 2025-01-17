import type { I18nTranslations } from "./common"
import { defaults } from "./common"
export const enTranslations: I18nTranslations = {
  common: {
    ...defaults.common,
    loading: "Loading...",
  },
  pageNotFound: {
    ...defaults.pageNotFound,
  },
  dbConnections: {
    ...defaults.dbConnections,
    testingConnection: "Testing Connection...",
    connectionTestSuccess: "Connection test successful",
    connectionTestFailed: "Connection test failed",
    deleteConfirmation: "Are you sure you want to delete {name}?",
    connectionNameRequired: "Connection name is required",
    connectionStringRequired: "Connection string is required",
    hostRequired: "Host field is required",
    portRequired: "Port field is required",
    usernameRequired: "Username is required",
    passwordRequired: "Password is required",
  },
}
