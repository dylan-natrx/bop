'use client'

export function PressContactPanel() {
  return (
    <div>
      <h2 className="font-serif font-light text-3xl lg:text-4xl text-ivory leading-tight mb-3">
        Press contact
      </h2>
      <p className="font-sans text-body-sm text-ivory-dim leading-relaxed mb-10 max-w-[42ch]">
        For reporters covering coastal restoration, ecological infrastructure, and the urban-estuary recovery story.
      </p>

      {/* Two contacts, side-by-side on md+, stacked on narrow drawer widths.
          Each card carries an affiliation eyebrow that links to the org so
          the two press contacts read as equal partners, not a ranked list. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-8">
        <div>
          <a
            href="https://www.bop.nyc/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-mono text-eyebrow uppercase text-ivory-faint hover:text-ivory
              transition-colors duration-200
            "
          >
            Billion Oyster Project
          </a>
          <div className="font-serif font-light text-ivory text-xl leading-tight mt-2">
            Andi Cross
          </div>
          <div className="font-sans text-body-sm text-ivory-dim mt-0.5">
            Director of Communications
          </div>
          <a
            href="tel:+14845013326"
            className="
              inline-block mt-2
              font-mono text-body-sm tracking-wide
              text-teal-aqua hover:text-ivory
              transition-colors duration-200
            "
          >
            +1 484 501 3326
          </a>
        </div>

        <div>
          <a
            href="https://natrx.io"
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-mono text-eyebrow uppercase text-ivory-faint hover:text-ivory
              transition-colors duration-200
            "
          >
            Natrx
          </a>
          <div className="font-serif font-light text-ivory text-xl leading-tight mt-2">
            Dylan DiBona
          </div>
          <div className="font-sans text-body-sm text-ivory-dim mt-0.5">
            Press contact
          </div>
          <a
            href="mailto:dylan@natrx.io"
            className="
              inline-block mt-2
              font-mono text-body-sm tracking-wide
              text-teal-aqua hover:text-ivory
              transition-colors duration-200
            "
          >
            dylan@natrx.io
          </a>
        </div>
      </div>
    </div>
  )
}
