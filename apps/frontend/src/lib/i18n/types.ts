import type admin from '@/locales/en/admin.json'
import type auth from '@/locales/en/auth.json'
import type common from '@/locales/en/common.json'

// Resource types
export type CommonResource = typeof common
export type AdminResource = typeof admin
export type AuthResource = typeof auth

// Navigation keys
export type NavigationKey = keyof CommonResource['navigation']

// Navigation text keys (for menu items like 'navigation.dashboard')
export type NavigationTextKey = `navigation.${NavigationKey}`

// Helper to get nested keys (dot notation)
type NestedKeyOf<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? NestedKeyOf<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`
    }[keyof T & string]
  : never

// All translation keys for each namespace
export type CommonKeys = NestedKeyOf<CommonResource>
export type AdminKeys = NestedKeyOf<AdminResource>
export type AuthKeys = NestedKeyOf<AuthResource>
