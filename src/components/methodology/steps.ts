/**
 * Methodology walkthrough — six-step configuration.
 *
 * Each step describes:
 *   - title and body copy (final, sourced from Methodology_Walkthrough_Spec.md)
 *   - map state: which score the sites are colored by, which flags overlay
 *   - spectra state: which curves are visible, which annotations show, whether
 *     the Goldilocks band appears
 *
 * Adding or reordering steps requires updating this file; the rest of the
 * walkthrough renders from these configs.
 */

export type MapColorMode =
  | 'salinity' // step 1
  | 'salinity_chla' // step 2
  | 'composite' // steps 3-6 (full water quality composite)

export type MapFlag = 'wave' | 'erosion' | 'park' | 'cso' | 'ms4'

export type SpectraCurve = 'salinity' | 'chla' | 'do' | 'wave'

export interface StepConfig {
  /** 1-indexed step number, 1-6 */
  id: number
  /** Step title shown above the panels */
  title: string
  /** Body copy shown below the panels (~80-120 words) */
  copy: string
  /** Map color mode */
  colorMode: MapColorMode
  /** Which flag overlays are visible on the map */
  visibleFlags: MapFlag[]
  /** Which curves are visible in the spectra panel */
  visibleCurves: SpectraCurve[]
  /** The "current focus" curve. Other visible curves are de-emphasized. */
  focusCurve: SpectraCurve | null
  /** Show the Goldilocks band across the stacked water quality plots */
  showGoldilocksBand: boolean
  /** Show the erosion annotation block (step 5+) */
  showErosionAnnotation: boolean
  /** Show the practical-filters annotation block (step 6) */
  showFiltersAnnotation: boolean
  /** Show the "Show the math" expandable disclosure (step 3) */
  showMathDisclosure: boolean
}

export const STEPS: StepConfig[] = [
  {
    id: 1,
    title: 'Salinity, the Goldilocks variable',
    copy:
      'Oysters need the right amount of salt in the water, not the most. The science calls it an optimum window. Below about 5 parts per thousand the water is too fresh and oysters cannot survive. Above 40 it is too saline. Most of New York Harbor sits in the right range. The upper Hudson River sites do not. Move upstream from the harbor mouth and salinity drops along a gradient as the river mixes with less and less saltwater. The downstream Hudson sites near Yonkers and Hastings-on-Hudson sit squarely in the optimum range and score perfectly on this variable. The upstream sites at Piermont, Irvington, and Ossining fall below the threshold. If salinity were the only variable that mattered, that gradient alone would already shape the ranking.',
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
    copy:
      'Oysters are filter feeders. They need phytoplankton in the water, measured by chlorophyll-a. The relationship is mostly straightforward: more food, better suitability. But more is not always better at the high end. Excessive chlorophyll-a often signals algae blooms, which can crash dissolved oxygen and harm the same oysters they nominally feed. The scoring function captures the positive relationship and the methodology flags the eutrophication caveat. Adding this layer changes the picture. Sites with strong salinity but weak food production fade. Sites with both strong salinity and healthy productivity emerge as stronger candidates.',
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
    copy:
      "The third water quality variable acts as a multiplier in BOP's composite formula. Dissolved oxygen does not need to be high. It just cannot regularly fall below the level oysters need to survive, around 3 milligrams per liter. Sites that frequently hit hypoxic conditions get their other strengths cut in half or more. This is the full water quality picture, and it is where the methodology starts to do real work. Arthur Kill on Staten Island emerges as the strongest site in the pipeline. Six locations within the Living Breakwaters system cluster just behind it. Three variables, each with their own shape, combined into one ranking.",
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
    copy:
      "This is where Natrx Assess starts adding data that BOP did not previously have. Site-level wave energy modeling, computed for every candidate location using fetch-limited wind-wave equations from the Army Corps of Engineers Coastal Engineering Manual. Like the other variables, wave exposure has a sweet spot. Some water movement helps. It delivers food and oxygen to the reef. Too much, and the engineered structures fail or the oysters get dislodged before they establish. Sites where modeled wave heights exceed three feet at meaningful frequencies are flagged for additional engineering review. The ranking does not change yet. What changes is the reader's understanding of which sites carry which complications.",
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
    copy:
      'Natrx Assess also produced a one-meter resolution analysis of shoreline erosion across the harbor going back fifteen years, using NAIP satellite imagery and the Marsh Edge from Image Processing methodology. Eight candidate sites show erosion rates of one foot per year or greater. Fifteen more show active retreat at lower rates. Several sit in the top tier of the suitability ranking. The overlap is consequential. Oyster reefs function as natural breakwaters, dampening wave energy and slowing the loss of marsh edges. The sites where strong water quality and active shoreline retreat overlap are sites where one intervention delivers two outcomes. The methodology now points the reader toward the co-benefit pattern.',
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
    copy:
      'The last layer is operational. BOP works primarily on or near publicly owned parkland, where the work supports community education programs alongside ecological restoration, so proximity to NYC parkland is tracked. The team also flags sites near combined sewer or stormwater outfalls, because those carry permitting and water quality complications that affect feasibility regardless of how strong a site scores on the ecological variables. The sites that survive every layer are the pipeline BOP can actually execute on. Out of 78 candidates evaluated through more than thirty datasets, the framework points to roughly 10 to 15 priority projects ready for design and permitting. That is the answer the engagement was built to produce.',
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
