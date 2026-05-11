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
      'Too little salt and oysters cannot survive. Too much, and they cannot either. Most of New York Harbor sits in the optimum range. The upper Hudson does not, and that single gradient already begins to sort the pipeline. Downstream sites near Yonkers and Hastings-on-Hudson score perfectly. Upstream at Piermont, Irvington, and Ossining, the water is too fresh, and the sites drop out. One variable, and the map starts telling a different story than the brief.',
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
      'They need food in the water, measured by chlorophyll-a. The relationship is mostly more is better, with a real catch: too much chlorophyll-a signals algae blooms, which crash oxygen and kill the oysters those blooms feed. The scoring captures the productive range. The methodology flags the danger zone. Adding this layer reshapes the field. Sites strong on salinity but thin on food production lose ground. Sites strong on both come forward.',
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
    lede: 'Dissolved oxygen does not need to be high.',
    bodyParagraphs: [
      "It just cannot fall below survival levels. In the composite formula, oxygen acts as a multiplier, so sites that regularly slip into hypoxia get their other strengths cut in half. This is where the methodology earns its keep. Arthur Kill on Staten Island emerges as the strongest site in the pipeline. Six locations inside the Living Breakwaters system cluster just behind. The harbor's industrial west shore, often written off, now leads on the variables that matter most to oyster restoration. Three variables, each with its own shape, combined into one defensible ranking.",
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
    lede: (
      <>
        This is where <Em>Natrx Assess</Em> starts adding data BOP did not previously have, and where the framework starts answering a different kind of question.
      </>
    ),
    bodyParagraphs: [
      "The water quality variables produced a ranking based on biology. Everything that comes next is information about context: how a site behaves under wave energy, how its shoreline is moving, what it sits next to. The ranking does not change. The reader's understanding of what each ranked site actually is gets richer.",
      'Site-level wave energy modeling, computed for every candidate location using fetch-limited wind-wave equations from the Army Corps of Engineers Coastal Engineering Manual. Wave exposure has its own sweet spot. Enough movement to deliver food and oxygen, not so much that engineered structures fail or oysters wash off before they take hold. Sites where modeled waves exceed three feet at meaningful frequencies are flagged for additional engineering review. Some of the strongest sites in the pipeline carry that flag. They remain strong. They also remain expensive to build.',
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
    lede:
      'Natrx Assess also delivers a one-meter resolution analysis of shoreline erosion, going back fifteen years, using NAIP satellite imagery and the Marsh Edge from Image Processing methodology.',
    bodyParagraphs: [
      'Eight sites show erosion of more than a foot per year. Fifteen more show active retreat at lower rates.',
      'Several of those eroding shorelines sit next to the top-ranked restoration candidates. That overlap is the story. Oyster reefs function as natural breakwaters, dampening wave energy and slowing the loss of marsh edges. Where strong water quality meets actively retreating coast, the same restoration project delivers two outcomes: a rebuilt habitat and a stabilized shore. One investment, two returns. The ranking told BOP which sites to restore. The erosion overlay tells them which restorations are worth twice as much per dollar spent.',
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
    lede: 'The final layer is operational.',
    bodyParagraphs: [
      "BOP works primarily on or near publicly owned parkland, where the work supports community education alongside ecological restoration, so proximity to NYC parks is part of every site's profile. Sites near combined sewer and stormwater outfalls carry permitting and water quality complications that affect feasibility regardless of how a site scores ecologically, so those are tracked too.",
      'Stack the layers together and the picture comes into focus. Seventy-eight candidate sites. More than thirty datasets. Six layers of synthesis: salinity, chlorophyll-a, dissolved oxygen, wave energy, shoreline change, operational context. The framework points to roughly ten to fifteen priority projects ready for design and permitting. That is the answer the engagement was built to produce, and it is the answer BOP can rerun next year as new data lands, without Natrx in the loop.',
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
