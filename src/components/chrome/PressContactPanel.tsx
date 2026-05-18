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

      <div className="space-y-8">
        <div>
          <div className="font-mono text-eyebrow uppercase text-ivory-faint mb-2">
            Inquiries
          </div>
          <div className="font-serif font-light text-ivory text-xl leading-tight">
            Andi Cross
          </div>
          <div className="font-sans text-body-sm text-ivory-dim mt-0.5">
            Director of Communications, Billion Oyster Project (
            <a
              href="https://www.bop.nyc/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-ivory-dim hover:text-ivory
                underline decoration-dotted underline-offset-2 decoration-teal/60
                hover:decoration-teal-bright hover:decoration-solid
                transition-colors duration-200
              "
            >
              bop.nyc
            </a>
            )
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

        <div className="h-px bg-rule" />

        <div>
          <div className="font-mono text-eyebrow uppercase text-ivory-faint mb-2">
            Inquiries
          </div>
          <div className="font-serif font-light text-ivory text-xl leading-tight">
            Dylan DiBona
          </div>
          <div className="font-sans text-body-sm text-ivory-dim mt-0.5">
            Press contact, Natrx &times; Billion Oyster Project
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
