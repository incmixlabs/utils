import { arrayToCapitalObject } from "@objects"

const organizationsTranslationKeys = [
  "title",
  "createOrganization",
  "createNewOrganization",
  "organizationName",
  "organizationHandle",
  "noOrganizations",
  "errorLoading",
  "organizationHandleValidationSuccess",
  "organizationHandleValidationFail",
]
type OrganizationsTranslations = {
  [K in (typeof organizationsTranslationKeys)[number]]: string
}
const defaultOrganizationsTranslations: OrganizationsTranslations =
  arrayToCapitalObject(
    organizationsTranslationKeys
  ) as OrganizationsTranslations

type OrganizationDetailsTranslationMessage = {
  addMember: string
  updateMemberRole: string
  deleteOrganization: string
  updateOrganizationName: string
}

const organizationDetailsTranslationKeys = [
  "notFound",
  "deleteOrganization",
  "role",
  "actions",
  "newMemberEmail",
  "addMember",
  "cannotRemoveSelf",
  "deleteConfirmation",
  "editRole",
  "editName",
  "environmentVariables",
  "notFound",
  "addMember",
  "cannotRemoveSelf",
  "deleteConfirmation",
]
export type OrganizationDetailsTranslations = {
  [K in (typeof organizationDetailsTranslationKeys)[number]]: string
} & {
  success: OrganizationDetailsTranslationMessage
  error: OrganizationDetailsTranslationMessage
}
const defaultOrganizationDetailsTranslations: OrganizationDetailsTranslations =
  {
    ...(arrayToCapitalObject(
      organizationDetailsTranslationKeys
    ) as OrganizationDetailsTranslations),
  }
console.log("default org ", defaultOrganizationDetailsTranslations)
const rolesTranslationKeys = ["owner", "admin", "editor", "commenter", "viewer"]
type RolesTranslations = {
  [K in (typeof rolesTranslationKeys)[number]]: string
}
const defaultRolesTranslations: RolesTranslations = arrayToCapitalObject(
  rolesTranslationKeys
) as RolesTranslations
const environmentVariablesTranslationKeys = [
  "createFileContextMenu",
  "createFolderContextMenu",
  "newFileTitle",
  "newFolderTitle",
  "editFileTitle",
  "editFolderTitle",
]
type EnvironmentVariablesTranslations = {
  [K in (typeof environmentVariablesTranslationKeys)[number]]: string
}
const defaultEnvironmentVariablesTranslations: EnvironmentVariablesTranslations =
  arrayToCapitalObject(
    environmentVariablesTranslationKeys
  ) as EnvironmentVariablesTranslations

export type I18nTranslations = {
  organizations: OrganizationsTranslations
  organizationDetails: OrganizationDetailsTranslations
  roles: RolesTranslations
  environmentVariables: EnvironmentVariablesTranslations
}
export const keys = {
  organizations: organizationsTranslationKeys,
  organizationDetails: organizationDetailsTranslationKeys,
  roles: rolesTranslationKeys,
  environmentVariables: environmentVariablesTranslationKeys,
}

export const defaults: I18nTranslations = {
  organizations: defaultOrganizationsTranslations,
  organizationDetails: {
    ...defaultOrganizationDetailsTranslations,
  },
  roles: defaultRolesTranslations,
  environmentVariables: defaultEnvironmentVariablesTranslations,
}
