'use client'

import { useCallback, useEffect, useState } from 'react'

interface NavItem {
  /** DOM id of the section to anchor to */
  id: string
  /** Short label for the nav bar */
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Top' },
  { id: 'stakes-and-problem', label: 'Stakes' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'analysis-made-visible', label: 'Findings' },
  { id: 'what-this-enables', label: 'At scale' },
]

/**
 * Sticky top navigation bar with section links and scroll-spy active state.
 *
 * On click, smooth-scrolls to the matching section. As the reader scrolls,
 * IntersectionObserver tracks which section is currently in view and
 * highlights the corresponding nav item. The brand lockup on the left
 * doubles as a "scroll to top" affordance.
 */
export function SectionNav() {
  const [activeId, setActiveId] = useState<string>('hero')

  useEffect(() => {
    // A section is "active" when its top has crossed about 30% down the
    // viewport. The wide negative bottom margin keeps the last section
    // selected even when the page can't scroll further.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleClick = useCallback((id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      // Offset by the nav bar's own height so the section title isn't hidden.
      const NAV_H = 56
      const rect = el.getBoundingClientRect()
      const top = window.scrollY + rect.top - NAV_H
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <nav
      className="
        sticky top-0 z-30
        bg-bg-deep/85 backdrop-blur-md
        border-b border-rule
      "
      aria-label="Section navigation"
    >
      <div className="max-w-scaffold mx-auto px-scaffold-x flex items-center justify-between h-14">
        {/* Brand lockup, also functions as "scroll to top" */}
        <a
          href="#hero"
          onClick={handleClick('hero')}
          className="
            font-sans text-label uppercase tracking-[0.18em]
            text-ivory hover:text-teal-aqua
            transition-colors duration-200
          "
        >
          Billion Oyster Project
          <span className="text-teal-bright mx-1.5 font-medium">×</span>
          Natrx
        </a>

        {/* Section links */}
        <ul className="hidden md:flex items-stretch gap-1">
          {NAV_ITEMS.slice(1).map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={handleClick(item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`
                    relative inline-flex items-center h-14 px-4
                    font-mono text-eyebrow uppercase tracking-[0.22em]
                    transition-colors duration-200
                    ${isActive
                      ? 'text-ivory'
                      : 'text-ivory-faint hover:text-ivory-dim'}
                  `}
                >
                  {item.label}
                  {/* Active indicator: teal-bright underline */}
                  <span
                    aria-hidden="true"
                    className={`
                      absolute left-4 right-4 bottom-0 h-px
                      transition-colors duration-200
                      ${isActive ? 'bg-teal-bright' : 'bg-transparent'}
                    `}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile: condensed indicator */}
        <div className="md:hidden font-mono text-eyebrow uppercase tracking-[0.22em] text-ivory-faint tabular-nums">
          {(() => {
            const idx = NAV_ITEMS.findIndex((n) => n.id === activeId)
            return `${Math.max(idx, 0) + 1} / ${NAV_ITEMS.length}`
          })()}
        </div>
      </div>
    </nav>
  )
}
