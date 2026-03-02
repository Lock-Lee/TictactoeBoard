'use client'

import i18next from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import {
  initReactI18next,
  type UseTranslationOptions,
  useTranslation as useTranslationOrg,
} from 'react-i18next'
import { i18nConfig, type Locale } from './i18nConfig'

// Type-safe namespace definitions
export type Namespace = 'common' | 'admin' | 'auth'

// Initialize i18next for client-side
i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`@/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    lng: i18nConfig.defaultLocale,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: 'common',
    fallbackNS: 'common',
    ns: ['common', 'admin', 'auth'] satisfies Namespace[],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false, // For client components
    },
  })

export function useTranslation<N extends Namespace | Namespace[] = 'common'>(
  ns?: N,
  options?: UseTranslationOptions<undefined>
) {
  return useTranslationOrg(ns, options)
}

export function changeLanguage(locale: Locale) {
  return i18next.changeLanguage(locale)
}

export { i18next }
