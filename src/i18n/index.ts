export { enTranslations } from "./en"
export { ptTranslations } from "./pt"

export type Language = "en" | "pt"

export const Locale: Record<Language, string> = {
  en: "en",
  pt: "pt-BR",
}
