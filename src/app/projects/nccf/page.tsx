import Texture from './components/Texture'
import Masthead from './components/Masthead'
import BeatRail from './components/BeatRail'
import Glossary from './components/Glossary'
import RevealObserver from './components/RevealObserver'

/**
 * The Vanishing Edge — ported from
 * docs/nccf/reference/vanishing-edge-reference.html (design and copy of
 * record; every number traces to docs/nccf/CLAIMS.md). Copy is verbatim.
 * Figure slots (#heroArt, #figCoast, #dec, #ladder, #figTwo, .photo) are
 * empty containers until Phase 7 wires the figure components in.
 *
 * The <noscript> style is not in the reference (a standalone file that
 * always ran its script): it makes the reveal-choreographed copy visible
 * when JavaScript is off, so the page still reads as an article.
 */
export default function NccfPage() {
  return (
    <>
      <noscript>
        <style>{`.rv{opacity:1!important;transform:none!important}.dec i{transform:scaleY(1)!important}`}</style>
      </noscript>
      <Texture />
      <Masthead />
      <BeatRail />
      <RevealObserver />

      <section id="b1">
        <div id="heroArt" />
        <div className="sheet">
          <div className="mono kick rv">North Carolina &middot; 2,900 miles of shoreline &middot; 2012&ndash;2022</div>
          <h1 className="rv d1">
            North Carolina&#39;s coast is vanishing in a few places. That makes the problem fixable.
          </h1>
          <p className="deck rv d2" style={{ marginTop: 34 }}>
            Everyone who lives on the sounds knows the water is taking land. Until now nobody could
            say exactly where it was worst. A new measurement covering 2,900 miles of shoreline
            found that the fastest-eroding tenth of it accounts for almost half of everything lost.
            Fix those places first and the same money protects far more ground.
          </p>
          <div className="byline mono rv d3">
            <span>Produced by Natrx with the North Carolina Coastal Federation</span>
            <span>8 min read</span>
          </div>
        </div>
      </section>

      <section id="b2">
        <div className="sheet">
          <div className="col">
            <div className="mono kick rv">The problem</div>
            <h2 className="rv d1">Everybody knew. Nobody could prove where.</h2>
            <p className="rv d2">
              Jacob Boyd runs the salt marsh program at the North Carolina Coastal Federation and
              has lived in the eastern part of the state his whole life. He describes shoreline in
              Hyde County that has simply gone, and stands of dead trees with marsh moving in
              behind them.
            </p>
            <p className="rv d3">
              Seeing the problem was never the hard part. Proving it was. Grant money and permits
              go to projects that can show evidence, and evidence means measurements. Getting those
              used to mean driving to a site and surveying it. That works for three sites. It does
              not work for a coastline.
            </p>
          </div>
          <div className="figure rv" id="figCoast" />
          <div className="cap mono">
            Every point measured, drawn in two plates. The darker plate marks the fastest retreat.
            93,418 points, sampled here for display.
          </div>
          <div className="stats rv">
            <div>
              <div className="v">93,418</div>
              <div className="k mono">
                points
                <br />
                measured
              </div>
            </div>
            <div>
              <div className="v">2,900</div>
              <div className="k mono">
                miles of
                <br />
                shoreline
              </div>
            </div>
            <div>
              <div className="v">10</div>
              <div className="k mono">
                years, five sets
                <br />
                of photographs
              </div>
            </div>
            <div>
              <div className="v t">46</div>
              <div className="k mono">
                feet lost in one year
                <br />
                at the worst point
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="b3">
        <div className="sheet">
          <div className="col">
            <div className="mono kick rv">The finding</div>
            <h2 className="rv d1">The loss is lopsided</h2>
            <p className="rv d2">
              Most of the North Carolina coast is losing ground slowly, a few inches a year. Sort
              every eroding point from fastest to slowest, though, and take the top tenth.
            </p>
          </div>
          <div className="bignum rv d3">
            43.5<small>%</small>
          </div>
          <div className="col">
            <p className="rv" style={{ marginTop: 8 }}>
              of all the land lost came from that tenth.
            </p>
            <p className="rv">
              At the worst single point, near Navy Shell, the shoreline pulled back almost 46 feet
              in one year. Dare County is the hardest hit overall. Hyde County is close behind.
            </p>
            <p className="rv">
              The lopsidedness is the useful part. A fixed budget spent in the right tenth protects
              far more land than the same budget spread evenly along the coast.
            </p>
          </div>
          <div className="dec rv" id="dec" />
          <div className="decax mono">
            <span style={{ color: 'var(--tint)' }}>Fastest tenth</span>
            <span>Slowest tenth</span>
          </div>
          <div className="ladder rv" id="ladder" />
          <div className="cap mono">Fastest single measurement at each surveyed site, in feet per year.</div>
        </div>
      </section>

      <section id="b4">
        <div className="sheet">
          <div className="col">
            <div className="mono kick rv">The method</div>
            <h2 className="rv d1">How you measure a coastline without walking it</h2>
            <p className="rv d2">Two passes. One cheap and wide, one expensive and precise.</p>
            <p className="rv d3">
              The wide pass uses satellite images to sort every pixel of the region into marsh or
              not marsh, in two different years, then subtracts one from the other. It is fast
              enough to cover a whole coast and rough enough that it cannot give you a rate.
            </p>
            <p className="rv d4">
              The precise pass draws measuring lines out to the edge of the marsh grass in aerial
              photographs and calculates how far that edge moved, in feet per year. It is accurate
              and it is slow.
            </p>
            <p className="rv">
              The wide pass is not a prediction. It explains under four percent of the variation in
              how fast a shoreline actually retreats, and the team says so plainly. What it does
              well is point. It says which stretches deserve the expensive measurement, which is
              the difference between surveying a coastline and surveying the parts of it that
              matter.
            </p>
          </div>
          <div className="figure rv" id="figTwo" />
          <div className="cap mono">
            The wide pass covers everything. The precise measurement runs only where it flags.
          </div>
        </div>
      </section>

      <section id="b5" style={{ paddingBottom: 0 }}>
        <div className="sheet">
          <div className="col">
            <div className="mono kick rv">The payoff</div>
            <h2 className="rv d1">Better measurements mean smaller, cheaper projects</h2>
            <p className="rv d2">
              A living shoreline is a low structure of stone or oyster shell built just offshore.
              It takes the energy out of waves before they reach the marsh. How big it has to be
              depends on how much energy is actually hitting that particular spot.
            </p>
            <p className="rv d3">
              Without measurements, the safe choice is to build to whatever the permit allows. With
              them, the structure can match the site. Less stone, fewer trucks, lower cost, same
              protection.
            </p>
          </div>
          <div className="photo rv" />
        </div>
        <div className="pull rv">
          <blockquote>
            There are some sites where historically people have just built up to{' '}
            <em>what the permit would say,</em> even though it may not actually call for that.
          </blockquote>
          <div className="attr mono">
            Jacob Boyd &middot; Salt Marsh Program Director, North Carolina Coastal Federation
          </div>
        </div>
        <div className="sheet" style={{ paddingTop: '12vh' }}>
          <div className="col">
            <p className="rv">
              That change is slow. As Boyd puts it, people are used to doing things the way they
              are used to doing them.
            </p>
          </div>
        </div>
      </section>

      <section id="b6">
        <div className="sheet">
          <div className="col">
            <div className="mono kick rv">What happens now</div>
            <h2 className="rv d1">Six hundred acres, and a permit application</h2>
            <p className="rv d2">
              The Coastal Federation is taking the ranked list into permitting conversations with
              state and federal agencies. Applications are targeted within about six months,
              construction inside two years. The program aims to protect up to 600 acres of marsh.
            </p>
            <p className="rv d3">
              That target is also the point of the federal grant paying for the work. Marsh soil
              holds carbon, and marsh that erodes into open water releases it. Keeping the marsh
              keeps the carbon in the ground.
            </p>
            <p className="rv d4">
              The datasets and the mapping tool go public on the Federation&#39;s website this
              fall. Anyone will be able to look up their own stretch of shoreline.
            </p>
          </div>
          <footer>
            <div className="cred">
              <div>
                <div className="k mono">Analysis</div>
                <div>
                  Natrx
                  <br />
                  <em style={{ color: 'inherit' }}>Natrx Assess</em>
                </div>
              </div>
              <div>
                <div className="k mono">Partner</div>
                <div>
                  North Carolina
                  <br />
                  Coastal Federation
                </div>
              </div>
              <div>
                <div className="k mono">Period</div>
                <div>
                  2012 to 2022
                  <br />
                  Five image dates
                </div>
              </div>
              <div>
                <div className="k mono">Press</div>
                <div>dylan@natrx.io</div>
              </div>
            </div>
          </footer>
        </div>
      </section>

      <Glossary />
    </>
  )
}
