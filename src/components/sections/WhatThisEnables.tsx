import { SectionShell } from './SectionShell'
import { EditorialImage } from './EditorialImage'
import { Pullquote } from './Pullquote'

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
              BOP can now move ten priority sites toward design and
              permitting at the same time, with the comparative ranking
              guiding where to commit time and capital first.
            </p>
          </div>

          {/* Beat: Institutional */}
          <div className="space-y-3">
            <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-teal-bright">
              Institutional
            </div>
            <p className="font-sans text-body text-ivory-dim font-light leading-[1.65]">
              Oyster restoration in New York Harbor requires approvals from a
              range of state and federal agencies. The new framework gives
              those agencies a complete view of the candidate pipeline: the
              ranking, the methodology behind every site&apos;s position
              within the ranking, and the confidence level driving each
              position. When BOP returns to the permitting process with this
              work, the conversation starts from documented, comparative
              analysis the agencies have not previously had.
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

        {/* Pullquote: Lise Montefiore on the partnership scale.
            Sits between the three-beat block and the closing portability
            paragraph as a hinge from "what this means for BOP" to
            "what carries forward to the broader field." */}
        <div className="col-span-1 lg:col-span-8 lg:col-start-3 mt-12 lg:mt-16">
          <Pullquote
            attribution="Lise Montefiore, PhD, MS"
            role="Data Scientist, Natrx"
          >
            What we did is a small piece of the big work BOP is doing to
            restore the harbor. The goal itself is impressive.
          </Pullquote>
        </div>

        {/* Closing paragraph: zooms out from BOP-specific outcomes to the
            broader portability story */}
        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-12 lg:mt-16
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            Coastal districts, state agencies, port authorities, and
            foundations are increasingly facing site-prioritization
            questions of their own. The methodology built for New York
            Harbor is a transferable framework. The underlying data is
            local. The scoring functions retune to the salinity, food, and
            oxygen conditions of whichever estuary the work is applied to.{' '}
            <em className="font-serif italic">Natrx Assess</em> erosion
            analyses can be run for any shoreline geography with publicly
            available satellite imagery. Each estuary brings its own
            ecological complexity and its own data realities. What carries
            forward is the structure: comparative analysis across all
            candidate sites at once, with confidence levels disclosed,
            calibrated to the place. The work happening in New York Harbor
            this year is part of a larger shift. The natural world and the
            built one, in service of each other.
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
