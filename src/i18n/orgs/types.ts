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
  notFound: string
  deleteOrganization: string
  role: string
  actions: string
  newMemberEmail: string
  addMember: string
  cannotRemoveSelf: string
  deleteConfirmation: string
  editRole: string
  editName: string
  environmentVariables: string
  success: OrganizationDetailsTranslationMessage
  error: OrganizationDetailsTranslationMessage
}
const defaultOrganizationDetailsTranslations: OrganizationDetailsTranslations =
  {
    ...(arrayToCapitalObject(organizationDetailsTranslationKeys) as any),
    success: {
      addMember: "Add Member",
      updateMemberRole: "Update Member Role",
      deleteOrganization: "Delete Organization",
      updateOrganizationName: "Update Organization Name",
    },
    error: {
      addMember: "Add Member",
      updateMemberRole: "Update Member Role",
      deleteOrganization: "Delete Organization",
      updateOrganizationName: "Update Organization Name",
    },
  }
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
