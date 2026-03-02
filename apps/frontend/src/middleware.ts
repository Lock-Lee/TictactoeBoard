import type { NextRequest } from 'next/server'
import { i18nRouter } from 'next-i18n-router'
import { i18nConfig } from '@/lib/i18n/i18nConfig'

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig)
}

// Apply middleware to all routes except static files, api, _next
export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - _next (Next.js internals)
    // - static files (images, fonts, etc.)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
