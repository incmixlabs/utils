import type { I18nTranslations } from "./types"
import { defaults } from "./types"

export const enTranslations: I18nTranslations = {
  login: {
    ...defaults.login,
    title: "Log-In",
    emailValidation: "Please provide a valid email",
    passwordValidation: "Password must be at least 6 characters long",
    submit: "Login",
    loggingIn: "Logging in...",
    googleLogin: "Login with Google",
    signupPrompt: "Don't have an account? Sign up",
    forgotPassword: "Forgot Password?",
    redirected: "You'll be redirected to the app.",
    closeWindow: "You may close this window.",
    error: {
      googleAuthUrl: "Failed to retrieve authentication URL",
      googleAuth: "Failed to authenticate with Google",
      login: "Error logging in",
      logout: "Error logging out",
    },
    success: {
      login: "Login successful",
      logout: "Logout successful",
    },
  },
  forgotPassword: {
    title: "Forgot Password",
    submit: "Continue",
    loginPrompt: "Already have an account? Log in",
    success: {
      emailSent: "Email sent successfully",
    },
    error: {
      userNotFound: "User Account does not exist",
    },
  },
  resetPassword: {
    ...defaults.resetPassword,
    title: "Reset Password",
    submit: "Submit",
    loginPrompt: "Already have an account? Log in",
    success: "Password Reset successfully",
    error: "Password Reset Failed",
  },
  signup: {
    title: "Sign-Up",
    fullNameValidation: "Please enter your Name",
    emailValidation: "Please provide a valid email",
    passwordValidation: "Password must be at least 6 characters long",
    submit: "Sign Up",
    signingUp: "Signing up...",
    signupSuccess: "Signup successful",
    loginPrompt: "Already have an account? Log in",
    error: {
      signup: "Error signing up",
    },
  },
  emailVerification: {
    ...defaults.emailVerification,
    title: "Email Verification",
  },
}
