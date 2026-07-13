'use client'

import { useEffect, useRef, useState } from 'react'

interface TooltipProps {
  x: number
  y: number
  visible: boolean
  children: React.ReactNode
  /** Container element for boundary calculations (defaults to parent) */
  containerRef?: React.RefObject<HTMLElement | null>
}

/**
 * Generic tooltip component
 *
 * Dark glassmorphic style matching hero_reference.html
 * Automatically flips position when near container edges
 */
export function Tooltip({
  x,
  y,
  visible,
  children,
  containerRef,
}: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x, y })

  useEffect(() => {
    if (!visible || !tooltipRef.current) {
      setPosition({ x, y })
      return
    }

    const tooltip = tooltipRef.current
    const tooltipRect = tooltip.getBoundingClientRect()
    const container = containerRef?.current
    const containerRect = container?.getBoundingClientRect()

    // Use container bounds or viewport
    const maxWidth = containerRect?.width ?? window.innerWidth
    const maxHeight = containerRect?.height ?? window.innerHeight

    // Default offset from cursor
    const offset = 14

    let newX = x + offset
    let newY = y + offset

    // Flip horizontally if too close to right edge
    if (newX + tooltipRect.width > maxWidth - 20) {
      newX = x - tooltipRect.width - offset
    }

    // Flip vertically if too close to bottom edge
    if (newY + tooltipRect.height > maxHeight - 20) {
      newY = y - tooltipRect.height - offset
    }

    // Clamp to container bounds
    newX = Math.max(10, Math.min(newX, maxWidth - tooltipRect.width - 10))
    newY = Math.max(10, Math.min(newY, maxHeight - tooltipRect.height - 10))

    setPosition({ x: newX, y: newY })
  }, [x, y, visible, containerRef])

  return (
    <div
      ref={tooltipRef}
      className={`
        tooltip absolute pointer-events-none z-50
        px-3.5 py-2.5 rounded-sm
        text-ivory text-body-sm leading-snug
        transition-opacity duration-150 ease-out
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        left: position.x,
        top: position.y,
        maxWidth: 230,
      }}
    >
      {children}
    </div>
  )
}

/**
 * Tooltip content for site hover
 */
export function SiteTooltipContent({
  name,
  status,
  rank,
  score,
  acres,
}: {
  name: string
  status: string
  rank: number
  score: number
  acres: number
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-serif font-light text-[15px]">{name}</div>
      <div className="text-ivory-faint text-[11px]">{status}</div>
      <div className="mt-1.5 space-y-0.5 text-[12px]">
        <div className="flex justify-between gap-4">
          <span className="text-ivory-dim">Rank</span>
          <strong className="text-ivory font-medium">{rank}</strong>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-ivory-dim">Site score</span>
          <strong className="text-teal-aqua font-medium tabular-nums">
            {score.toFixed(2)}
          </strong>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-ivory-dim">Acres</span>
          <strong className="text-ivory font-medium tabular-nums">
            {acres.toFixed(1)}
          </strong>
        </div>
      </div>
    </div>
  )
}
