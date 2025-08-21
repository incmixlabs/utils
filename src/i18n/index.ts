export { enTranslations } from "./en"
export { ptTranslations } from "./pt"

export type Language = "en" | "pt"

export const Locale: Record<Language, string> = {
  en: "en",
  pt: "pt-BR",
}
// Define the structure of localized text for holiday names, comments, etc.
export interface LocalizedText {
  lang: Language // e.g., "en", "es", "fr"
  text: string
}
