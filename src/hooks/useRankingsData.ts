'use client'

import { useState, useEffect } from 'react'
import type { RankingsFeatureCollection } from '@/types/geojson'
import type { RankingSite } from '@/types/site'
import { loadRankingsData, extractSites } from '@/lib/data'

interface UseRankingsDataResult {
  geojson: RankingsFeatureCollection | null
  sites: RankingSite[]
  isLoading: boolean
  error: Error | null
}

/**
 * Hook to load and cache rankings data
 *
 * Loads the full rankings.geojson once and provides
 * both the raw GeoJSON (for maps) and extracted site properties.
 */
export function useRankingsData(): UseRankingsDataResult {
  const [geojson, setGeojson] = useState<RankingsFeatureCollection | null>(null)
  const [sites, setSites] = useState<RankingSite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await loadRankingsData()
        if (!cancelled) {
          setGeojson(data)
          setSites(extractSites(data))
          setIsLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load data'))
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { geojson, sites, isLoading, error }
}
