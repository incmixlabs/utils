export { enTranslations } from "./en"
export { ptTranslations } from "./pt"

export type Language = "en" | "pt" | "en-us" | "pt-BR"

export const Locale: Record<Language, string> = {
  en: "en-US",
  "en-us": "en-US",
  pt: "pt-BR",
  "pt-BR": "pt-BR"
}
