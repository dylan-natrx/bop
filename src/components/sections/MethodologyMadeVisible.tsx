import { SectionShell } from './SectionShell'
import { MethodologyWalkthrough } from '@/components/methodology/MethodologyWalkthrough'
import { TopRankedCallout } from './TopRankedCallout'
import { Pullquote } from './Pullquote'
import { GlossaryTerm } from '@/components/ui/GlossaryTerm'

export function MethodologyMadeVisible() {
  return (
    <SectionShell id="methodology" eyebrow="The methodology, made visible">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <h2 className="
            col-span-1 lg:col-span-12
            font-serif font-light text-ivory leading-[1.05]
            text-4xl sm:text-5xl lg:text-6xl
            max-w-[22ch]
          ">
          How a framework finds the sites that earn the next dollar.
        </h2>

        <div className="
            col-span-1 lg:col-span-8 lg:col-start-3
            mt-2
            font-sans text-body text-ivory-dim font-light leading-[1.65]
          ">
          <p>
            There is an easy way to choose where to build and a right way. The
            easy way is one formula for the whole harbor, the same numbers
            everywhere, and a hope that nature plays along. Nature rarely does.
            Oysters live where the math says they shouldn&apos;t, and a healthy
            harbor changes from one year to the next. So the work went the
            harder way, the one that leaves room for the people who know these
            waters and for the fact that nature keeps surprising us. It takes
            longer. It holds up better.
          </p>
          <p className="mt-6">
            Over twenty-six weeks, Natrx and Billion Oyster Project built this
            together. They worked through more than thirty datasets. They sat
            down with BOP&apos;s science team across four working sessions. And
            they used{' '}
            <GlossaryTerm termId="natrx-assess">
              <em className="font-serif italic text-white">Natrx Assess</em>
            </GlossaryTerm>{' '}
            to build two new layers of data the public record doesn&apos;t have.
          </p>
          <p className="mt-6">
            The framework asks two questions, in order. First: where can
            oysters actually thrive? That comes down to three things about the
            water, measured at all 78 sites. Second: what does the rest of each
            place add or take away? How rough the water is, whether the shore
            is washing away, what the permitting looks like, how well a site
            fits the mission. The walkthrough below goes in the order the work
            was done, biology first, then everything around it. Underneath, it
            asks one plain question: where can the living harbor and the things
            we build help each other along?
          </p>
          <p className="mt-6">
            One note on the site score: it compares these 78 places against
            each other, not against the harbor as a whole. A higher score means
            a stronger mix of salt, food, and oxygen for oysters. A 0.90 beats
            a 0.10. Neither one promises, on its own, that oysters will flourish
            there. The score&apos;s job is to point BOP toward where to look
            first.
          </p>
        </div>
      </div>

      {/* Pullquote between intro and walkthrough */}
      <div className="mt-16 lg:mt-20">
        <Pullquote
          attribution="Mike McCann"
          role="Director of Science and Research, Billion Oyster Project"
        >
          What we have now is a ranking and a confidence layer attached to
          every site. That&apos;s where the science comes in. We&apos;re
          never certain. But knowing where we&apos;re confident and where
          we&apos;re not is exactly what we want when we&apos;re making
          these decisions.
        </Pullquote>
      </div>

      {/* Map 2 + spectra panel — the six-step guided sequence */}
      <div className="mt-16 lg:mt-20">
        <MethodologyWalkthrough />
      </div>

      {/* Top-ranked sites callouts — three editorial cards nested inside the section */}
      <div className="mt-20 lg:mt-28">
        <div className="font-mono text-eyebrow uppercase tracking-[0.22em] text-ivory-faint mb-6">
          What the ranking surfaces
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <TopRankedCallout
            name="Arthur Kill"
            meta="Rank 1 · Score 0.87 · Staten Island, Upper Harbor"
            siteIds={['27']}
            body={
              <>
                The strongest site in the whole study sits on the industrial
                west shore of Staten Island, a stretch of water that spent the
                twentieth century as a byword for pollution. Today it holds the
                best mix of salt, food, and oxygen for oysters anywhere among
                the 78 sites. The water has quietly come back.
              </>
            }
          />
          <TopRankedCallout
            name="Living Breakwaters cluster"
            meta="Ranks 2–7 · Scores 0.79 to 0.74 · Raritan Bay"
            siteIds={['36', '37', '38', '40', '41', '42']}
            body={
              <>
                Six spots inside the Living Breakwaters system, the
                SCAPE-designed seawall-and-reef project off Tottenville, take
                second through seventh place. The water around Living
                Breakwaters is some of the best in the harbor for adding more
                reef. The ranking lands on a place the harbor already chose to
                protect.
              </>
            }
          />
          <TopRankedCallout
            name="Wolfe's Pond"
            meta="Rank 8 · Score 0.65 · Raritan Bay"
            siteIds={['30']}
            body={
              <>
                Wolfe&apos;s Pond Park is public Staten Island parkland, open
                to anyone. It scores well on every measure of the water, and
                the building conditions there are workable. A strong site that
                people can actually visit and watch come back to life.
              </>
            }
          />
        </div>
      </div>
    </SectionShell>
  )
}
