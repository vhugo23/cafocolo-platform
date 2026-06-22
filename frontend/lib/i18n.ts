import { en } from "@/lib/dictionaries/en";
import { pt } from "@/lib/dictionaries/pt";

export type Locale = "en" | "pt";

export const supportedLocales: Locale[] = ["en", "pt"];

export function getDictionary(locale: Locale) {
  return locale === "pt" ? pt : en;
}

export function getLocalePrefix(locale: Locale) {
  return locale === "pt" ? "/pt" : "";
}