/**
 * Build-time script: Generate framework primer data for § 02
 *
 * Extracts per-component scores (salinity, chla, DO) from statistics.geojson
 * and computes the composite score for teaching the framework.
 *
 * Reads: BOP_Feb2026_Pipeline_statistics.geojson
 * Writes: public/data/framework-primer.json
 *
 * Run with: npx tsx scripts/generate-framework-primer.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')

const INPUT = join(ROOT, 'src/app/projects/bop/data/BOP_Feb2026_Pipeline_statistics.geojson')
const OUTPUT = join(ROOT, 'public/data/framework-primer.json')

interface StatisticsProperties {
  id: string
  Site: string
  sal_score: number
  chla_score: number
  do_score: number
}

interface Feature {
  type: 'Feature'
  properties: StatisticsProperties
}

interface FeatureCollection {
  type: 'FeatureCollection'
  features: Feature[]
}

interface FrameworkPrimerSite {
  id: string
  Site: string
  sal_score: number
  chla_score: number
  do_score: number
  composite: number
}

function main() {
  // Check if input file exists
  if (!existsSync(INPUT)) {
    console.error(`Error: Input file not found: ${INPUT}`)
    console.error('Make sure BOP_Feb2026_Pipeline_statistics.geojson is in the project root.')
    process.exit(1)
  }

  // Read and parse GeoJSON
  const raw = readFileSync(INPUT, 'utf-8')
  const geojson: FeatureCollection = JSON.parse(raw)

  console.log(`Processing ${geojson.features.length} sites for framework primer...`)

  const primerData: FrameworkPrimerSite[] = geojson.features.map((feature) => {
    const props = feature.properties

    // Compute composite: (sal_score + chla_score) / 2 * do_score
    const composite =
      ((props.sal_score + props.chla_score) / 2) * props.do_score

    return {
      id: props.id,
      Site: props.Site,
      sal_score: props.sal_score,
      chla_score: props.chla_score,
      do_score: props.do_score,
      composite: Math.round(composite * 100) / 100, // Round to 2 decimal places
    }
  })

  // Sort by composite score descending
  primerData.sort((a, b) => b.composite - a.composite)

  // Ensure output directory exists
  mkdirSync(dirname(OUTPUT), { recursive: true })

  // Write output
  writeFileSync(OUTPUT, JSON.stringify(primerData, null, 2))

  console.log(`✓ Wrote framework primer data to ${OUTPUT}`)
  console.log(`  ${primerData.length} sites, sorted by composite score`)
  console.log(`  Top site: ${primerData[0].Site} (composite: ${primerData[0].composite})`)
}

main()
