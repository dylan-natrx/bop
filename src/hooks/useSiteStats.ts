'use client'

import { useState, useEffect } from 'react'
import type { SiteStats } from '@/types/site'
import { loadSiteStats } from '@/lib/data'

interface UseSiteStatsResult {
  stats: SiteStats | null
  isLoading: boolean
  error: Error | null
}

/**
 * Hook to load statistics for a single site
 *
 * Fetches /data/sites/{id}.json on demand when siteId changes.
 * Returns null stats when no siteId is provided.
 */
export function useSiteStats(siteId: string | null): UseSiteStatsResult {
  const [stats, setStats] = useState<SiteStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!siteId) {
      setStats(null)
      setIsLoading(false)
      setError(null)
      return
    }

    let cancelled = false
    setIsLoading(true)
    setError(null)

    async function load() {
      if (!siteId) return
      try {
        const data = await loadSiteStats(siteId)
        if (!cancelled) {
          setStats(data)
          setIsLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load site stats'))
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [siteId])

  return { stats, isLoading, error }
}
