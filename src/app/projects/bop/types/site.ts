/**
 * Site data from rankings.geojson
 * Used for map rendering and rankings lists
 */
export interface RankingSite {
  id: string
  Site: string
  Status: 'Design' | 'Proposed Future Site'
  Waterbody: string
  Acres: number
  Rank: number
  Score: number
  ConfidenceRule: 'high' | 'moderate+' | 'moderate' | 'moderate-' | 'low'
  NearCSO: 'Yes' | 'No'
  NearMS4: 'Yes' | 'No'
  NearPark: 'Yes' | 'No'
  WaveExposure: 'Yes' | 'No' | null
  Erosion: 'Yes' | 'No' | null
  PercentageSuitableDepth: number
}

/**
 * Public-facing data support tier names
 * Mapped from internal ConfidenceRule values
 */
export type DataSupportTier = 'Robust' | 'Strong' | 'Adequate' | 'Limited' | 'Sparse'

/**
 * Mapping from internal confidence rules to public-facing tier names
 */
export const DATA_SUPPORT_LABELS: Record<RankingSite['ConfidenceRule'], DataSupportTier> = {
  high: 'Robust',
  'moderate+': 'Strong',
  moderate: 'Adequate',
  'moderate-': 'Limited',
  low: 'Sparse',
}

/**
 * Site statistics from per-site JSON files
 * Generated at build time from statistics.geojson
 */
export interface SiteStats {
  id: string
  Site: string
  Status: string
  Waterbody: string
  Acres: number

  // Salinity
  sal_score: number
  sal_mean_psu: number
  sal_ci_lower_psu: number
  sal_ci_upper_psu: number
  sal_median_psu: number
  sal_p10_psu: number
  sal_p90_psu: number

  // Chlorophyll-a
  chla_score: number
  chla_mean_ug_L: number
  chla_median_ug_L: number
  chla_p10_ug_L: number
  chla_p90_ug_L: number
  chla_ci_lower_ug_L: number
  chla_ci_upper_ug_L: number
  chla_nearest_station_m: number

  // Dissolved oxygen
  do_score: number
  do_mean_mg_L: number
  do_median_mg_L: number
  do_p10_mg_L: number
  do_p90_mg_L: number
  do_pct3: number
  do_pct3_low: number
  do_pct3_upper: number
  do_nearest_station_m: number

  // Built environment
  cso_within_50ft: string
  cso_nearest_ft: number
  ms4_within_50ft: string
  ms4_nearest_ft: number
  park_within_1640ft: string
  park_nearest_ft: number

  // Depth
  depth_median_ft: number
  depth_0_20ft_pct: number
  depth_20_39ft_pct: number
  depth_39ft_plus_pct: number

  // Physical environment
  erosion_gt_0_ft_yr: string
  erosion_gt_1_ft_yr: string
  wave_sup_3ft: string | null

  // Optional editorial content for tier 1 sites
  tier1Editorial?: string
}

/**
 * Framework primer data for § 02
 * Generated at build time from statistics.geojson
 */
export interface FrameworkPrimerSite {
  id: string
  Site: string
  sal_score: number
  chla_score: number
  do_score: number
  composite: number // (sal_score + chla_score) / 2 * do_score
}
