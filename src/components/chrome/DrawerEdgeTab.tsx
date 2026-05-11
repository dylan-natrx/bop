'use client'

import { useDrawer } from './SiteChromeProvider'

/**
 * Persistent right-edge affordance that toggles the SiteDrawer.
 *
 * Desktop (lg+): vertical tab, fixed to the right edge, vertically centered.
 * Mobile (<lg):  round button, fixed in the lower-right corner.
 */
export function DrawerEdgeTab() {
  const { toggle, isOpen } = useDrawer()

  return (
    <>
      {/* Desktop affordance */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="site-drawer"
        aria-label="Open glossary and press contact"
        className="
          hidden lg:flex fixed top-1/2 right-0 -translate-y-1/2 z-40
          items-center justify-center
          pl-2 pr-1.5 py-6
          bg-bg-mid/85 hover:bg-bg-mid
          border border-r-0 border-rule
          rounded-l-md
          text-ivory-dim hover:text-ivory
          backdrop-blur-sm
          transition-colors duration-200
        "
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="font-mono uppercase text-[10px] tracking-[0.22em]">
          Glossary &amp; Press
        </span>
      </button>

      {/* Mobile affordance */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="site-drawer"
        aria-label="Open glossary and press contact"
        className="
          lg:hidden fixed bottom-5 right-5 z-40
          w-12 h-12
          bg-bg-mid/95 hover:bg-bg-mid
          border border-rule
          rounded-full
          flex items-center justify-center
          text-ivory-dim hover:text-ivory
          backdrop-blur-sm shadow-lg
          transition-colors duration-200
        "
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 4 h12 a4 4 0 0 1 4 4 v12 H8 a4 4 0 0 1 -4 -4 z" />
          <path d="M8 8 h8 M8 12 h8 M8 16 h5" />
        </svg>
      </button>
    </>
  )
}
