import { SectionShell } from './SectionShell'
import { EditorialImage } from './EditorialImage'
import { GlossaryTerm } from '@/components/ui/GlossaryTerm'

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
          Rebuilding the harbor&apos;s oyster reefs, in the right order.
        </h2>

        <div className="
            col-span-1 lg:col-span-7 lg:col-start-1
            mt-2 space-y-6
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            For four hundred years, oyster restoration in New York Harbor has
            happened opportunistically. Where a parks department said yes.
            Where a marina allowed a cage off a pier. Where a wild oyster
            population pointed the way. At proof-of-concept scale, that was
            the right discipline. It gave the Billion Oyster Project a decade
            of small-reef work in the water, and real evidence of what
            survives where in a harbor that was once one of the most
            productive estuaries on Earth.
          </p>
          <p>
            At the scale of one billion oysters by 2035, the program needed a
            different kind of decision. The pipeline contains 78{' '}
            <GlossaryTerm termId="candidate-site">
              candidate restoration sites
            </GlossaryTerm>
            . Comparing them against one another across the variables that
            govern reef success required a framework that had to be built. The
            alternative was to advance each site through 30 percent design
            before a go-or-no-go call, burning capital across locations that
            better information could have ruled out earlier. The shift the
            program had to make was from opportunistic siting to systemwide
            planning.
          </p>
          <p>
            The framework on this page is how Billion Oyster Project and Natrx
            built that capability together.
          </p>
          {/* Future pullquote slot: reserved for an interview quote about the
              pre-comparative era of harbor restoration. */}
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
