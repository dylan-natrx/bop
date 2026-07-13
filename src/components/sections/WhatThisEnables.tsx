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
          The harbor gets a plan it can build on.
        </h2>

        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-6 lg:mt-8
            space-y-10 lg:space-y-12
          ">
          {/* Beat: Operational */}
          <div className="space-y-3">
            <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-teal-bright">
              The work
            </div>
            <p className="font-sans text-body text-ivory-dim font-light leading-[1.65]">
              Billion Oyster Project can now push several of the top sites
              toward design and permitting at the same time, using the ranking
              to decide where to put its money and effort first.
            </p>
          </div>

          {/* Beat: Institutional */}
          <div className="space-y-3">
            <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-teal-bright">
              The agencies
            </div>
            <p className="font-sans text-body text-ivory-dim font-light leading-[1.65]">
              Rebuilding reefs in New York Harbor needs sign-off from a stack of
              city, state, and federal agencies. This framework gives those
              agencies clearer insight into Billion Oyster Project&apos;s
              decision-making: every potential site ranked, the reasons behind
              each ranking, and how much data supports it. It is the kind of
              careful, side-by-side analysis regulators need and ask for, and
              the kind of resource that facilitates estuary-scale planning and
              implementation.
            </p>
          </div>

          {/* Beat: Institutional, second blurb — the GEIS and the permitting
              path. Split from the paragraph above per Khoury's note that the
              combined block ran long. */}
          <div className="space-y-3">
            <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-teal-bright">
              The review
            </div>
            <p className="font-sans text-body text-ivory-dim font-light leading-[1.65]">
              Over the next two years, Billion Oyster Project and New York State
              are preparing a Generic Environmental Impact Statement for oyster
              restoration activities in the estuary, due to wrap by the end of
              2028. Once this review is done, it will streamline the permitting
              path for individual restoration sites. This analysis feeds
              straight into that review. When Billion Oyster Project comes back
              to permit projects, the conversation starts from solid,
              comparative evidence the agencies have not had before.
            </p>
          </div>

          {/* Beat: Mission */}
          <div className="space-y-3">
            <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-teal-bright">
              The mission
            </div>
            <p className="font-sans text-body text-ivory-dim font-light leading-[1.65]">
              Billion Oyster Project is aiming for one billion oysters in the
              water by 2030. Roughly 200 million have been reintroduced so far.
              Closing that gap means building far more reef, far faster than
              before. By making it believable to advance many sites at once
              instead of one at a time, the framework puts the 2030 goal within
              reach for the first time.
            </p>
          </div>
        </div>

        {/* Pullquote: Lise Montefiore on the partnership scale.
            Sits between the three-beat block and the closing portability
            paragraph as a hinge from "what this means for BOP" to
            "what carries forward to the broader field." */}
        <div className="col-span-1 lg:col-span-8 lg:col-start-3 mt-12 lg:mt-16">
          <Pullquote
            attribution="Lise Montefiore, PhD"
            role="Water Quality and Data Scientist, Natrx"
          >
            Water quality data in a harbor like this is complex. Our work
            was to extract it from many monitoring stations and turn it
            into something Billion Oyster Project could make decisions from.
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
            The same question is waiting all over the map. Coastal towns, state
            agencies, port authorities, foundations, and restoration groups
            large and small are all trying to work out where to start. This way
            of working can answer them, because it doesn&apos;t carry New
            York&apos;s answer with it. It carries a way of listening to a
            place: the data a harbor already keeps, and the people who know its
            water. The scoring is set to each estuary&apos;s own salinity, food,
            and oxygen. The shoreline work from{' '}
            <em className="font-serif italic text-white">Natrx Assess</em> runs
            anywhere there is aerial or satellite imagery to read. Every place brings
            its own nature and its own gaps in the data. What travels is the
            habit of looking at every candidate at once, and being honest about
            how much we know.
          </p>
          <p className="mt-6">
            An oyster reef is a hopeful kind of thing: something we build that
            is also alive. It guards a shoreline and cleans the water around it
            at the same time. Work like this is a bet that what we make and what lives
            around us can do more than share space. They can look after each
            other.
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
