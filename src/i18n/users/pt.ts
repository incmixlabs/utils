import { mergeDeep } from "@objects"
import type { I18nTranslations } from "./types"
import { type ProfileTranslations, defaults } from "./types"

const profile: ProfileTranslations = mergeDeep(defaults.profile, {
  profileInformation: "Informações do Perfil",
  logout: "Sair",
  error: {
    uploadProfilePicture: "Erro ao enviar foto de perfil",
    addProfilePicture: "Erro ao adicionar foto de perfil",
    updateUser: "Erro ao atualizar usuário",
    deleteProfilePicture: "Erro ao deletar foto de perfil",
    changePassword: "Erro ao alterar senha",
  },
  success: {
    uploadProfilePicture: "Foto de perfil enviada com sucesso",
    addProfilePicture: "Foto de perfil adicionada com sucesso",
    updateUser: "Usuário atualizado com sucesso",
    deleteProfilePicture: "Foto de perfil deletada com sucesso",
    changePassword: "Senha alterada com sucesso",
  },
} as Partial<ProfileTranslations>) as ProfileTranslations
export const ptTranslations: I18nTranslations = {
  settings: {
    settings: "Configurações",
    generalInfo: "Informações gerais",
    nameRequired: "O nome é obrigatório",
    saving: "Salvando...",
    saveChanges: "Salvar alterações",
    changePassword: "Alterar senha",
    currentPassword: "Senha atual",
    currentPasswordRequired: "A senha atual é obrigatória",
    newPassword: "Nova senha",
    newPasswordLength: "A nova senha deve ter pelo menos 8 caracteres",
    confirmNewPassword: "Confirmar nova senha",
    confirmPasswordRequired: "Por favor, confirme sua nova senha",
    organizations: "Organizações",
    organization: "Organização",
    languageSettings: "Configurações de Idioma",
    selectLanguage: "Selecionar Idioma",
    sidebarSettings: "Configurações da Barra Lateral",
    minifySidebar: "Minificar Barra Lateral",
    themeSettings: "Configurações de Tema",
    darkMode: "Modo Escuro",
  },
  profile,
}
