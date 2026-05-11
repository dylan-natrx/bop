'use client'

import { useEffect, useState } from 'react'
import type { SiteStats } from '@/types/site'

interface StatisticsFeatureCollection {
  type: 'FeatureCollection'
  features: Array<{
    type: 'Feature'
    properties: SiteStats
    geometry: unknown
  }>
}

interface UseStatisticsDataResult {
  /** Map from site id (string, as stored in the data) to stats record */
  byId: Record<string, SiteStats>
  isLoading: boolean
  error: Error | null
}

/**
 * Loads /data/statistics.geojson and indexes the per-site statistics by id.
 *
 * Used by the methodology walkthrough to read per-variable scores
 * (sal_score, chla_score, do_score) and the flag fields the walkthrough
 * applies to the Map 2 layers.
 */
export function useStatisticsData(): UseStatisticsDataResult {
  const [byId, setById] = useState<Record<string, SiteStats>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const response = await fetch('/data/statistics.geojson')
        if (!response.ok) {
          throw new Error(`Failed to load statistics: ${response.status}`)
        }
        const data: StatisticsFeatureCollection = await response.json()
        const indexed: Record<string, SiteStats> = {}
        for (const feature of data.features) {
          const props = feature.properties
          indexed[String(props.id)] = props
        }
        if (!cancelled) {
          setById(indexed)
          setIsLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load statistics'))
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { byId, isLoading, error }
}
