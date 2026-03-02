'use client'

import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18next } from '@/lib/i18n/client'
import type { Locale } from '@/lib/i18n/i18nConfig'

interface I18nProviderProps {
  children: React.ReactNode
  locale: Locale
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Change language when locale changes
    if (i18next.language !== locale) {
      i18next.changeLanguage(locale).then(() => {
        setIsInitialized(true)
      })
    } else {
      setIsInitialized(true)
    }
  }, [locale])

  // Prevent hydration mismatch by waiting for i18n to initialize
  if (!isInitialized) {
    return null
  }

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}
