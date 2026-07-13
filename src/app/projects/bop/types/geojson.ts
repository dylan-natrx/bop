import type { RankingSite } from './site'

/**
 * GeoJSON types for the rankings data
 */

export interface Geometry {
  type: 'MultiPolygon' | 'Polygon' | 'Point'
  coordinates: number[][][] | number[][][][] | number[]
}

export interface Feature<T = Record<string, unknown>> {
  type: 'Feature'
  properties: T
  geometry: Geometry
}

export interface FeatureCollection<T = Record<string, unknown>> {
  type: 'FeatureCollection'
  features: Feature<T>[]
}

export type RankingsFeatureCollection = FeatureCollection<RankingSite>
