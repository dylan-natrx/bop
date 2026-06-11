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
            rebuilding that foundation, with a goal of one billion oysters in
            the harbor by 2035.
          </p>
          <p>
            For years, the work moved ahead wherever it could. A site went
            forward when a parks department said yes, when a marina allowed a
            cage, when there was a way in. For a young program proving the
            idea, that was the right call. It gave Billion Oyster Project a
            decade of small reefs and real evidence of what survives where.
          </p>
          <p>
            A billion oysters is a different kind of problem. Billion Oyster
            Project now has 78{' '}
            <GlossaryTerm termId="candidate-site">
              candidate restoration sites
            </GlossaryTerm>
            , and needs ten to fifteen of them funded, permitted, and ready to
            build by 2029 or 2030. Studying every site halfway just to rule
            most of them out would burn money the program can&apos;t spare. The
            real question is the whole-harbor one: out of 78, where do you
            begin?
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
            Answering that question is the work Billion Oyster Project and
            Natrx took on together. They did it the harder way, the responsible
            way. Here is how.
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
