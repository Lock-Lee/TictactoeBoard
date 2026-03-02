import 'i18next'

import type common from '@/locales/en/common.json'
import type admin from '@/locales/en/admin.json'
import type auth from '@/locales/en/auth.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof common
      admin: typeof admin
      auth: typeof auth
    }
  }
}
