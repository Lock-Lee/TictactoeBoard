export const i18nConfig = {
  locales: ['th', 'en'] as const,
  defaultLocale: 'th' as const,
  prefixDefault: true, // Always show locale prefix including default (th)
}

export type Locale = (typeof i18nConfig.locales)[number]
