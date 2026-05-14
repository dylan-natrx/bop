import type { ReactNode } from 'react'

/**
 * Methodology walkthrough — six-step configuration.
 *
 * Each step has:
 *   - title and copy (lede + body paragraphs) drawn from
 *     Methodology_Walkthrough_Spec.md
 *   - map state: which score the sites are colored by, which flags filter
 *   - spectra state: which curves are visible, which annotations show,
 *     whether the Goldilocks band appears
 *
 * Copy is split into:
 *   lede:           first sentence; emphasized (ivory color, heavier weight)
 *   bodyParagraphs: array of paragraphs. The first continues the lede's
 *                   paragraph after a space; subsequent items are rendered
 *                   as their own <p>.
 * Inline italics (e.g. *Natrx Assess* on first reference) use <em>.
 * Per CLAUDE.md editorial chrome rules, italicize Natrx Assess only on
 * first reference per section; the walkthrough is one section so step 4
 * italicizes it and subsequent steps render it roman.
 */

export type MapColorMode = 'salinity' | 'salinity_chla' | 'composite'
export type MapFlag = 'wave' | 'erosion' | 'park' | 'cso' | 'ms4'
export type SpectraCurve = 'salinity' | 'chla' | 'do' | 'wave'

export interface StepConfig {
  id: number
  title: string
  /** First sentence; rendered with emphasis */
  lede: ReactNode
  /**
   * Body content as one or more paragraphs. The first item continues the
   * lede's paragraph inline; subsequent items become additional <p> blocks.
   */
  bodyParagraphs: ReactNode[]
  colorMode: MapColorMode
  visibleFlags: MapFlag[]
  visibleCurves: SpectraCurve[]
  focusCurve: SpectraCurve | null
  showGoldilocksBand: boolean
  showErosionAnnotation: boolean
  showFiltersAnnotation: boolean
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
    bodyParagraphs: [
      "Too little salt, oysters can't survive. Too much, they can't either. The optimum is roughly 12 to 20 PSU. Most of the harbor sits in range. The upper Hudson runs too fresh. Sites near Piermont, Irvington, and Ossining drop out at this step. One variable, and the field is already sorting itself.",
    ],
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
    bodyParagraphs: [
      'They need food in the water, measured by chlorophyll-a. More is mostly better, with a catch: past a threshold, chlorophyll-a signals algae blooms that crash oxygen and kill the oysters the blooms feed. The score captures the productive range and flags the danger zone. Sites strong on salinity but thin on food drop further. Sites strong on both come forward.',
    ],
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
    lede: "Dissolved oxygen doesn't need to be high.",
    bodyParagraphs: [
      "It just can't fall below survival. Oxygen acts as a multiplier in the composite, so sites that slip into hypoxia get their other strengths cut in half. The ranking locks here. Arthur Kill on Staten Island emerges at the top. Six locations inside the Living Breakwaters system cluster just behind. The harbor's industrial west shore, long written off, now leads on the variables that actually matter for oyster restoration. Roughly 15 of 78 sites pass the biology gate.",
    ],
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
    lede: 'The next three steps describe external factors at each ranked site.',
    bodyParagraphs: [
      <>
        Wave exposure is the feasibility question. A site can score perfectly
        on biology and still need storm-rated infrastructure because the water
        moves too hard. Every top-ten site in this pipeline carries a wave
        flag. They stay in the priority set. You can&apos;t pay your way to
        better water, but you can pay for engineering. The framework now tells
        BOP what to budget for. Wave energy data from <Em>Natrx Assess</Em>.
      </>,
    ],
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
    lede: 'Wave adds cost. Erosion adds value.',
    bodyParagraphs: [
      'Sites that pass biology and sit next to actively retreating shoreline get a positive flag. A reef would dampen wave energy and slow the loss of marsh edge. One project, two outcomes. A discount on cost and performance.',
    ],
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
    bodyParagraphs: [
      "Sites near combined sewer and stormwater outfalls carry permitting friction with state and federal agencies. Sites near publicly accessible parkland make BOP's mission easier. Neither changes which sites are suitable. Both shape what BOP plans for and where it commits time first.",
      'Stack the six layers together and the picture comes into focus. Seventy-eight candidates. Three biology layers narrow the field to the suitable set. Three external layers describe what the framework now knows about each. Roughly ten to fifteen priority projects emerge, with their cost, permitting, and co-benefit profile fully visible. That is the answer the engagement was built to produce. BOP can rerun the analysis next year as new data lands.',
    ],
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
