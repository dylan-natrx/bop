import type { ReactNode } from 'react'

/**
 * Methodology walkthrough — six-step configuration.
 *
 * Each step has:
 *   - title and copy (lede + body) drawn from Methodology_Walkthrough_Spec.md
 *   - map state: which score the sites are colored by, which flags filter
 *   - spectra state: which curves are visible, which annotations show,
 *     whether the Goldilocks band appears
 *
 * Copy uses a lede / body split. The lede is the first sentence and
 * renders with emphasis (ivory text); the body renders in ivory-dim.
 * Inline italics (e.g. *Natrx Assess* on first reference) use <em>.
 */

export type MapColorMode = 'salinity' | 'salinity_chla' | 'composite'
export type MapFlag = 'wave' | 'erosion' | 'park' | 'cso' | 'ms4'
export type SpectraCurve = 'salinity' | 'chla' | 'do' | 'wave'

export interface StepConfig {
  /** 1-indexed step number, 1-6 */
  id: number
  /** Step title shown above the panels */
  title: string
  /** First sentence; rendered with emphasis */
  lede: ReactNode
  /** Rest of the body copy */
  body: ReactNode
  colorMode: MapColorMode
  /** Filter flags applied this step (sites failing any get dimmed) */
  visibleFlags: MapFlag[]
  /** Which curves are visible in the spectra panel */
  visibleCurves: SpectraCurve[]
  /** The "current focus" curve. Past curves de-emphasized. */
  focusCurve: SpectraCurve | null
  /** Show the Goldilocks band across the water quality plots */
  showGoldilocksBand: boolean
  /** Show the erosion annotation block (step 5+) */
  showErosionAnnotation: boolean
  /** Show the practical-filters annotation block (step 6) */
  showFiltersAnnotation: boolean
  /** Show the "Show the math" expandable disclosure (step 3) */
  showMathDisclosure: boolean
}

const Em = ({ children }: { children: ReactNode }) => (
  <em className="font-serif italic">{children}</em>
)

export const STEPS: StepConfig[] = [
  {
    id: 1,
    title: 'Salinity, the Goldilocks variable',
    lede: 'Salinity is a Goldilocks variable.',
    body: 'Too little salt and oysters cannot survive. Too much, and they cannot either. Most of New York Harbor sits in the optimum range. The upper Hudson does not, and that single gradient already begins to sort the pipeline. Downstream sites near Yonkers and Hastings-on-Hudson score perfectly. Upstream at Piermont, Irvington, and Ossining, the water is too fresh, and the sites drop out. One variable, and the map starts telling a different story than the brief.',
    colorMode: 'salinity',
    visibleFlags: [],
    visibleCurves: ['salinity'],
    focusCurve: 'salinity',
    showGoldilocksBand: false,
    showErosionAnnotation: false,
    showFiltersAnnotation: false,
    showMathDisclosure: false,
  },
  {
    id: 2,
    title: 'Adding chlorophyll-a, the food layer',
    lede: 'Oysters are filter feeders.',
    body: 'They need food in the water, measured by chlorophyll-a. The relationship is mostly more is better, with a real catch: too much chlorophyll-a signals algae blooms, which crash oxygen and kill the oysters those blooms feed. The scoring captures the productive range. The methodology flags the danger zone. Adding this layer reshapes the field. Sites strong on salinity but thin on food production lose ground. Sites strong on both come forward.',
    colorMode: 'salinity_chla',
    visibleFlags: [],
    visibleCurves: ['salinity', 'chla'],
    focusCurve: 'chla',
    showGoldilocksBand: false,
    showErosionAnnotation: false,
    showFiltersAnnotation: false,
    showMathDisclosure: false,
  },
  {
    id: 3,
    title: 'Adding dissolved oxygen, the limiter',
    lede: 'Dissolved oxygen does not need to be high.',
    body: "It just cannot fall below survival levels. In the composite formula, oxygen acts as a multiplier, so sites that regularly slip into hypoxia get their other strengths cut in half. This is where the methodology earns its keep. Arthur Kill on Staten Island emerges as the strongest site in the pipeline. Six locations inside the Living Breakwaters system cluster just behind. The harbor's industrial west shore, often written off, now leads on the variables that matter most to oyster restoration. Three variables, each with its own shape, combined into one defensible ranking.",
    colorMode: 'composite',
    visibleFlags: [],
    visibleCurves: ['salinity', 'chla', 'do'],
    focusCurve: 'do',
    showGoldilocksBand: true,
    showErosionAnnotation: false,
    showFiltersAnnotation: false,
    showMathDisclosure: true,
  },
  {
    id: 4,
    title: 'Wave exposure, from Natrx Assess',
    lede: (
      <>
        <Em>Natrx Assess</Em> now adds data BOP did not previously have.
      </>
    ),
    body: "Site-level wave energy modeling, computed for every candidate location using fetch-limited wind-wave equations from the Army Corps of Engineers Coastal Engineering Manual. Wave exposure has its own sweet spot: enough movement to deliver food and oxygen, not so much that structures fail and oysters wash off before they take hold. Sites with modeled waves above three feet are flagged for additional engineering review. The ranking holds. The reader's understanding of which top sites carry which complications sharpens.",
    colorMode: 'composite',
    visibleFlags: ['wave'],
    visibleCurves: ['salinity', 'chla', 'do', 'wave'],
    focusCurve: 'wave',
    showGoldilocksBand: true,
    showErosionAnnotation: false,
    showFiltersAnnotation: false,
    showMathDisclosure: false,
  },
  {
    id: 5,
    title: 'Shoreline erosion, from Natrx Assess',
    lede: (
      <>
        <Em>Natrx Assess</Em> also delivers a one-meter resolution analysis of shoreline erosion, going back fifteen years, using NAIP satellite imagery and the Marsh Edge from Image Processing methodology.
      </>
    ),
    body: 'Eight sites show erosion of more than a foot per year. Fifteen more show active retreat. Several sit in the top tier of the suitability ranking, and the overlap is the story. Oyster reefs function as natural breakwaters. Where strong water quality meets actively eroding shoreline, one intervention delivers two outcomes: restored habitat and a protected coast.',
    colorMode: 'composite',
    visibleFlags: ['wave', 'erosion'],
    visibleCurves: ['salinity', 'chla', 'do', 'wave'],
    focusCurve: null,
    showGoldilocksBand: true,
    showErosionAnnotation: true,
    showFiltersAnnotation: false,
    showMathDisclosure: false,
  },
  {
    id: 6,
    title: 'The practical filters',
    lede: 'The last layer is operational.',
    body: 'BOP works primarily on publicly owned parkland, where restoration runs alongside community education, so proximity to NYC parks is tracked. Sites near combined sewer and stormwater outfalls are flagged for permitting and water quality complications, regardless of how strong a site scores ecologically. The pipeline that survives every layer is the pipeline BOP can actually execute. Out of 78 candidates, more than thirty datasets, and six layers of analysis, the framework points to ten to fifteen priority projects ready for design and permitting. That is the answer the engagement was built to produce.',
    colorMode: 'composite',
    visibleFlags: ['wave', 'erosion', 'park', 'cso', 'ms4'],
    visibleCurves: ['salinity', 'chla', 'do', 'wave'],
    focusCurve: null,
    showGoldilocksBand: true,
    showErosionAnnotation: true,
    showFiltersAnnotation: true,
    showMathDisclosure: false,
  },
]

export const STEP_COUNT = STEPS.length
