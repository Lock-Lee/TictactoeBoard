import { treaty } from '@elysiajs/eden'
import { useMemo } from 'react'
import { useAuthStore } from '@/stores/authStore'
import type { App } from '../../../../backend/src'
import { API_BASE_URL, CREDENTIALS_MODE } from './config'

export const useAPIClient = () => {
  const accessToken = useAuthStore((state) => state.accessToken)

  const client = useMemo(() => {
    const token = accessToken || localStorage.getItem('accessToken')

    return treaty<App>(API_BASE_URL, {
      fetch: {
        credentials: CREDENTIALS_MODE,
      },
      headers: () => ({
        ...(token && { Authorization: `Bearer ${token}` }),
      }),
      onResponse: async (response) => {
        if (response.status === 401) {
          useAuthStore.getState().clearAuth()
          if (typeof window !== 'undefined') {
            window.location.href = '/'
          }
        }
      },
    })
  }, [accessToken])

  return client
}
