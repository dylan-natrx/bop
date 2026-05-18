import { SectionShell } from './SectionShell'
import { EditorialImage } from './EditorialImage'
import { GlossaryTerm } from '@/components/ui/GlossaryTerm'
import { Pullquote } from './Pullquote'

export function StakesAndProblem() {
  return (
    <SectionShell id="stakes-and-problem" eyebrow="The stakes and the problem">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <h2 className="
            col-span-1 lg:col-span-12
            font-serif font-light text-ivory leading-[1.05]
            text-4xl sm:text-5xl lg:text-6xl
            max-w-[22ch]
          ">
          Rebuilding the harbor&apos;s oyster reefs, and choosing where to start.
        </h2>

        <div className="
            col-span-1 lg:col-span-7 lg:col-start-1
            mt-2 space-y-6
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            New York Harbor was once one of the most productive estuaries on
            Earth. Three hundred and fifty square miles of oyster reef, water
            clear enough to see fifteen feet down, a food web that fed the
            eastern seaboard. Centuries of dredging, overharvest, and
            industrial discharge collapsed it. Billion Oyster Project is
            rebuilding that foundation, with a target of one billion oyster
            spat deployed across the harbor by 2035.
          </p>
          <p>
            Restoration in the harbor has happened opportunistically. Sites
            moved forward when a parks department said yes, when a marina
            allowed a cage, when access was available. At proof-of-concept
            scale, that was the right discipline. It gave the Billion Oyster
            Project a decade of small-reef work and real evidence of what
            survives where in the harbor.
          </p>
          <p>
            At the scale of one billion oysters by 2035, the program needed a
            different kind of decision. BOP&apos;s pipeline contains 78{' '}
            <GlossaryTerm termId="candidate-site">
              candidate restoration sites
            </GlossaryTerm>
            , with a target of ten to fifteen funded, permitted projects
            ready to break ground by 2029 or 2030. The alternative was to
            advance each site through 30 percent design before a go-or-no-go
            call, burning capital across locations that better information
            could have ruled out earlier. The shift the program had to make
            was from opportunistic siting to systemwide planning.
          </p>

          <Pullquote
            attribution="Carolyn Khoury"
            role="Director of Restoration, Billion Oyster Project"
          >
            We&apos;ve moved from considering each restoration site
            individually to understanding what the whole system needs to
            support a self-sustaining population. That&apos;s a new way of
            doing restoration for us.
          </Pullquote>

          <p>
            The framework on this page is how Billion Oyster Project and Natrx
            built that capability together.
          </p>
        </div>

        <aside className="
            col-span-1 lg:col-span-5 lg:col-start-8
            mt-2
          ">
          <EditorialImage
            src="/site-imagery/section2.jpg"
            alt="New York Harbor"
            width={829}
            height={1040}
            aspect="4 / 5"
          />
        </aside>
      </div>
    </SectionShell>
  )
}
