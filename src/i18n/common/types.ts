import { arrayToCapitalObject } from "@objects"

const commonTranslationKeys = [
  "loading",
  "fullName",
  "email",
  "name",
  "value",
  "notes",
  "member",
  "password",
  "verificationCode",
  "back",
  "you",
  "remove",
  "confirm",
  "cancel",
  "users",
  "create",
  "creating",
  "edit",
  "delete",
  "above",
  "below",
  "inside",
  "login",
  "logout",
  "loginPrompt",
  "submit",
]

type CommonTranslations = {
  [K in (typeof commonTranslationKeys)[number]]: string
}

const defaultCommonTranslations: CommonTranslations = arrayToCapitalObject(
  commonTranslationKeys as string[]
) as CommonTranslations

type PageNotFoundTranslations = {
  title: string
  message: string
  backToHome: string
}
const dbConnectionsKeys = [
  "dbConnections",
  "addNewConnection",
  "connectionName",
  "connectionString",
  "host",
  "port",
  "username",
  "password",
  "testConnection",
  "testingConnection",
  "connectionTestSuccess",
  "connectionTestFailed",
  "deleteConnection",
  "deleteConfirmation",
  "connectionNameRequired",
  "connectionStringRequired",
  "hostRequired",
  "portRequired",
  "usernameRequired",
  "passwordRequired",
]
type dbConnections = {
  [K in (typeof dbConnectionsKeys)[number]]: string
}
const defaultDbConnections = arrayToCapitalObject(
  dbConnectionsKeys
) as dbConnections

export type I18nTranslations = {
  common: CommonTranslations
  pageNotFound: PageNotFoundTranslations
  dbConnections: dbConnections
}
export const keys = {
  common: commonTranslationKeys,
  pageNotFound: ["title", "message", "backToHome"],
  dbConnections: dbConnectionsKeys,
}
export const defaults: I18nTranslations = {
  common: defaultCommonTranslations,
  pageNotFound: {
    title: "Page Not Found",
    message: "The page you are looking for does not exist.",
    backToHome: "Back to Home",
  },
  dbConnections: defaultDbConnections,
}
