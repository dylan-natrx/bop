/**
 * Build-time script: Split statistics.geojson into per-site JSON files
 *
 * Reads: BOP_Feb2026_Pipeline_statistics.geojson
 * Writes: public/data/sites/{id}.json (78 files, ~5KB each)
 *
 * Run with: npm run prepare-data
 * Or: npx tsx scripts/split-statistics.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')

const INPUT = join(ROOT, 'BOP_Feb2026_Pipeline_statistics.geojson')
const OUTPUT_DIR = join(ROOT, 'public/data/sites')

interface Feature {
  type: 'Feature'
  properties: Record<string, unknown>
  geometry: unknown
}

interface FeatureCollection {
  type: 'FeatureCollection'
  features: Feature[]
}

function main() {
  // Check if input file exists
  if (!existsSync(INPUT)) {
    console.error(`Error: Input file not found: ${INPUT}`)
    console.error('Make sure BOP_Feb2026_Pipeline_statistics.geojson is in the project root.')
    process.exit(1)
  }

  // Create output directory
  mkdirSync(OUTPUT_DIR, { recursive: true })

  // Read and parse GeoJSON
  const raw = readFileSync(INPUT, 'utf-8')
  const geojson: FeatureCollection = JSON.parse(raw)

  console.log(`Processing ${geojson.features.length} sites...`)

  let count = 0
  for (const feature of geojson.features) {
    const props = feature.properties
    const id = props.id as string

    // Write properties only (no geometry needed for stats)
    const outputPath = join(OUTPUT_DIR, `${id}.json`)
    writeFileSync(outputPath, JSON.stringify(props, null, 2))
    count++
  }

  console.log(`✓ Wrote ${count} site files to ${OUTPUT_DIR}`)
}

main()
