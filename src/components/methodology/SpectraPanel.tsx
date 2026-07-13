'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import type { StepConfig, SpectraCurve } from './steps'

/**
 * Spectra panel — stack of applied filters.
 *
 * Each step adds one new filter to the stack. The newest addition appears at
 * the top; previously-added filters get pushed down. Every item is clickable
 * and jumps the walkthrough back to the step where that filter was added.
 */
interface SpectraPanelProps {
  step: StepConfig
  onJumpToStep: (step: number) => void
}

// Curve plots are sized so the 440px spectra column shows two at a time
// before scrolling. Three-up made each plot too short to carry axis labels.
const CURVE_HEIGHT = 132 // px per curve plot
const CURVE_PADDING_X = 8
const CURVE_PADDING_Y = 10
const VB_W = 200
const VB_H = 70

interface CurveDef {
  key: SpectraCurve
  title: string
  /** Short descriptor of what the Y-axis represents (e.g. "Scoring function") */
  subtitle: string
  /** Optional source/credit line rendered beneath the plot, figure-caption styled */
  citation?: string
  xLabel: string
  xTicks: { x: number; label: string }[]
  path: string
  favorableZone: { x: number; width: number }
  annotation: { text: string; x: number; y: number }
  /** Optional inline label drawn at a specific threshold (e.g. wave's 3 ft flag) */
  thresholdLabel?: { text: string; x: number; y: number }
}

const CURVE_DEFS: Record<SpectraCurve, CurveDef> = {
  salinity: {
    key: 'salinity',
    title: 'Salinity',
    subtitle: 'Scoring function',
    xLabel: 'PSU',
    xTicks: [
      { x: 0, label: '0' },
      { x: 22, label: '5' },
      { x: 55, label: '12' },
      { x: 89, label: '20' },
      { x: 178, label: '40' },
    ],
    path: `
      M 0 66
      L 22 66
      C 32 66, 44 22, 55 9
      L 89 9
      C 105 9, 140 52, 178 66
      L 200 66
    `,
    favorableZone: { x: 55, width: 34 },
    annotation: { text: 'Optimum 12–20 PSU', x: 70, y: 19 },
    citation: 'Scoring function adapted from Starke et al. (2011).',
  },
  chla: {
    key: 'chla',
    title: 'Chlorophyll-a',
    subtitle: 'Scoring function',
    xLabel: 'µg/L',
    xTicks: [
      { x: 0, label: '0' },
      { x: 100, label: '20' },
      { x: 200, label: '40' },
    ],
    path: `M 0 66 L 200 6`,
    favorableZone: { x: 50, width: 50 },
    annotation: { text: 'Linear food response', x: 50, y: 22 },
  },
  do: {
    key: 'do',
    title: 'Dissolved oxygen',
    subtitle: 'Scoring function',
    xLabel: '% below 3 mg/L',
    xTicks: [
      { x: 0, label: '0%' },
      { x: 13, label: '2%' },
      { x: 67, label: '10%' },
      { x: 200, label: '30%+' },
    ],
    path: `
      M 0 6
      L 13 6
      L 13 22
      L 67 22
      L 67 36
      L 200 36
    `,
    favorableZone: { x: 0, width: 13 },
    annotation: { text: 'Hypoxia threshold, 3 mg/L', x: 16, y: 14 },
  },
  wave: {
    key: 'wave',
    title: 'Wave exposure',
    subtitle: 'How hard the waves make a site to build',
    xLabel: 'feet',
    xTicks: [
      { x: 0, label: '0' },
      { x: 50, label: '1' },
      { x: 100, label: '2' },
      { x: 150, label: '3' },
      { x: 200, label: '4+' },
    ],
    path: `
      M 0 66
      C 18 66, 32 20, 50 12
      C 70 6, 85 10, 100 20
      C 120 32, 140 52, 150 60
      L 200 66
    `,
    favorableZone: { x: 28, width: 60 },
    annotation: { text: 'Sweet spot ~1 ft', x: 28, y: 21 },
    thresholdLabel: { text: 'Engineering flag', x: 96, y: 4 },
  },
}

type Dimension = 'biology' | 'external'

