import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Sarabun } from 'next/font/google'
import { notFound } from 'next/navigation'
import { i18nConfig, type Locale } from '@/lib/i18n/i18nConfig'
import { I18nProvider } from '@/providers/I18nProvider'
import { QueryProvider } from '@/providers/QueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'

const sarabun = Sarabun({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-sarabun',
})

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  // Validate locale
  if (!i18nConfig.locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={sarabun.className}>
        <AppRouterCacheProvider>
          <I18nProvider locale={locale as Locale}>
            <ThemeProvider>
              <QueryProvider>{children}</QueryProvider>
            </ThemeProvider>
          </I18nProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
