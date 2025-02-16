export type LoginTranslations = {
  title: string
  emailValidation: string
  passwordValidation: string
  submit: string
  loggingIn: string
  googleLogin: string
  signupPrompt: string
  forgotPassword: string
  redirected: string
  closeWindow: string
  error: {
    googleAuthUrl: string
    googleAuth: string
    login: string
    logout: string
  }
  success: {
    login: string
    logout: string
  }
}
export type ForgotPasswordTranslations = {
  title: string
  submit: string
  loginPrompt: string
  error: {
    userNotFound: string
  }
  success: {
    emailSent: string
  }
}
export type ResetPasswordTranslations = {
  title: string
  submit: string
  loginPrompt: string
  error: string
  success: string
}

export type EmailVerificationTranslations = {
  title: string
  verifying: string
  verified: string
}

export type SignupTranslations = {
  title: string
  fullNameValidation: string
  emailValidation: string
  passwordValidation: string
  submit: string
  signingUp: string
  signupSuccess: string
  loginPrompt: string
  error: {
    signup: string
  }
}

export type I18nTranslations = {
  login: LoginTranslations
  forgotPassword: ForgotPasswordTranslations
  resetPassword: ResetPasswordTranslations
  emailVerification: EmailVerificationTranslations
  signup: SignupTranslations
}
export const keys = {
  login: [
    "title",
    "emailValidation",
    "passwordValidation",
    "submit",
    "loggingIn",
    "googleLogin",
    "signupPrompt",
    "forgotPassword",
    "redirected",
    "closeWindow",
    "error",
    "success",
  ],
  forgotPassword: ["title", "submit", "loginPrompt", "error", "success"],
  resetPassword: ["title", "submit", "loginPrompt", "error", "success"],
  emailVerification: ["title", "verifying", "verified"],
  signup: [
    "title",
    "fullNameValidation",
    "emailValidation",
    "passwordValidation",
    "submit",
    "signingUp",
    "signupSuccess",
    "loginPrompt",
    "error",
  ],
}

export const defaults: I18nTranslations = {
  login: {
    title: "Login",
    emailValidation: "Please enter a valid email address",
    passwordValidation: "Please enter a password",
    submit: "Login",
    loggingIn: "Logging in...",
    googleLogin: "Login with Google",
    signupPrompt: "Don't have an account?",
    forgotPassword: "Forgot password?",
    redirected: "Redirecting...",
    closeWindow: "Close window",
    error: {
      googleAuthUrl: "Failed to get Google auth URL",
      googleAuth: "Failed to authenticate with Google",
      login: "Failed to login",
      logout: "Failed to logout",
    },
    success: {
      login: "Logged in successfully",
      logout: "Logged out successfully",
    },
  },
  forgotPassword: {
    title: "Forgot Password",
    submit: "Submit",
    loginPrompt: "Remembered your password?",
    error: {
      userNotFound: "User not found",
    },
    success: {
      emailSent: "Email sent",
    },
  },
  resetPassword: {
    title: "Reset Password",
    submit: "Submit",
    loginPrompt: "Remembered your password?",
    error: "Failed to reset password",
    success: "Password reset successfully",
  },
  emailVerification: {
    title: "Email Verification",
    verifying: "Verifying...",
    verified: "Email verified",
  },
  signup: {
    title: "Sign Up",
    fullNameValidation: "Please enter your full name",
    emailValidation: "Please enter a valid email address",
    passwordValidation: "Please enter a password",
    submit: "Sign Up",
    signingUp: "Signing up...",
    signupSuccess: "Signed up successfully",
    loginPrompt: "Already have an account?",
    error: {
      signup: "Failed to sign up",
    },
  },
}