interface StackItem {
  /** Unique key */
  key: string
  /** Step at which this filter was added; clicking jumps here */
  addedAtStep: number
  /** Short label shown alongside the item */
  label: string
  /**
   * Which dimension this item belongs to. Biology items (salinity, chla,
   * dissolved oxygen) get teal accents. External items (wave, erosion,
   * operational filters) get warm amber accents. The visual cue tells the
   * reader they've moved from "where can oysters thrive" (biology) to
   * "what does it take to build it" (external).
   */
  dimension: Dimension
  render: (isActive: boolean, dimension: Dimension) => ReactNode
}

export function SpectraPanel({ step, onJumpToStep }: SpectraPanelProps) {
  // Build the stack of all items applicable up to the current step.
  // Each item knows the step it was added at and renders its own visual.
  const items: StackItem[] = []

  // Curves. Each water-quality curve carries its own favorable-zone shading
  // from the moment the curve is introduced (not gated by step). The
  // shape of the curve already tells the optimum story; the zone makes it
  // immediate. Step 3 is then the implicit "all three align" moment because
  // all three zones are visible together for the first time.
  step.visibleCurves.forEach((curveKey) => {
    const addedAtStep =
      curveKey === 'salinity' ? 1 :
      curveKey === 'chla' ? 2 :
      curveKey === 'do' ? 3 :
      4
    const def = CURVE_DEFS[curveKey]
    const isWaterQualityCurve =
      curveKey === 'salinity' || curveKey === 'chla' || curveKey === 'do'
    const dimension: Dimension = isWaterQualityCurve ? 'biology' : 'external'
    items.push({
      key: `curve-${curveKey}`,
      addedAtStep,
      label: def.title,
      dimension,
      render: (isActive, dim) => (
        <CurvePlot
          curve={def}
          isActive={isActive}
          dimension={dim}
          showFavorableZone={isWaterQualityCurve}
          showFlagThreshold={curveKey === 'wave'}
        />
      ),
    })
  })

  // Annotations
  if (step.showErosionAnnotation) {
    items.push({
      key: 'erosion-annotation',
      addedAtStep: 5,
      label: 'Shoreline erosion',
      dimension: 'external',
      render: (isActive, dim) => (
        <AnnotationBlock
          eyebrow="Shoreline erosion"
          body="Where a strong site sits next to a shoreline that is washing away, a reef does a second job. It softens the waves and slows the land's retreat. The map flags these sites."
          isActive={isActive}
          dimension={dim}
        />
      ),
    })
  }
  if (step.showFiltersAnnotation) {
    items.push({
      key: 'filters-annotation',
      addedAtStep: 6,
      label: 'Context filters',
      dimension: 'external',
      render: (isActive, dim) => (
        <AnnotationBlock
          eyebrow="Context filters"
          body="Real-world conditions that shape where Billion Oyster Project can move first. How close a site sits to a public park, and how far it sits from old sewer and stormwater outfalls."
          isActive={isActive}
          dimension={dim}
        />
      ),
    })
  }

  // Newest first
  const sorted = [...items].sort((a, b) => b.addedAtStep - a.addedAtStep)

  return (
    <div
      className="flex flex-col gap-3"
      role="region"
      aria-label="Variable scoring functions"
    >
      <AnimatePresence initial={false}>
        {sorted.map((item) => {
          const isActive = item.addedAtStep === step.id
          return (
            <motion.div
              key={item.key}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: isActive ? 1 : 0.6, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button
                type="button"
                onClick={() => onJumpToStep(item.addedAtStep)}
                aria-label={`Revisit step ${item.addedAtStep}: ${item.label}`}
                className={`
                  group w-full text-left rounded-card
                  transition-colors duration-200
                  ${isActive ? '' : 'hover:opacity-100'}
                  ${isActive ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                {item.render(isActive, item.dimension)}
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {step.showMathDisclosure && <MathDisclosure />}
    </div>
  )
}

interface CurvePlotProps {
  curve: CurveDef
  isActive: boolean
  dimension: Dimension
  /** Render the favorable zone shading. Always true for the three water-quality curves. */
  showFavorableZone: boolean
  showFlagThreshold: boolean
}

function CurvePlot({
  curve,
  isActive,
  dimension,
  showFavorableZone,
  showFlagThreshold,
}: CurvePlotProps) {
  // Annotation x/y in viewBox → percentages so we can position HTML overlays
  // crisply (SVG <text> with preserveAspectRatio="none" stretches text
  // horizontally and renders illegibly).
  const annotationLeftPct = (curve.annotation.x / VB_W) * 100
  const annotationTopPct = (curve.annotation.y / VB_H) * 100

  // Dimension-aware accent. Biology curves wear teal; external curves
  // (currently only wave) wear amber. The active border is the bright
  // accent at 35% opacity; inactive uses the soft rule color so the
  // dimension cue lives in the active state.
  const activeBorder =
    dimension === 'biology'
      ? 'border-teal-bright/35'
      : 'border-[#D9B47A]/50'

  return (
    <div
      className={`
        relative px-3 pt-2 pb-1.5 rounded-card
        ${isActive
          ? `bg-bg-mid/55 border ${activeBorder}`
          : 'bg-bg-mid/30 border border-rule-soft group-hover:border-rule'}
        transition-colors duration-200
      `}
    >
      <div className="mb-1.5">
        <div className="flex items-baseline justify-between mb-0.5">
          <div className="flex items-baseline gap-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory-dim">
              {curve.title}
            </div>
            {!isActive && (
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory-faint opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Revisit →
              </span>
            )}
          </div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ivory-dim">
            {curve.xLabel}
          </div>
        </div>
        <div className="font-serif italic text-[12px] leading-snug text-ivory-dim">
          {curve.subtitle}
        </div>
      </div>

      <div className="relative" style={{ height: CURVE_HEIGHT }}>
        {/* Annotation as HTML overlay (legible regardless of SVG stretching).
            Soft text-shadow keeps it readable over the curve fill. */}
        <div
          className="absolute font-serif italic text-[12.5px] leading-snug text-ivory pointer-events-none"
          style={{
            left: `${annotationLeftPct}%`,
            top: `${annotationTopPct}%`,
            maxWidth: '60%',
            textShadow: '0 0 6px rgba(6, 19, 33, 0.85)',
          }}
        >
          {curve.annotation.text}
        </div>

        {/* Threshold label (e.g. the wave chart's "Engineering flag" by the
            3 ft dashed line). External-dimension curves (wave) wear amber
            so the label color matches the active border treatment. */}
        {curve.thresholdLabel && (
          <div
            className={`absolute font-mono uppercase tracking-[0.18em] text-[10px] pointer-events-none whitespace-nowrap ${
              dimension === 'external' ? 'text-[#D9B47A]' : 'text-teal-aqua'
            }`}
            style={{
              left: `${(curve.thresholdLabel.x / VB_W) * 100}%`,
              top: `${(curve.thresholdLabel.y / VB_H) * 100}%`,
              textShadow: '0 0 6px rgba(6, 19, 33, 0.85)',
            }}
          >
            {curve.thresholdLabel.text}
          </div>
        )}

      <svg
        viewBox={`-${CURVE_PADDING_X} -${CURVE_PADDING_Y} ${VB_W + CURVE_PADDING_X * 2} ${VB_H + CURVE_PADDING_Y * 2}`}
        className="w-full h-full block"
        preserveAspectRatio="none"
      >
        {showFavorableZone && (
          <rect
            x={curve.favorableZone.x}
            y={-CURVE_PADDING_Y}
            width={curve.favorableZone.width}
            height={VB_H + CURVE_PADDING_Y * 2}
            fill="rgba(111, 227, 208, 0.1)"
          />
        )}
        {showFlagThreshold && (
          <line
            x1={150}
            y1={-CURVE_PADDING_Y / 2}
            x2={150}
            y2={VB_H + CURVE_PADDING_Y / 2}
            stroke="rgba(217, 180, 122, 0.55)"
            strokeWidth={0.6}
            strokeDasharray="3 2"
          />
        )}

        <line
          x1={0}
          y1={VB_H}
          x2={VB_W}
          y2={VB_H}
          stroke="rgba(242, 237, 227, 0.18)"
          strokeWidth={0.5}
        />
        {curve.xTicks.map((tick) => (
          <line
            key={tick.label}
            x1={tick.x}
            y1={VB_H}
            x2={tick.x}
            y2={VB_H + 3}
            stroke="rgba(242, 237, 227, 0.4)"
            strokeWidth={0.7}
          />
        ))}

        <path
          d={`${curve.path} L 200 ${VB_H} L 0 ${VB_H} Z`}
          fill={dimension === 'external' ? 'rgba(217, 180, 122, 0.12)' : 'rgba(19, 125, 118, 0.14)'}
        />
        <path
          d={curve.path}
          fill="none"
          stroke={dimension === 'external' ? '#D9B47A' : '#2BA8A0'}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      </div>

      {/* X-axis tick labels. Rendered as HTML, not SVG <text>, because the
          plot uses preserveAspectRatio="none" and would stretch the type.
          Percentages account for the viewBox's horizontal padding. */}
      <div className="relative h-4 -mt-1" aria-hidden="true">
        {curve.xTicks.map((tick) => (
          <span
            key={tick.label}
            className="absolute top-0 font-mono text-[10.5px] tracking-[0.1em] text-ivory-dim whitespace-nowrap"
            style={{
              left: `${((tick.x + CURVE_PADDING_X) / (VB_W + CURVE_PADDING_X * 2)) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {tick.label}
          </span>
        ))}
      </div>

      {curve.citation && (
        <div className="mt-2 font-mono text-eyebrow uppercase tracking-[0.22em] text-ivory-faint leading-relaxed">
          {curve.citation}
        </div>
      )}
    </div>
  )
}

interface AnnotationBlockProps {
  eyebrow: string
  body: string
  isActive: boolean
  dimension: Dimension
}

function AnnotationBlock({ eyebrow, body, isActive, dimension }: AnnotationBlockProps) {
  // Both annotation blocks (Shoreline erosion, Context filters) are
  // external-dimension. The biology branch is kept for symmetry in case
  // a future annotation needs the teal treatment.
  const activeClasses =
    dimension === 'biology'
      ? 'border-l-teal-bright bg-bg-mid/55 border-y border-r border-y-teal-bright/25 border-r-teal-bright/25'
      : 'border-l-[#D9B47A] bg-bg-mid/55 border-y border-r border-y-[#D9B47A]/25 border-r-[#D9B47A]/25'
  const inactiveClasses =
    dimension === 'biology'
      ? 'border-l-teal/55 bg-bg-mid/30 border-y border-r border-y-rule-soft border-r-rule-soft group-hover:border-l-teal-bright/80'
      : 'border-l-[#D9B47A]/55 bg-bg-mid/30 border-y border-r border-y-rule-soft border-r-rule-soft group-hover:border-l-[#D9B47A]/80'

  return (
    <div
      className={`
        relative px-3 py-3 rounded-card border-l-2
        ${isActive ? activeClasses : inactiveClasses}
        transition-colors duration-200
      `}
    >
      <div className="flex items-baseline justify-between mb-1">
        <div className="font-mono text-eyebrow uppercase text-ivory-faint">
          {eyebrow}
        </div>
        {!isActive && (
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory-faint opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Revisit →
          </span>
        )}
      </div>
      <div className="font-sans text-[11.5px] text-ivory-dim leading-relaxed">
        {body}
      </div>
    </div>
  )
}

function MathDisclosure() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="
          font-mono text-eyebrow uppercase text-ivory-faint hover:text-ivory
          transition-colors duration-200
        "
      >
        {isOpen ? 'Hide the math' : 'Show the math'} →
      </button>
      {isOpen && (
        <div className="mt-2 text-[11.5px] font-sans text-ivory-dim leading-relaxed border-l-2 border-rule pl-3 py-1">
          <div className="font-mono text-[12px] text-ivory mb-2">
            composite = (sal_score + chla_score) ÷ 2 × do_score
          </div>
          <p>
            Here is how the numbers actually combine. The two water scores, salinity and food, are averaged, then multiplied by the oxygen score. That multiply is what lets low oxygen pull a whole site down. The stacked curves above show the <em>idea</em>; this line shows the arithmetic.
          </p>
        </div>
      )}
    </div>
  )
}
