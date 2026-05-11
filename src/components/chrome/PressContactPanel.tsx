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
            Dylan DiBona
          </div>
          <div className="font-sans text-body-sm text-ivory-dim mt-0.5">
            Press contact, Natrx &times; Billion Oyster Project
          </div>
          <a
            href="mailto:dylan@mondayandpartners.com"
            className="
              inline-block mt-2
              font-mono text-body-sm tracking-wide
              text-teal-aqua hover:text-ivory
              transition-colors duration-200
            "
          >
            dylan@mondayandpartners.com
          </a>
        </div>

        <div className="h-px bg-rule" />

        <div>
          <div className="font-mono text-eyebrow uppercase text-ivory-faint mb-2">
            Source materials
          </div>
          <p className="font-sans text-body-sm text-ivory-dim leading-relaxed max-w-[44ch]">
            The BOP &times; Natrx Master Document, the Wave and Shoreline Change Analysis Report, and per-site data are available to reporters working on related coverage. Email above to request access.
          </p>
        </div>

        <div className="h-px bg-rule" />

        <div>
          <p className="font-serif italic font-light text-ivory-dim text-base leading-relaxed max-w-[44ch]">
            Reporters working on adjacent stories are welcome to reach out. This is editorial outreach, not a commercial channel.
          </p>
        </div>
      </div>
    </div>
  )
}
