'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { i18nConfig, type Locale } from '@/lib/i18n/i18nConfig'

export function useLocale() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const locale = (params.locale as Locale) || i18nConfig.defaultLocale

  const changeLocale = (newLocale: Locale) => {
    // Replace the locale segment in the pathname
    const segments = pathname.split('/')
    segments[1] = newLocale // Replace locale segment
    const newPath = segments.join('/')
    router.push(newPath)
  }

  // Helper to build locale-aware paths
  const localePath = (path: string) => {
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return `/${locale}${normalizedPath}`
  }

  return {
    locale,
    locales: i18nConfig.locales,
    defaultLocale: i18nConfig.defaultLocale,
    changeLocale,
    localePath,
  }
}
