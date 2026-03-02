'use client'

import { useRouter } from 'next/navigation'
import { useLocale } from './useLocale'

export function useLocalizedRouter() {
  const router = useRouter()
  const { localePath } = useLocale()

  return {
    push: (path: string) => router.push(localePath(path)),
    replace: (path: string) => router.replace(localePath(path)),
    back: () => router.back(),
    forward: () => router.forward(),
    refresh: () => router.refresh(),
    prefetch: (path: string) => router.prefetch(localePath(path)),
  }
}
