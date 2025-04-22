import type { I18nTranslations } from "./types"

import { mergeDeep } from "@objects"
import { type OrganizationDetailsTranslations, defaults } from "./types"

const organizationDetails: OrganizationDetailsTranslations = mergeDeep(
  defaults.organizationDetails,
  {
    notFound: "Organização não encontrada",
    deleteOrganization: "Excluir Organização",
    role: "Função",
    actions: "Ações",
    newMemberEmail: "E-mail do Novo Membro",
    addMember: "Adicionar Membro",
    cannotRemoveSelf: "Você não pode remover a si mesmo",
    deleteConfirmation: "Tem certeza que deseja excluir {name}?",
    editRole: "Editar função",
    editName: "Editar nome",
    environmentVariables: "Variáveis de Ambiente",
    success: {
      addMember: "Membro adicionado com sucesso",
      updateMemberRole: "Função do membro atualizada com sucesso",
      deleteOrganization: "Organização excluída com sucesso",
      updateOrganizationName: "Nome da organização atualizado com sucesso",
    },
    error: {
      addMember: "Erro ao adicionar membro",
      updateMemberRole: "Erro ao atualizar função do membro",
      deleteOrganization: "Erro ao excluir organização",
      updateOrganizationName: "Erro ao atualizar nome da organização",
    },
  }
)
export const ptTranslations: I18nTranslations = {
  organizations: {
    title: "Organizações",
    createOrganization: "Criar Organização",
    createNewOrganization: "Criar Nova Organização",
    organizationName: "Nome da Organização",
    organizationHandle: "Identificador da Organização",
    noOrganizations: "Você ainda não faz parte de nenhuma organização.",
    errorLoading: "Falha ao carregar organizações. Por favor, tente novamente.",
    organizationHandleValidationSuccess:
      "Identificador da organização está disponível",
    organizationHandleValidationFail:
      "Identificador da organização não está disponível",
  },
  organizationDetails,
  roles: {
    owner: "Proprietário",
    admin: "Administrador",
    editor: "Editor",
    commenter: "Comentador",
    viewer: "Visualizador",
  },
  environmentVariables: {
    createFileContextMenu: "Criar Variável",
    createFolderContextMenu: "Criar Pasta",
    newFileTitle: "Nova Variável",
    newFolderTitle: "Nova Pasta",
    editFileTitle: "Editar Variável",
    editFolderTitle: "Editar Pasta",
  },
}
