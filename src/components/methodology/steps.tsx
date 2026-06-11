import type { ReactNode } from 'react'

/**
 * Methodology walkthrough — six-step configuration.
 *
 * Each step has:
 *   - title and copy (lede + body paragraphs); the live source of truth is
 *     this file and the shipped component. (Earlier pre-build spec at
 *     Methodology_Walkthrough_Spec.md was retired on 2026-05-18.)
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
  title: ReactNode
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
  <em className="font-serif italic text-white">{children}</em>
)

export const STEPS: StepConfig[] = [
  {
    id: 1,
    title: 'Salinity, the Goldilocks variable',
    lede: 'Salinity is a Goldilocks variable.',
    bodyParagraphs: [
      "Too little salt and oysters can't survive. Too much and they can't either. But how much is just right depends on the estuary. Far up the Hudson, oysters hold on in water fresher than the textbooks allow, and the people who have worked this harbor for years know it. So the score is set to fit this place, not copied from a manual. Sites near Piermont and Ossining, fresh enough that a one-size formula would throw them out, stay in the running. The real sorting comes a few steps later.",
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
      'Oysters eat by filtering the water, so they need food floating in it. That food is measured as chlorophyll-a, the green of tiny drifting plants. More food is generally better, and the score follows that. Too much brings its own problem later, when algae blooms die off and pull the oxygen down, but that shows up in the next step. For now, sites with good salt but little food slip back. Sites strong on both move up.',
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
      "It just can't drop too low for too long. Oxygen works like a dial on everything else: a site that falls into low-oxygen spells sees its other strengths pulled down sharply. This is where the order settles. Arthur Kill, on Staten Island, comes out on top. Six spots inside the Living Breakwaters system sit just behind. The harbor's old industrial west shore, written off for a century, now leads on the things that matter most for oysters. Out of 78 sites, eighteen clear the biology bar. Those are the ones worth backing.",
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
    title: <>Wave exposure, from <Em>Natrx Assess</Em></>,
    lede: 'The next three steps look at what surrounds each site that made the cut.',
    bodyParagraphs: [
      <>
        Wave exposure is about how hard the water hits. A site can be perfect
        for oysters and still need sturdier, storm-ready construction because
        the waves run high. Several of the strongest sites, including the
        Living Breakwaters cluster, sit in exactly that kind of water. They
        stay on the list. You can&apos;t pay your way to better water, but you
        can pay for the engineering, and now BOP knows where it will need to.
        Wave data comes from <Em>Natrx Assess</Em>.
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
    title: <>Shoreline erosion, from <Em>Natrx Assess</Em></>,
    lede: 'Wave adds cost. Erosion adds value.',
    bodyParagraphs: [
      "Some sites sit right next to a shoreline that is washing away. Those get a flag too, a hopeful one. A reef in front of a crumbling shore softens the waves and slows the land's retreat. One reef, two jobs at once: a home for oysters and a guard for the coast.",
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
      "The last layer is about people and paperwork. Sites near old sewer and stormwater outfalls come with extra permitting hoops from state and federal agencies. Sites next to public parks are easier to fund and to share with the neighborhood. What these change is the path, not the biology: how fast BOP can move, and how much public good a project does along the way.",
      "Lay all six layers over one another and the first projects come into focus. They are not all alike. Some, like the Living Breakwaters cluster, sit in rougher water that costs more to build in. Some sit beside a shoreline a reef could help hold in place. Arthur Kill, the strongest of them all, sits in calm water with little hard data nearby, which makes it the clearest place to go study next. The top ten are where the framework tells BOP to start. The rest of the qualifying sites wait in reserve, ready to move up as the leaders head into design and permitting. This is what the work set out to deliver. And BOP can run it again next year, as new data comes in.",
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
