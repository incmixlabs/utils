import type { I18nTranslations } from "./types"

export const ptTranslations: I18nTranslations = {
  login: {
    title: "Entrar",
    emailValidation: "Por favor, insira um email válido",
    passwordValidation: "Por favor, insira sua senha",
    submit: "Entrar",
    loggingIn: "Iniciando sessão...",
    googleLogin: "Entrar com Google",
    signupPrompt: "Não tem uma conta? Cadastre-se",
    forgotPassword: "Esqueceu sua senha?",
    redirected: "Você será redirecionado para o app.",
    closeWindow: "Você pode fechar esta janela.",
    error: {
      googleAuthUrl: "Falha ao recuperar URL de autenticação",
      googleAuth: "Falha ao autenticar com Google",
      login: "Erro ao efetuar login",
      logout: "Erro ao efetuar logout",
    },
    success: {
      login: "Login efetuado com sucesso",
      logout: "Logout efetuado com sucesso",
    },
  },
  forgotPassword: {
    title: "Esqueceu a Senha",
    submit: "Continuar",
    loginPrompt: "Já tem uma conta? Faça login",
    success: {
      emailSent: "Email enviado com sucesso",
    },
    error: {
      userNotFound: "Conta de usuário não existe",
    },
  },
  resetPassword: {
    title: "Redefinir Senha",
    submit: "Enviar",
    loginPrompt: "Já tem uma conta? Faça login",
    success: "Senha redefinida com sucesso",
    error: "Falha ao redefinir a senha",
  },
  signup: {
    title: "Cadastro",
    fullNameValidation: "Por favor, insira seu nome",
    emailValidation: "Por favor, insira um email válido",
    passwordValidation: "Por favor, insira sua senha",
    submit: "Cadastrar",
    signingUp: "Cadastrando...",
    signupSuccess: "Cadastro realizado com sucesso",
    loginPrompt: "Já tem uma conta? Faça login",
    error: {
      signup: "Erro ao cadastrar",
    },
  },
  emailVerification: {
    title: "Verificação de Email",
    verifying: "Verificando",
    verified: "Verificado",
  },
}
