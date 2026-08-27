/**
 * Data-intake script: Mirror the NCCF shoreline-change layers into the repo
 *
 * Reads: the public ArcGIS Online webmap item (operationalLayers[], 39 layers),
 *        then each layer's GeoJSON from www.arcgis.com
 * Writes: src/app/projects/nccf/data/layers/{title}.geojson (one per layer)
 *         src/app/projects/nccf/data/manifest.json (per-layer + overall stats)
 *
 * Layer files are deterministic: pretty-printed, features sorted by numeric
 * property id, trailing newline. Re-running produces byte-identical files
 * (the manifest's fetchDate field is the one intentional exception).
 *
 * Run with: npx tsx scripts/fetch-nccf-layers.ts
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')

const WEBMAP_ITEM_ID = 'f0ec44faf40a4f208c35bb099b2dcea3'
const WEBMAP_URL = `https://indi3f437e80d142.maps.arcgis.com/sharing/rest/content/items/${WEBMAP_ITEM_ID}/data?f=json`
const OUTPUT_DIR = join(ROOT, 'src/app/projects/nccf/data/layers')
const MANIFEST_PATH = join(ROOT, 'src/app/projects/nccf/data/manifest.json')

interface OperationalLayer {
  title: string
  itemId: string
  url: string
}

interface Feature {
  type: 'Feature'
  properties: {
    id: number
    rect_width: number
    land_change_ft_per_year: number
    r_squared: number
    epr_ft_per_year: number
    nsm_ft: number
  }
  // A handful of source features carry geometry: null; they are mirrored
  // as-is and simply excluded from bbox computation.
  geometry: { type: 'Point'; coordinates: [number, number] } | null
}

interface FeatureCollection {
  type: 'FeatureCollection'
  features: Feature[]
}

type Bbox = [number, number, number, number] // [w, s, e, n]

interface LayerManifestEntry {
  title: string
  itemId: string
  featureCount: number
  bbox: Bbox
  landChangeFtPerYear: { min: number; median: number; mean: number }
  rSquaredAtLeastHalf: number
}

function median(sorted: number[]): number {
  const n = sorted.length
  if (n === 0) throw new Error('median of empty set')
  const mid = Math.floor(n / 2)
  return n % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function round6(x: number): number {
  return Number(x.toFixed(6))
}

function bboxOf(features: Feature[]): Bbox {
  let w = Infinity
  let s = Infinity
  let e = -Infinity
  let n = -Infinity
  for (const f of features) {
    if (!f.geometry) continue
    const [x, y] = f.geometry.coordinates
    if (x < w) w = x
    if (x > e) e = x
    if (y < s) s = y
    if (y > n) n = y
  }
  return [round6(w), round6(s), round6(e), round6(n)]
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`)
  return (await res.json()) as T
}

async function main() {
  const webmap = await fetchJson<{ operationalLayers: OperationalLayer[] }>(WEBMAP_URL)
  const layers = webmap.operationalLayers
  console.log(`Webmap ${WEBMAP_ITEM_ID}: ${layers.length} operational layers`)

  mkdirSync(OUTPUT_DIR, { recursive: true })

  const entries: LayerManifestEntry[] = []
  const allLandChange: number[] = []
  let totalFeatures = 0
  let overallBbox: Bbox | null = null

  for (const layer of layers) {
    if (!/^[a-z0-9_]+$/i.test(layer.title)) {
      throw new Error(`Layer title unsafe as a filename: ${JSON.stringify(layer.title)}`)
    }
    const fc = await fetchJson<FeatureCollection>(layer.url)
    fc.features.sort((a, b) => a.properties.id - b.properties.id)

    const outputPath = join(OUTPUT_DIR, `${layer.title}.geojson`)
    writeFileSync(outputPath, JSON.stringify(fc, null, 2) + '\n')

    const values = fc.features
      .map((f) => f.properties.land_change_ft_per_year)
      .sort((a, b) => a - b)
    const bbox = bboxOf(fc.features)
    entries.push({
      title: layer.title,
      itemId: layer.itemId,
      featureCount: fc.features.length,
      bbox,
      landChangeFtPerYear: {
        min: round6(values[0]),
        median: round6(median(values)),
        mean: round6(values.reduce((sum, v) => sum + v, 0) / values.length),
      },
      rSquaredAtLeastHalf: fc.features.filter((f) => f.properties.r_squared >= 0.5).length,
    })
    const nullGeom = fc.features.filter((f) => !f.geometry).length
    if (nullGeom > 0) console.log(`    note: ${nullGeom} feature(s) with null geometry in ${layer.title}`)

    totalFeatures += fc.features.length
    allLandChange.push(...values)
    overallBbox = overallBbox
      ? [
          Math.min(overallBbox[0], bbox[0]),
          Math.min(overallBbox[1], bbox[1]),
          Math.max(overallBbox[2], bbox[2]),
          Math.max(overallBbox[3], bbox[3]),
        ]
      : bbox
    console.log(`  wrote ${layer.title}.geojson (${fc.features.length} features)`)
  }

  allLandChange.sort((a, b) => a - b)
  const manifest = {
    source: {
      webmapItemId: WEBMAP_ITEM_ID,
      portal: 'indi3f437e80d142.maps.arcgis.com',
      fetchDate: new Date().toISOString().slice(0, 10),
    },
    layerCount: entries.length,
    totalFeatureCount: totalFeatures,
    overallBbox,
    overallMedianLandChangeFtPerYear: round6(median(allLandChange)),
    layers: entries,
  }
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`✓ Wrote ${entries.length} layers (${totalFeatures} features) and manifest.json`)
}

main()
