/**
 * Data-intake script: Derive the NCCF display files from the mirrored layers
 *
 * Reads: src/app/projects/nccf/data/layers/*.geojson (39 files — produced by
 *        scripts/fetch-nccf-layers.ts; not committed, reproducible on demand)
 * Writes: src/app/projects/nccf/data/coastline.json
 *           [[lon, lat, land_change_ft_per_year], ...] — evenly sampled
 *           transect points for rendering, coords at 4dp, rate at 1dp,
 *           one point per line. Target 4,000–6,000 points.
 *         src/app/projects/nccf/data/sites.json
 *           per-site stats: name, featureCount, min/median/mean, bbox.
 *
 * Sampling is proportional per layer with an even stride inside each layer
 * (features are ordered by id, which follows the transect sequence), so
 * site shapes survive. The 401 source features with null geometry cannot
 * be rendered and are excluded here; they still count in featureCount and
 * the stats, matching manifest.json.
 *
 * Deterministic: re-running produces byte-identical files.
 *
 * Run with: npx tsx scripts/derive-nccf-display.ts
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')

const LAYERS_DIR = join(ROOT, 'src/app/projects/nccf/data/layers')
const COASTLINE_PATH = join(ROOT, 'src/app/projects/nccf/data/coastline.json')
const SITES_PATH = join(ROOT, 'src/app/projects/nccf/data/sites.json')

const TARGET_POINTS = 5000

interface Feature {
  properties: { id: number; land_change_ft_per_year: number; r_squared: number }
  geometry: { coordinates: [number, number] } | null
}

interface FeatureCollection {
  features: Feature[]
}

function median(sorted: number[]): number {
  const n = sorted.length
  const mid = Math.floor(n / 2)
  return n % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function round(x: number, dp: number): number {
  return Number(x.toFixed(dp))
}

function main() {
  const files = readdirSync(LAYERS_DIR)
    .filter((f) => f.endsWith('.geojson'))
    .sort()
  if (files.length === 0) {
    console.error(`No layer files in ${LAYERS_DIR}.`)
    console.error('Run `npx tsx scripts/fetch-nccf-layers.ts` first.')
    process.exit(1)
  }

  const layers = files.map((file) => {
    const fc: FeatureCollection = JSON.parse(readFileSync(join(LAYERS_DIR, file), 'utf-8'))
    return { name: file.replace(/\.geojson$/, ''), features: fc.features }
  })

  const totalWithGeometry = layers.reduce(
    (sum, l) => sum + l.features.filter((f) => f.geometry).length,
    0,
  )

  // --- coastline.json: proportional quota per layer, even stride within ---
  const points: [number, number, number][] = []
  for (const layer of layers) {
    const withGeom = layer.features.filter((f) => f.geometry)
    const quota = Math.max(1, Math.round((withGeom.length * TARGET_POINTS) / totalWithGeometry))
    const picked = new Set<number>()
    for (let i = 0; i < quota; i++) {
      picked.add(Math.floor((i * withGeom.length) / quota))
    }
    for (const idx of [...picked].sort((a, b) => a - b)) {
      const f = withGeom[idx]
      const [lon, lat] = f.geometry!.coordinates
      points.push([round(lon, 4), round(lat, 4), round(f.properties.land_change_ft_per_year, 1)])
    }
  }
  const coastlineJson =
    '[\n' + points.map((p) => JSON.stringify(p)).join(',\n') + '\n]\n'
  writeFileSync(COASTLINE_PATH, coastlineJson)

  // --- sites.json: per-site stats over ALL features (null geometry included,
  //     matching manifest.json), bbox over located features only ---
  const sites = layers.map((layer) => {
    const values = layer.features
      .map((f) => f.properties.land_change_ft_per_year)
      .sort((a, b) => a - b)
    let w = Infinity
    let s = Infinity
    let e = -Infinity
    let n = -Infinity
    for (const f of layer.features) {
      if (!f.geometry) continue
      const [x, y] = f.geometry.coordinates
      if (x < w) w = x
      if (x > e) e = x
      if (y < s) s = y
      if (y > n) n = y
    }
    return {
      name: layer.name,
      featureCount: layer.features.length,
      landChangeFtPerYear: {
        min: round(values[0], 6),
        median: round(median(values), 6),
        mean: round(values.reduce((sum, v) => sum + v, 0) / values.length, 6),
      },
      bbox: [round(w, 6), round(s, 6), round(e, 6), round(n, 6)],
    }
  })
  writeFileSync(SITES_PATH, JSON.stringify(sites, null, 2) + '\n')

  console.log(
    `✓ Wrote coastline.json (${points.length} points) and sites.json (${sites.length} sites)`,
  )
}

main()
