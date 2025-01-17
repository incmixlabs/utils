import { mergeDeep } from "@objects"
import type { I18nTranslations } from "./types"
import { type OrganizationDetailsTranslations, defaults } from "./types"
const organizationDetails: OrganizationDetailsTranslations = mergeDeep(
  defaults.organizationDetails,
  {
    notFound: "Organization not found",
    addMember: "Add Member",
    cannotRemoveSelf: "You cannot remove yourself",
    deleteConfirmation: "Are you sure you want to delete {name}?",
    success: {
      addMember: "Member added successfully",
      updateMemberRole: "Member role updated successfully",
      deleteOrganization: "Organization deleted successfully",
      updateOrganizationName: "Organization name updated successfully",
    },
    error: {
      addMember: "Error adding member",
      updateMemberRole: "Error updating member role",
      deleteOrganization: "Error deleting organization",
      updateOrganizationName: "Error updating organization name",
    },
  }
)
export const enTranslations: I18nTranslations = {
  organizations: {
    ...defaults.organizations,
    title: "Organizations",
    createOrganization: "Create Organization",
    noOrganizations: "You are not a member of any organizations yet.",
    errorLoading: "Failed to load organizations. Please try again.",
    organizationHandleValidationSuccess: "Organisation handle is availaiable",
    organizationHandleValidationFail: "Organisation handle is not availaiable",
  },
  organizationDetails,
  roles: {
    ...defaults.roles,
  },
  environmentVariables: {
    createFileContextMenu: "Create Variable",
    createFolderContextMenu: "Create Folder",
    newFileTitle: "New Variable",
    newFolderTitle: "New Folder",
    editFileTitle: "Edit Variable",
    editFolderTitle: "Edit Folder",
  },
}
