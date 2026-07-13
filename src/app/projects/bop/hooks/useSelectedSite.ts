'use client'

import { useCallback, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

interface UseSelectedSiteResult {
  /** Currently selected site ID, or null */
  selectedSiteId: string | null
  /** Select a site (updates URL) */
  selectSite: (siteId: string) => void
  /** Clear selection (removes site param from URL) */
  clearSelection: () => void
  /** Check if a specific site is selected */
  isSelected: (siteId: string) => boolean
}

/**
 * Hook to manage selected site state via URL params
 *
 * Keeps the selected site in sync with the URL hash/query param
 * so that site detail pages can be deep-linked and shared.
 *
 * URL format: ?site=27 or /site/27
 */
export function useSelectedSite(): UseSelectedSiteResult {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const selectedSiteId = useMemo(() => {
    return searchParams.get('site')
  }, [searchParams])

  const selectSite = useCallback(
    (siteId: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('site', siteId)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  const clearSelection = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('site')
    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    })
  }, [searchParams, router, pathname])

  const isSelected = useCallback(
    (siteId: string) => {
      return selectedSiteId === siteId
    },
    [selectedSiteId]
  )

  return {
    selectedSiteId,
    selectSite,
    clearSelection,
    isSelected,
  }
}
