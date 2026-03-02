'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef } from 'react'

interface QueryParamsConfig {
  page?: number
  limit?: number
  search?: string
  [key: string]: string | number | undefined
}

export function useQueryParams<T extends QueryParamsConfig>(defaultValues: T) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialized = useRef(false)

  // Parse current URL params
  const params = useMemo(() => {
    const result = { ...defaultValues }

    for (const key of Object.keys(defaultValues)) {
      const value = searchParams.get(key)
      if (value !== null) {
        const defaultValue = defaultValues[key]
        if (typeof defaultValue === 'number') {
          result[key as keyof T] = parseInt(value, 10) as T[keyof T]
        } else {
          result[key as keyof T] = value as T[keyof T]
        }
      }
    }

    return result
  }, [searchParams, defaultValues])

  // Initialize URL with default params on first load
  useEffect(() => {
    if (initialized.current) return

    // Check if any params are missing from URL
    const currentParams = new URLSearchParams(searchParams.toString())
    let needsUpdate = false

    for (const [key, value] of Object.entries(defaultValues)) {
      if (!currentParams.has(key) && value !== '' && value !== undefined) {
        currentParams.set(key, String(value))
        needsUpdate = true
      }
    }

    if (needsUpdate) {
      const queryString = currentParams.toString()
      router.replace(`${pathname}?${queryString}`, { scroll: false })
    }

    initialized.current = true
  }, [searchParams, pathname, router, defaultValues])

  // Update URL with new params
  const setParams = useCallback(
    (updates: Partial<T>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())

      // Merge current params with updates
      const mergedParams = { ...params, ...updates }

      // Set all params (including defaults)
      for (const [key, value] of Object.entries(mergedParams)) {
        if (value === undefined) {
          newSearchParams.delete(key)
        } else if (value === '' && defaultValues[key] === '') {
          // Keep empty string only if it's not a search field default
          newSearchParams.delete(key)
        } else if (value === '') {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      const queryString = newSearchParams.toString()
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname

      router.replace(newUrl, { scroll: false })
    },
    [searchParams, pathname, router, params, defaultValues]
  )

  // Reset all params to defaults
  const resetParams = useCallback(() => {
    const newSearchParams = new URLSearchParams()

    for (const [key, value] of Object.entries(defaultValues)) {
      if (value !== '' && value !== undefined) {
        newSearchParams.set(key, String(value))
      }
    }

    const queryString = newSearchParams.toString()
    router.replace(`${pathname}?${queryString}`, { scroll: false })
  }, [router, pathname, defaultValues])

  return { params, setParams, resetParams }
}
