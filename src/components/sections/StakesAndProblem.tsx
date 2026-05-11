import { SectionShell } from './SectionShell'
import { EditorialImage } from './EditorialImage'

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
            rebuilding that foundation, one site at a time, with a target of
            one billion oyster spat deployed across the harbor by 2035.
          </p>
          <p>
            BOP maintains a pipeline of 78 candidate restoration sites and a
            target of ten to fifteen funded, permitted projects ready to break
            ground by 2029 or 2030. Their established assessment method is
            rigorous and expensive: vessel time, scientific instrumentation,
            lab analysis, tens of thousands of dollars per location. The
            method produces high-quality data. It does not scale across 78
            sites at any budget the organization could realistically secure.
            Without a way to compare candidate sites against one another,
            every site had to advance to thirty percent design before a go or
            no-go decision could be made.
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
