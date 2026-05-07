import type { RankingSite, SiteStats, FrameworkPrimerSite } from '@/types/site'
import type { RankingsFeatureCollection, Feature } from '@/types/geojson'

/**
 * Load rankings data (all 78 sites)
 * Called once at app load, cached by React
 */
export async function loadRankingsData(): Promise<RankingsFeatureCollection> {
  const response = await fetch('/data/rankings.geojson')
  if (!response.ok) {
    throw new Error(`Failed to load rankings data: ${response.status}`)
  }
  return response.json()
}

/**
 * Extract site properties from rankings GeoJSON
 */
export function extractSites(
  geojson: RankingsFeatureCollection
): RankingSite[] {
  return geojson.features.map((feature) => feature.properties as RankingSite)
}

/**
 * Get sites sorted by rank
 */
export function getSitesByRank(sites: RankingSite[]): RankingSite[] {
  return [...sites].sort((a, b) => a.Rank - b.Rank)
}

/**
 * Get design pipeline sites (Status === 'Design')
 */
export function getDesignPipelineSites(sites: RankingSite[]): RankingSite[] {
  return sites.filter((site) => site.Status === 'Design')
}

/**
 * Get site by ID
 */
export function getSiteById(
  geojson: RankingsFeatureCollection,
  id: string
): Feature<RankingSite> | undefined {
  return geojson.features.find(
    (f) => (f.properties as RankingSite).id === id
  ) as Feature<RankingSite> | undefined
}

/**
 * Load statistics for a single site
 * Called on-demand when site detail panel opens
 */
export async function loadSiteStats(siteId: string): Promise<SiteStats> {
  const response = await fetch(`/data/sites/${siteId}.json`)
  if (!response.ok) {
    throw new Error(`Failed to load site stats for ${siteId}: ${response.status}`)
  }
  return response.json()
}

/**
 * Load framework primer data for § 02
 */
export async function loadFrameworkPrimerData(): Promise<FrameworkPrimerSite[]> {
  const response = await fetch('/data/framework-primer.json')
  if (!response.ok) {
    throw new Error(`Failed to load framework primer data: ${response.status}`)
  }
  return response.json()
}

/**
 * Calculate centroid from MultiPolygon coordinates
 * Used for placing site markers on the hero SVG map
 */
export function calculateCentroid(
  coordinates: number[][][][] | number[][][]
): [number, number] {
  // Flatten to get all points
  const points: [number, number][] = []

  // Handle both Polygon and MultiPolygon
  const rings =
    Array.isArray(coordinates[0][0][0])
      ? (coordinates as number[][][][]).flat()
      : (coordinates as number[][][])

  for (const ring of rings) {
    for (const point of ring) {
      points.push([point[0], point[1]])
    }
  }

  // Calculate average
  const sumLng = points.reduce((sum, p) => sum + p[0], 0)
  const sumLat = points.reduce((sum, p) => sum + p[1], 0)

  return [sumLng / points.length, sumLat / points.length]
}

/**
 * Calculate total acreage across all sites
 */
export function calculateTotalAcreage(sites: RankingSite[]): number {
  return sites.reduce((sum, site) => sum + site.Acres, 0)
}
