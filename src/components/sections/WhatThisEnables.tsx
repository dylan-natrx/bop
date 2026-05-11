import { SectionShell } from './SectionShell'
import { EditorialImage } from './EditorialImage'

// Note: the glossary lives in the persistent right-edge drawer
// (SiteChromeProvider + SiteDrawer), not in this section. § 5 closes the
// page with the portability story; the drawer carries definitions and the
// press contact.

export function WhatThisEnables() {
  return (
    <SectionShell id="what-this-enables" eyebrow="What this enables">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <h2 className="
            col-span-1 lg:col-span-12
            font-serif font-light text-ivory leading-[1.05]
            text-4xl sm:text-5xl lg:text-6xl
            max-w-[18ch]
          ">
          The methodology travels.
        </h2>

        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-2 space-y-6
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            The class of decision Billion Oyster Project faced is becoming the
            central decision of restoration at scale. Coastal districts, state
            agencies, port authorities, and foundations all face the same
            question. Which sites earn the next dollar, on what evidence, and
            with what confidence. The framework built for New York Harbor is
            portable. The water quality scoring functions retune for local
            salinity regimes. The wave and shoreline change products from{' '}
            <em className="font-serif italic">Natrx Assess</em> run for any
            coastal geography with NAIP-equivalent imagery. The practical
            filters change with local regulatory and ecological context. San
            Francisco Bay and the Chesapeake face the same fundamental
            question, with their own data realities.
          </p>
          <p>
            The framework BOP now operates is theirs to rerun. The team can
            update the analysis annually as new data lands, as additional
            candidate sites come into the pipeline, and as the regulatory
            landscape shifts with reforms in progress at New York State DEC.
            Natrx Assess and the broader Natrx capability set, the analytical
            platform paired with field experience from ExoForm deployments at
            scale, is the answer to the full question.
          </p>
        </div>

        <div className="col-span-1 lg:col-span-8 lg:col-start-3 mt-12 lg:mt-16">
          <EditorialImage
            src="/site-imagery/nyoyster.webp"
            alt="A New York Harbor oyster"
            width={1201}
            height={901}
            aspect="4 / 3"
          />
        </div>
      </div>
    </SectionShell>
  )
}
