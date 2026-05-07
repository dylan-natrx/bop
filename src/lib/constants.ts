/**
 * Application constants
 */

// Waterbody display names (for consistent labeling)
export const WATERBODIES = [
  'Arthur Kill',
  'East River',
  'Hudson River',
  'Jamaica Bay',
  'Kill Van Kull',
  'Long Island Sound',
  'Newark Bay',
  'Raritan Bay',
  'Upper Harbor',
] as const

export type Waterbody = (typeof WATERBODIES)[number]

// Data support tier descriptions
export const DATA_SUPPORT_DESCRIPTIONS: Record<string, string> = {
  Robust: 'Dense monitoring coverage within 500m',
  Strong: 'Good monitoring coverage within 1km',
  Adequate: 'Moderate monitoring coverage',
  Limited: 'Sparse monitoring, wider confidence intervals',
  Sparse: 'Minimal nearby monitoring data',
}

// Site status display
export const STATUS_LABELS = {
  Design: 'Active design',
  'Proposed Future Site': 'Proposed future site',
} as const

// Map configuration
export const MAP_CONFIG = {
  // NYC Harbor approximate center
  center: [-74.0, 40.65] as [number, number],
  // Zoom to fit all sites
  zoom: 10,
  // Bounds for the harbor region
  bounds: [
    [-74.35, 40.45], // SW
    [-73.65, 40.95], // NE
  ] as [[number, number], [number, number]],
}

// Hero stats (4 stats per Lise interview updates)
export const HERO_STATS = [
  {
    value: 78,
    label: 'Candidate sites',
    qualifier: 'Across five harbor regions, evaluated for oyster suitability',
  },
  {
    value: 2604,
    unit: 'ac',
    label: 'Total candidate footprint',
    qualifier: 'Combined area if every candidate were built out',
  },
  {
    displayValue: '1 billion',
    label: 'Oyster goal by 2035',
    qualifier: "Billion Oyster Project's stated target for New York Harbor",
  },
  {
    value: 9,
    label: 'Environmental variables synthesized',
    qualifier:
      'Salinity, chlorophyll, oxygen, depth, wave exposure, shoreline change, plus three infrastructure flags',
  },
] as const

// Top-ranked sites for hero panel
export const TOP_RANKED_SITES = [
  { name: 'Arthur Kill', meta: 'Top-ranked · Upper Harbor', score: '0.87' },
  { name: 'Living Breakwaters', meta: 'Six tied sites, ranks 2–7', score: '0.79–0.74' },
  { name: "Wolfe's Pond", meta: 'Rank 8 · Raritan Bay', score: '0.65' },
  { name: 'Conch Basin', meta: 'Rank 9 · Jamaica Bay', score: '0.62' },
] as const
