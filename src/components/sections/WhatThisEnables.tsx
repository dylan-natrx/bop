import { SectionShell } from './SectionShell'
import { EditorialImage } from './EditorialImage'

// § 5 closes the page with three beats — operational, institutional,
// mission — followed by a closing paragraph on the portability of the
// framework. The glossary and press contact live in the persistent
// right-edge drawer (SiteChromeProvider + SiteDrawer), not in this section.

export function WhatThisEnables() {
  return (
    <SectionShell id="what-this-enables" eyebrow="What this unlocks">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <h2 className="
            col-span-1 lg:col-span-12
            font-serif font-light text-ivory leading-[1.05]
            text-4xl sm:text-5xl lg:text-6xl
            max-w-[22ch]
          ">
          The pipeline becomes operational.
        </h2>

        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-6 lg:mt-8
            space-y-10 lg:space-y-12
          ">
          {/* Beat: Operational */}
          <div className="space-y-3">
            <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-teal-bright">
              Operational
            </div>
            <p className="font-sans text-body text-ivory-dim font-light leading-[1.65]">
              Ten priority sites can advance in parallel, rather than every
              candidate site advancing sequentially through thirty percent
              design before any decision can be made. Time and capital that
              previously flowed into sites that should have been screened out
              earlier now flow into the sites most likely to deliver.
            </p>
          </div>

          {/* Beat: Institutional */}
          <div className="space-y-3">
            <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-teal-bright">
              Institutional
            </div>
            <p className="font-sans text-body text-ivory-dim font-light leading-[1.65]">
              Oyster restoration in New York Harbor requires approvals from a
              patchwork of state and federal agencies. When BOP returns to
              those agencies with the comprehensive ranking, the underlying
              methodology, and the confidence layer behind every site, the
              agencies see the whole pipeline. The result is predictability
              the previous process could not deliver.
            </p>
          </div>

          {/* Beat: Mission */}
          <div className="space-y-3">
            <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-teal-bright">
              Mission
            </div>
            <p className="font-sans text-body text-ivory-dim font-light leading-[1.65]">
              BOP&apos;s target is one billion oysters in the water by 2035.
              The harbor currently holds under 200 million. The gap requires
              years of deployment at scales BOP has not previously reached.
              The new framework makes a parallel pipeline of ten sites
              credible, which makes the 2035 target operationally achievable
              for the first time.
            </p>
          </div>
        </div>

        {/* Closing paragraph: zooms out from BOP-specific outcomes to the
            broader portability story */}
        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-12 lg:mt-16
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            The harbor is the test case. The decision class is national.
            Coastal districts, state agencies, port authorities, and
            foundations all face the same question. The framework built for
            New York Harbor is portable. The water quality scoring retunes
            for local salinity regimes. The wave and shoreline change
            products from{' '}
            <em className="font-serif italic">Natrx Assess</em> run for any
            coastal geography with NAIP-equivalent imagery. San Francisco
            Bay and the Chesapeake face the same fundamental question, with
            their own data realities. The work happening in New York Harbor
            this summer is the beginning of how restoration gets done at
            landscape scale.
          </p>
        </div>

        {/* Future pullquote slot: reserved for an interview quote that
            closes the section, ahead of the oyster image. */}

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
