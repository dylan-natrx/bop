'use client'

import { GLOSSARY } from './glossary-data'

export function GlossaryPanel() {
  return (
    <div>
      <h2 className="font-serif font-light text-3xl lg:text-4xl text-ivory leading-tight mb-3">
        Glossary
      </h2>
      <p className="font-sans text-body-sm text-ivory-dim leading-relaxed mb-10 max-w-[42ch]">
        Plain-language definitions for the terms that travel through this piece. Drawn from the BOP Master Document and the project overview.
      </p>

      <dl className="space-y-7">
        {GLOSSARY.map(({ id, term, definition }) => (
          <div
            key={id}
            id={`glossary-term-${id}`}
            className="scroll-mt-6"
          >
            <dt className="font-serif font-light text-ivory text-lg leading-snug mb-1.5">
              {term}
            </dt>
            <dd className="font-sans text-body-sm text-ivory-dim leading-relaxed">
              {definition}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
