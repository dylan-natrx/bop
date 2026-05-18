# Issues and Solutions

Running log of gotchas. Newest first. The 2026-05-12 map-basemap-rebuild session and the 2026-05-11 Mapbox rebuild session entries are the high-value ones; the older items from the SVG-era hero are kept for reference.

---

## 2026-05-18 — post-launch editorial polish

### Natrx Assess as a glossary entry with product-name styling

**Context:** Natrx Assess shows up five times in the body copy (§ 3 intro, § 4 Beat 1, § 5 closing graf, walkthrough steps 4 and 5). The earlier convention — "italicize on first reference per section, then drop to roman" — read fine in any single section but made the named product feel inconsistent across the page. The brief tightened: every body-text occurrence should render in serif italic + pure white, and the first encounter on the page should link to a glossary definition so readers can ground the term immediately.

**Resolution (three coordinated changes):**

1. **Glossary entry with `productName: true`.** New `Natrx Assess` entry in [glossary-data.ts](../src/components/chrome/glossary-data.ts), alphabetically between NAIP imagery and Natural breakwater. The `GlossaryEntry` interface gains an optional `productName?: boolean` flag. `GlossaryPanel` reads the flag and renders the `<dt>` in `font-serif italic font-medium` instead of the default `font-light` — italic preserves the product-name convention from the body copy, medium weight preserves the glossary's heavier-term convention. Default entries are unaffected.

2. **First-encounter `<GlossaryTerm>` wrap.** The § 3 intro's `<em className="font-serif italic text-white">Natrx Assess</em>` is wrapped in `<GlossaryTerm termId="natrx-assess">`. `GlossaryTerm` uses `color: inherit` on its inline button, so the nested `<em>` keeps its own white color while inheriting the dotted-underline affordance. Other body-text occurrences carry the same styling but no link — the inline glossary affordance reads as an introduction, not a recurring footnote.

3. **Walkthrough step titles widened to ReactNode.** `StepConfig.title` was typed as `string`; step 4 and step 5 titles needed to render *Natrx Assess* italic + white inline. Widened to `ReactNode` so the configs can carry JSX fragments like `<>Wave exposure, from <Em>Natrx Assess</Em></>`. Both `MethodologyWalkthrough` (`motion.h3`) and `WalkthroughControls` (mobile dropdown menu) already rendered `{step.title}` and accept ReactNode without further change. The local `Em` component in `steps.tsx` adds `text-white` so titles match the body styling.

**Editorial chrome rule (locked):** body-text Natrx Assess = `<em className="font-serif italic text-white">…</em>`; first-encounter wrap = `<GlossaryTerm termId="natrx-assess">…</GlossaryTerm>` around the `<em>`; figure captions are not styled (chrome, not body voice). Commit `bfb0a25`.

### § 2 expanded; § 5 reshaped around the EIS detail

**§ 2 (commits f893b0c → c960ea5 → 756cde1):** the section grew from a tight two-paragraph block to a four-paragraph body that restores the harbor's pre-collapse condition (350 sq mi reef, 15-foot visibility, food web that fed the eastern seaboard) and lands the 10–15 funded sites by 2029–2030 target. A Carolyn Khoury pullquote sits between paragraphs 3 and 4 ("we've moved from considering each restoration site individually to understanding what the whole system needs to support a self-sustaining population"). Paragraph 3 carries an inline `<GlossaryTerm termId="candidate-site">` on "candidate restoration sites" — first inline glossary usage on the page. The opening of paragraph 2 dropped "For four hundred years," and shifted to present perfect ("restoration in the harbor has happened opportunistically") because the four-hundred-year framing read as journalistic flourish in a paragraph that's actually about BOP's recent operating posture, not history.

**§ 5 (commit 756cde1):** the Operational beat tightened to one sentence. The Institutional beat expanded to six sentences and absorbed the NY State Environmental Impact Statement detail — the EIS is scheduled to conclude by end of 2028 and, once complete, streamlines permitting for individual sites; the framework's analysis feeds directly into it. The Mission beat dropped "ten" so the language reads as "parallel pipeline" rather than naming a count we'd repeat in the next paragraph. Lise Montefiore's pullquote was replaced with new water-quality copy ("Water quality data in a harbor like this is complex. Our work was to extract it from many monitoring stations and turn it into something BOP could make decisions from."); her role was sharpened from "Data Scientist" to "Water Quality and Data Scientist, Natrx"; credential simplified to PhD (dropped MS). The closing portability paragraph opens to "restoration practitioners at every scale" so the audience reads as field-wide, not exclusive to institutional planners.

### Press contact rebuilt as two side-by-side cards

**Symptom:** the original press panel stacked Dylan DiBona at the top and a "Source materials" line below. With Andi Cross added as the BOP-side press contact, stacking made the two contacts feel ranked, with Dylan above and BOP below — exactly the inverse of the editorial reading we wanted ("equal partners").

**Resolution (commits c960ea5 → dd2a795):** the panel became a 2-column md+ grid (`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-8`). Each card has an org-named eyebrow that links to the org site (Billion Oyster Project → https://www.bop.nyc/, Natrx → https://natrx.io), the contact's name in Fraunces, the role, and a teal-aqua mono link to phone or email. The "Source materials" copy was dropped — at v1 it doubles the page's editorial-outreach framing without adding affordance. The footer logos were paired with `<a target="_blank">` wrappers linking to natrx.io and billionoysterproject.org so the partnership lockup behaves as a navigational element, not just a credit line.

---

## 2026-05-14 (late) — map storytelling rebuild + custom domain launch

### Map narrowing model collided with the data; rebuilt as overlay system

**Symptom:** At step 6, the priority set went dark. Arthur Kill (rank 1) faded. Most of the top-10 faded. What stayed bright was a cluster above Queens — sites ranked 11–22.

**Root cause:** I had wave / CSO / MS4 filtering sites OUT of the priority set ("every step narrows"). The data: every top-ten site has `NearWave='Yes'`. Arthur Kill also has `NearMS4='Yes'`. So filtering on those flags eliminated the priority set entirely. What remained bright was the suitable-but-not-priority subset — the opposite of what the framework actually recommends.

**Resolution (the editorial spine):**
> The framework's complete recommendation isn't just "top-10 by biology." It's "top-10 by biology, with full cost/permitting/co-benefit context attached."

Steps 1–3 narrow by biology score. Steps 4–6 layer context on the surviving set — they never filter. Wave / CSO / MS4 are friction flags (added cost or permitting overhead). Erosion / parkland are positive co-benefit flags. Arthur Kill ends step 6 still bright with a stack of flag markers, exactly because that's what the framework actually says about it.

**Implementation:**
- Replaced `isFilteredOut` semantics with `computeFlags` returning `_costFlag` / `_coBenefit` per site per step. Flags never affect `_visible`.
- Two new map layers (`cost-flag-ring` amber, `cobenefit-ring` teal) overlay on bright sites. Same `_visible` filter so faded sites never carry rings.

**File:** [src/components/methodology/WalkthroughMap.tsx](../src/components/methodology/WalkthroughMap.tsx)

### Priority reveal at step 6 with pulsing halo

**Context:** Even after the overlay rebuild, the user pointed out that the bright suitable cluster above Queens still read as priority. Suitable ≠ priority. The framework's 22 suitable sites include both the 10 priority projects and 12 reserve sites.

**Resolution:** Added a `_isPriority` 0/1 prop that's true only when `Rank ≤ 10 AND step.id === 6 AND _visible === 1`. New `priority-halo` map layer renders soft teal-aqua outer ring at +8.5px radius, ONLY at step 6. The list is technically determined at step 3 (the ranking locks there), but the halo appears only at step 6 because that's when the recommendation is COMPLETE — biology gated, external context layered on. The reveal lands as synthesis ("emerge inside the suitable set"), not invention ("the framework discovers these at step 6").

A `requestAnimationFrame` loop adds a subtle continuous pulse at step 6 only — sine wave, 3s period, radius oscillating +8.5 → +14, opacity 0.30 → 0.80 in lockstep. Cleanup resets to base state on step change. Built-in Mapbox transitions dropped from the `priority-halo` layer so they don't fight the per-frame `setPaintProperty` calls.

**Vocabulary locked across the page:**
- **Candidate sites** = original 78
- **Suitable site** = bright dot, passed biology gate (22 sites)
- **Priority project** = top-10 by composite (top of suitable set, revealed at step 6 with halo)
- **Reserve** = suitable but not in top-10 (12 sites)

### Spectra panel two-color treatment for biology vs external

Items added at steps 1–3 (biology — salinity, chlorophyll-a, dissolved oxygen) wear teal accents. Items added at steps 4–6 (external — wave, erosion annotation, context filters annotation) wear warm amber accents (`#D9B47A`). The reader sees the panel shift from all-teal to mixed teal-and-amber when the walkthrough turns at step 4, reinforcing the structural pivot the body copy is already naming.

Implementation: `dimension: 'biology' | 'external'` tag on each StackItem, derived from `addedAtStep` (≤3 = biology, ≥4 = external). Threaded through CurvePlot and AnnotationBlock to drive border / line / threshold-label colors. Favorable-zone shading stays teal-aqua at low opacity across all curves (positive habitat range is dimension-agnostic).

**File:** [src/components/methodology/SpectraPanel.tsx](../src/components/methodology/SpectraPanel.tsx)

### Legend evolved from card to horizontal strip

**First attempt:** stacked card in the bottom-right corner of the map. ~140px tall footprint, ate vertical map real estate at steps 4–6 when the entry list grew.

**Resolution:** Horizontal single-row strip pinned to the bottom edge of the map. ~28px tall, full-width, backdrop-blur, terse labels (dropped parentheticals — body copy below names which flags fold into each ring). Bottom edge of the visible map is open Atlantic in this view so the strip doesn't cover sites or coastlines. Framer Motion `layout` animation smooths the strip's resize as entries fade in.

At step 6 the strip grows to include a 5th entry — `Priority project` (haloed symbol) — distinct from `Suitable site` (bright unfilled).

**File:** [src/components/methodology/WalkthroughMapLegend.tsx](../src/components/methodology/WalkthroughMapLegend.tsx)

### Mobile hamburger nav for SectionNav

The mobile presentation of SectionNav was just a non-interactive counter ("3 / 5") that named the active section but didn't navigate. Replaced with a hamburger button that opens a dropdown menu of all five section links with the current one highlighted, plus Prev/Next-equivalent affordances. Same pattern as the methodology walkthrough's mobile pill+menu — single component, both presentations, breakpoint-toggled visibility. Hamburger icon morphs to X via Framer Motion when open.

**File:** [src/components/layout/SectionNav.tsx](../src/components/layout/SectionNav.tsx)

### Custom domain `bop.natrx.report`

**Setup that worked:**
1. Vercel project → Settings → Domains → add `bop.natrx.report`. Vercel issues a per-domain CNAME target (e.g. `38f2819e7422b20a.vercel-dns-017.com`).
2. Cloudflare DNS → CNAME record `bop` → that target, **DNS only (grey cloud)**.
3. Wait for delegation propagation.

**Code changes paired with the launch:**
- `metadataBase: new URL('https://bop.natrx.report')` in `app/layout.tsx`. Without it, Next.js falls back to `http://localhost:3000` when resolving absolute URLs (OG image, Twitter card) and emits a build warning. External scrapers would have rendered a broken image URL on the new host.
- Mapbox token: verified URL restrictions allow the new domain (token is currently unrestricted, so no action needed).

### Two-step nameserver setup, easy to confuse

**Symptom:** User shared a screenshot of Cloudflare's DNS panel showing the assigned nameservers (`major.ns.cloudflare.com`, `tess.ns.cloudflare.com`) and said "nameservers are already set." But `dig +short NS natrx.report @8.8.8.8` returned empty — meaning the public TLD didn't know about Cloudflare yet.

**Root cause:** Cloudflare's dashboard shows the nameservers IT has ASSIGNED to the zone. Those values must also be set at the registrar (wherever the domain was purchased) for the TLD registry to delegate queries to Cloudflare. Two different places; the Cloudflare dashboard's "Cloudflare Nameservers" section is informational, not active.

**Resolution:** User went to the registrar, set the NS records to `major.ns.cloudflare.com` + `tess.ns.cloudflare.com`. Propagation landed within ~10 minutes. `dig +short NS natrx.report @8.8.8.8` then returned the Cloudflare names; CNAME chain resolved through to Vercel; cert issued automatically.

**Diagnostic pattern for next time:**
```bash
# Did the registrar delegation propagate?
dig +short NS natrx.report @8.8.8.8

# What does Cloudflare's NS think it should resolve?
dig +short @major.ns.cloudflare.com bop.natrx.report

# What does the public resolver think?
dig +short bop.natrx.report @8.8.8.8
```

If query 2 succeeds but queries 1 and 3 are empty, the issue is registrar delegation, not Cloudflare configuration.

---

## 2026-05-14 — password gate + walkthrough header + editorial spine

### Password gate is silently ignored at project root when using src/ layout

**Symptom:** Built and pushed `middleware.ts` at the project root with a redirect-to-`/login` handler for unauthenticated requests. Browser hit production and got `HTTP/2 200` on `/` — the prerendered home page — instead of the expected `307` redirect to `/login`. No error in the build output. The `/login` and `/api/auth/login` routes were both deployed and reachable.

**Root cause:** Project uses the `src/` directory layout (`src/app/`). Next.js looks for middleware at **`src/middleware.ts`** when `src/` is the source root, not at the project root. The root-level file was silently ignored — Next.js doesn't warn when it finds a `middleware.ts` outside the expected location.

**Fix:** `git mv middleware.ts src/middleware.ts` and rebuild. The build output then includes `ƒ Middleware 34.2 kB`, confirming registration. The middleware is the single source of truth for whether it's actually wired: if that line is missing from the build summary, the middleware isn't running. Always check.

**File:** [src/middleware.ts](../src/middleware.ts)

### Vercel Deployment Protection masks custom middleware

**Symptom:** Before the middleware-location fix above, while testing the password gate, the URL returned `HTTP/2 401` with a `_vercel_sso_nonce` cookie. As project owner I passed through silently and never saw my own gate. From an incognito window I got Vercel's generic SSO login page, not the BOP × Natrx branded one.

**Root cause:** Vercel Deployment Protection ("Vercel Authentication") is on by default for personal projects. It intercepts every request **before** custom middleware runs and forces SSO authentication via the Vercel team. Two gates fighting each other — but Vercel's wins because it's at the platform layer.

**Fix:** Disable Vercel Deployment Protection on the project at `vercel.com/dylan-natrx/bop/settings/deployment-protection`. Set **Vercel Authentication** to **Disabled** for Production. Preview environments can stay protected if desired. Change takes effect instantly, no redeploy needed.

**Trade-off:** custom middleware-based gate gives BOP × Natrx branding, a shared credential model, and an easy-remove path. Vercel's built-in protection gives zero-code platform-level auth but ties access to Vercel team membership and renders a Vercel-branded login page. For a journalist-facing preview, the custom gate is the right call.

### Editorial spine for the methodology section

**Context:** Across multiple revisions the methodology walkthrough never read cleanly because three different visual operations (recoloring, filtering, positive overlay) were happening at different steps without a unifying frame. The user's instinct — "every step narrows from 78 to ~10" — collided with the data: every top-ten site (Arthur Kill, Living Breakwaters cluster, Wolfe's Pond, Conch Basin) carries `NearWave='Yes'`, and Arthur Kill also carries `NearMS4='Yes'`. Hard-narrowing on those flags eliminated the priority set the framework actually points to.

**Resolution (editorial spine, locked):**

> The framework asks two questions in order. First, where can oysters thrive? Biology — three water-quality variables scored across all 78 candidates. Second, what do the surrounding conditions add or subtract? Wave energy, shoreline change, permitting context, mission fit. Mixing both dimensions, calibrated to one place, is the framework's contribution. Biology gates the ranking; external factors describe what it takes to build the surviving sites.

**Operational consequence for the map:** steps 1–3 narrow by suitability score. Steps 4–6 do NOT narrow — they layer flag markers on the surviving priority set. Wave / CSO / MS4 are friction flags (added cost or permitting overhead). Erosion is a positive flag (co-benefit). Park is a positive flag (mission fit). Arthur Kill ends step 6 still bright, with multiple flag markers attached, exactly because that's what the framework actually says about it: the strongest biology in the pipeline with known engineering and permitting costs to be planned for.

**Companion thesis** (woven into §3 intro and §5 closing): the project's deeper question is where the natural world and the built one strengthen each other in one specific place. The methodology is a way of asking that question rigorously.

### Walkthrough controls header relocation + mobile pill+menu

**Symptom:** Step nav lived in the bottom strip of the walkthrough. On short viewports the bottom strip was the first thing to clip — you couldn't reach Next without scrolling. On mobile the flat row (counter + dots + Prev/Next) wrapped awkwardly, often leaving "Step N / 6" alone on its own line with no controls visible.

**Fix:** Promoted controls into the walkthrough header inline with the step title. The standalone "STEP N OF 6" eyebrow disappears because the inline counter inside the controls does the same job. On mobile, the flat row is replaced by a compact pill (`3 / 6 ▾`) that opens a popover menu listing all six step titles with the current step highlighted, plus Prev/Next at the bottom. Tap a step → jump + close. Tap outside / Escape → close.

**Implementation:** Single `WalkthroughControls` component renders both presentations from the same state. Desktop uses `hidden lg:flex` flat row; mobile uses `flex lg:hidden` pill + Framer Motion AnimatePresence popover. The mobile menu doubles as a table of contents for the walkthrough.

**File:** [src/components/methodology/WalkthroughControls.tsx](../src/components/methodology/WalkthroughControls.tsx), [src/components/methodology/MethodologyWalkthrough.tsx](../src/components/methodology/MethodologyWalkthrough.tsx)

### Pullquote pattern — count is intentional

Two visible pullquotes on the page:
- §3 (Mike McCann, Director of Science and Research, BOP) between intro and walkthrough — on the confidence-layer framing.
- §5 (Lise Montefiore, PhD, MS, Data Scientist, Natrx) between the three operational beats and the closing portability paragraph — "What we did is a small piece of the big work BOP is doing to restore the harbor."

Earlier iterations had a McCann quote in both §3 and §4. We collapsed to one McCann quote (§3) because two from the same speaker started to feel imbalanced. **Lesson:** when two quotes exist from the same source, pick the one that does the most editorial work for the section it's in, not the one that "fits." Placement matters more than the quote itself.

A third pullquote slot is reserved in §2 below paragraph 2 (HTML comment placeholder) for an additional interview voice if one lands.

### Press contact email updated

`dylan@mondayandpartners.com` → `dylan@natrx.io`. Replaced in both the login page footer and the drawer's press contact panel. Name "Dylan DiBona" added on the login page above the email to match the drawer panel treatment.

---

## 2026-05-12 (late) — editorial second pass

### Pullquote component added; two on the page

**Context:** Live editorial review surfaced a need for interview quotes inside the page flow — partnership voices doing the kind of work that body copy can't do (institutional confidence, scale of the alternative). Built a single reusable component and placed two instances.

**Component:** [src/components/sections/Pullquote.tsx](../src/components/sections/Pullquote.tsx). Treatment: Fraunces italic body at section-subhead scale, JetBrains Mono uppercase attribution + role separated by a middle dot (`·`), left vertical rule in teal-bright (`border-l-2`), `max-w-[60ch]` centered. Reads as a quoted aside; not a section heading. Props: `children` (quote body), `attribution`, optional `role`, optional `className`.

**Placements:**
- **§ 3, between intro and walkthrough:** Mike McCann (Director of Science and Research, Billion Oyster Project) on the confidence layer — "What we have now is a ranking and a confidence layer attached to every site. … Knowing where we're confident and where we're not is exactly what we want when we're making these decisions." Names the editorial through-line of the page before the reader steps through how the framework was built.
- **§ 5, between the three operational beats and the closing portability paragraph:** Lise Montefiore, PhD, MS (Data Scientist, Natrx) — "What we did is a small piece of the big work BOP is doing to restore the harbor. The goal itself is impressive." Hinges from "what this means for BOP" to "what carries forward to the broader field."

A future pullquote slot is reserved in § 2 below paragraph 2 (marked with an HTML comment) for an additional interview voice if one lands before publication.

### § 2 paragraph 2: four-hundred-year framing folded in

Replaced paragraph 2 to name the pre-comparative era directly: "For four hundred years, restoration in the harbor happened opportunistically. Sites moved forward when a parks department said yes, when a marina allowed a cage, when access was available." Lands on the same scale point as the previous draft.

### § 3 intro rewrite

Opens on the partnership ("Natrx and Billion Oyster Project built the methodology together") and lands on a new framing: "the first harbor-wide comparative look at all 78 candidate sites at once, calibrated to the specific ecology and geography of New York Harbor." Dataset / workshop / data-product counts retained verbatim. Walkthrough sequence sentence retained verbatim.

### § 4 Beat 2 reframed as a data-investment map

**Old subhead:** "Where the data is strong, and where it is not."
**New subhead:** "A map of where to invest in more data next."

Body rewritten to lead on the unevenness of observational coverage, name what each confidence level actually means (high-confidence inputs at advanced design sites; less observational support at newly-ranked candidates), and close on the practical output — knowing exactly where to send water quality loggers, field validation, and additional sampling. The framework doesn't just rank; it surfaces the highest-value targets for the next investment in observation. The italic closing thread at the bottom of § 4 is untouched.

### § 5 full restructure into Operational / Institutional / Mission

**Eyebrow:** WHAT THIS ENABLES → WHAT THIS UNLOCKS.
**Headline:** "The methodology travels." → "The pipeline becomes operational."

Three nested beats, each with a teal-bright JetBrains Mono uppercase kicker and a single paragraph:
- **Operational** — BOP can move ten priority sites toward design and permitting in parallel, comparative ranking guiding the commit order.
- **Institutional** — agencies now see the whole pipeline (ranking + methodology + confidence per site); the conversation starts from documented, comparative analysis the agencies have not previously had.
- **Mission** — the 2035 one-billion-oyster target is operationally achievable for the first time.

Followed by the Lise Montefiore pullquote (hinge), then a rewritten closing paragraph that opens on the broader audience and lands on "what carries forward is the structure: comparative analysis across all candidate sites at once, with confidence levels disclosed, calibrated to the place."

**Section id stays `what-this-enables`** so existing anchors and the SectionNav "At scale" link don't break.

### Editorial process learnings worth carrying forward

- **Pullquote count is intentional.** We landed on two visible pullquotes (McCann in §3, Montefiore in §5) plus one reserved slot in §2. Earlier iterations had a McCann pullquote in §4 as well; we collapsed to one McCann quote — the confidence-layer framing — because two from the same speaker started to feel imbalanced. Lesson: when two quotes exist from the same source, pick the one that does the most editorial work for the section it's in, not the one that "fits."
- **Pullquote placement matters more than the quote itself.** McCann's confidence-layer quote works **between** §3 intro and walkthrough because it names what the reader is about to see being built. It would NOT work between Beat 1 and Beat 2 of §4 — by that point in the reader's journey the framing is already established and the quote becomes redundant.
- **Section eyebrow can carry editorial intent.** Renaming WHAT THIS ENABLES → WHAT THIS UNLOCKS was a small change with a real shift in tone — from "capability we offer" to "barrier we remove." Editorial eyebrows aren't just labels.
- **Credentials matter for journalist-facing pages.** Lise Montefiore's attribution went through three forms: "Lise Montefiore", then "Lise Montefiore, PhD", then "Lise Montefiore, PhD, MS." For a piece pitched to climate / infrastructure reporters, the credentials read as authority and should be present in any quote attribution where the speaker holds them.

---

## 2026-05-12 — v1 polish + map basemap rebuild

### Section copy: negation framing keeps creeping in

**Symptom:** Across multiple revision passes, body copy on the methodology spectra panel kept opening with negation: "Not suitability variables.", "Erosion is not a suitability variable.", "Constructability, not a habitat score." Each time, the user flagged the pattern and asked for a rewrite.

**Cause:** Definitions naturally drift into "what it isn't first" framing. The panel was originally written as a glossary of definitions rather than as a confident running summary of what the reader has just added at each step.

**Rule, now memorialized:** never open a reader-facing copy block with a negation. Lead with what the thing IS. Avoid abstract single-word jargon ("constructability") where a verb phrase explains what it does ("how buildable the site is"). Memory note: `memory/feedback_no_negation_jargon_copy.md`.

### "Continue reading" on walkthrough step 6 skipped §3 callouts

**Symptom:** On the methodology walkthrough's final step, the "Continue reading →" button scrolled to `#analysis-made-visible` (§4). That skipped the "What the ranking surfaces" Arthur Kill / Living Breakwaters / Wolfe's Pond callout cards, which sit inside §3 below the walkthrough.

**Fix:** dropped the affordance entirely. On step 6, the Next button is disabled (mirrors how Previous looks on step 1). Reader scrolls naturally past the walkthrough into the callouts. Removed the unused `continueReading` callback and prop chain through `WalkthroughControls`.

**File:** [src/components/methodology/WalkthroughControls.tsx](../src/components/methodology/WalkthroughControls.tsx), [MethodologyWalkthrough.tsx](../src/components/methodology/MethodologyWalkthrough.tsx)

### Land contrast was too low — land read as water

**Symptom:** Production map showed land filled, but the upper-left area "above New Jersey" looked empty. The user explicitly named this as a problem.

**Cause:** Land fill `#0E2236` was only 8/15/21 RGB above water bg `#061321`. Where polygon edges sat off-screen (upper Hudson Valley, far western mainland), the fill blended into water visually. Where polygon edges WERE visible (Staten Island, NJ Raritan Bay shore), the borough/coast outline made the land color readable by adjacency. So the issue only appeared in regions of the visible map far from any rendered edge.

**Fix:** bumped land fill from `#0E2236` to `#15314A` (the `bg-soft` palette token; brightness delta of 15/30/41 from water). Applied across all five Mapbox instances (HeroMap, WalkthroughMap, three SiteMiniMaps).

**Diagnosis path:** queryRenderedFeatures confirmed the polygons were rendering at the test points — Mapbox knew it was land, the user couldn't see it. Brightness ramp to a palette-approved token resolved without further iteration.

**File:** [src/components/hero/HeroMap.tsx](../src/components/hero/HeroMap.tsx), [methodology/WalkthroughMap.tsx](../src/components/methodology/WalkthroughMap.tsx), [sections/SiteMiniMap.tsx](../src/components/sections/SiteMiniMap.tsx)

### Hero figure margins asymmetric

**Symptom:** The user reported the right viewport margin around the hero figure looked smaller than the left. Visual confirmation: figure left edge at viewport x=212 px, right edge at viewport x=1692 (right margin 100 px). At a 1800 px viewport that's 212 vs 100.

**Cause:** Hero `<figure>` had `w-[95vw] max-w-[1480px] mx-auto`. Section parent had `max-w-scaffold mx-auto px-scaffold-x` (1480 cap with 56 px padding inside). The figure tried to be 1480 px wide inside a 1368 px parent content area. The browser absorbed the 112 px overflow with `margin-right: -112px` (only on the right), shifting the figure left of center.

**Fix:** removed `w-[95vw] max-w-[1480px] mx-auto` from the figure. It now occupies the section content area naturally (1368 px at large viewports), giving symmetric margins.

**File:** [src/components/hero/HeroFigure.tsx](../src/components/hero/HeroFigure.tsx)

### Coarse upstate polygon clip created visible wedge

**Symptom:** When we added a polygon to fill the empty area above NJ, a triangular wedge appeared poking into the visible map from the upper-right. The user identified it as a polygon edge artifact.

**Cause:** The original Connecticut polygon (from PublicaMundi) was 16 points. Its south-west corner near Long Island Sound was traced with three coarse vertices that created an angled triangle dipping into the visible map area around Greenwich / Stamford. At any reasonable zoom level the polygon's straight edges between widely-spaced vertices became visible as wedges.

**Initial fix:** upgraded to US Census 1:500k state boundaries — NY at 1119 points, CT at 283 points. Shorelines along LI Sound now trace smoothly.

**Lingering issue:** The clipped polygon still had a small Suffolk County Long Island sub-polygon (Eaton's Neck, where LI's north shore extends just past lat 40.95). That sliver rendered as a small mysterious island east of Brooklyn.

**Second fix:** dropped sub-polygons under 0.1 sq deg from the multipolygon, keeping only the mainland NY chunk.

### Long Island west edge had a visible vertical seam

**Symptom:** Where Queens met Nassau (eastern edge of NYC), a vertical line appeared in the landmass. Long Island east of Queens looked like a flat blob without a coastline.

**Cause:** The upstate polygon was clipped at lng −73.72 (rectangle edge) to exclude the NYC harbor area. NYC's eastern coastline (Queens–Nassau border, run through the Queens borough polygon) sits at the actual Queens-Nassau political boundary at lng −73.70. The two edges didn't align. The upstate polygon's edge stroke drew a visible straight vertical line where its rectangular clip wall met the NYC polygon's irregular coast.

**Also:** the upstate polygon had no edge stroke, so Long Island east of the seam had no visible coast outline — just a flat fill blob.

**Real fix (the OSM rebuild):** replaced the patchwork of NYC + NJ + Westchester + upstate-NY + CT with a single OSM-coastline-derived `region-land.geojson`. Same fidelity everywhere; no political-boundary seams. Edge stroke applied uniformly via `land-region-edge` so Long Island, Brooklyn, Queens, Nassau, Suffolk, Westchester, Rockland, CT, and NJ all carry the same outline treatment.

### Hudson River disappeared above north Manhattan

**Symptom:** South of Manhattan the Hudson reads as water (carved out by the harbor exclusion). North of Manhattan the river vanished into the land mass.

**Cause:** NJ, Westchester, and the new upstate polygon each trace their political boundary down the middle of the Hudson (state lines run through the river). They collectively paved the river. Even where NJ ended (lng −73.89 in the Yonkers region), Westchester's western edge started at lng −73.90 — the two abutted with only ~1km between them at certain latitudes.

**First attempt:** hand-traced a 13-point Hudson ribbon polygon as a water mask drawn on top. Worked but the polygon was crude — width changes were abrupt, the Tappan Zee bulge was in the wrong place, the river termination at the visible top edge looked unnatural.

**Real fix (the OSM rebuild):** fetched real Hudson River multipolygon relations from OSM (`natural=water` `water=river` with `waterway:name=Hudson River` plus the Tappan Zee relation and unnamed Hudson segments). Unioned into a single polygon, simplified to 0.0002°. ~55KB. Carves the river out cleanly at real coordinates with the actual Tappan Zee widening.

**File:** [public/data/hudson-river.geojson](../public/data/hudson-river.geojson)

### Dev server HMR gets stuck on geojson changes

**Symptom:** After editing a geojson file in `public/data/`, the dev server's map renders empty with `loaded: false`. No clear error in the console (the bursts of "Mapbox error [object Object]" are stale from previous failed states, not new). Even a hard reload doesn't recover.

**Diagnosis:** queryRenderedFeatures returns empty for all layers including known-good ones. `map.getSource('land-region')` returns undefined. The map style never finishes loading.

**Workaround:** `pkill -f "next" && sleep 2 && npm run dev`. After a fresh server restart with a cleared HMR state, the map loads correctly.

**Verification path when HMR is stuck:** `npm run build` is the authoritative source of truth. The production build is what matters; trust it over the dev preview when geojson files are in flux.

### OSM coastline data fetch + stitch (how the rebuild was done)

**Goal:** replace the patchwork of NYC boroughs + NJ shoreline + Westchester + upstate-NY-CT polygons with one geographically-accurate land source.

**Process:**
1. Fetch OSM coastline ways via Overpass for bbox `40.4,-74.4,41.5,-71.7`:
   ```
   [out:json][timeout:180];
   (way["natural"="coastline"](40.4,-74.4,41.5,-71.7););
   out geom qt;
   ```
   Returns 2,194 ways, ~10.6MB raw.
2. Stitch ways into chains: for each way, match its last node id to the first node id of another way. Each closed chain becomes an island polygon; each open chain is a coastline that exits the bbox.
3. The longest open chain (59,310 points) is the mainland coast: NJ shore through NYC harbor through Long Island Sound to east CT. Close it artificially along the bbox edges (top-right → top → top-left → bottom-left → start) to form a polygon.
4. The largest closed chain (41,697 points) is Long Island including Brooklyn / Queens / Nassau / Suffolk.
5. Other notable closed chains: Manhattan (3,736 pts), Staten Island (2,820 pts), various barrier islands.
6. Filter out tiny islands (area < 1e-5 sq deg).
7. Simplify with `shapely.simplify(0.0002, preserve_topology=True)` to ~22m on-ground tolerance.
8. Save as a single MultiPolygon FeatureCollection.

Final size: 132 polygons, ~614KB. Same fidelity everywhere.

**Why this works:** OSM coastline is the natural sea/ocean coast. It correctly carves out interior waters (East River separating Manhattan from Brooklyn/Queens, Harlem River separating Manhattan from Bronx, Jamaica Bay, Upper Bay, etc.) because those are tidally connected to the open ocean. It does NOT include inland rivers like the Hudson, which need a separate water mask.

### Hudson polygon construction from OSM

**Goal:** carve out the Hudson River as water.

**Process:**
1. Fetch all `natural=water` and `relation natural=water` in the Hudson valley bbox `40.85,-74.05,41.5,-73.7`:
   ```
   (way["natural"="water"](40.85,-74.05,41.5,-73.7);
    relation["natural"="water"](40.85,-74.05,41.5,-73.7););
   ```
2. Filter relations to:
   - `type=multipolygon`
   - `natural=water`
   - NOT `water=reservoir/pond/lake`
   - Bbox intersects the Hudson corridor
   - Name doesn't contain Hackensack / Reservoir / Lake / Pond
3. For each relation, stitch the `outer` member ways into closed rings (same stitching as coastlines but matching by coordinate equality not node id). Stitch `inner` rings too.
4. Build Polygon(outer_ring, holes=[inner_rings...]). Apply `buffer(0)` to fix any self-intersections.
5. Union all relation polygons via `shapely.ops.unary_union`.
6. Simplify with the same 0.0002° tolerance.

Final size: ~55KB. Covers the river from Spuyten Duyvil through the Tappan Zee up to the visible top.

### Custom analytics events with one-time-fire semantics

**Goal:** track section reach and top-ranked card visibility without flooding the dashboard with duplicate events per session.

**Pattern:** `useFireOnView` hook ([src/hooks/useFireOnView.ts](../src/hooks/useFireOnView.ts)). Takes a ref + callback. Creates an IntersectionObserver, fires the callback exactly once when the element first crosses the threshold, then disconnects.

**Key option:** `skipInitial: true` records the initial scroll position and refuses to fire while `window.scrollY === initialScrollY`. This avoids a flood of "section reached" events on first paint for elements that happen to be in the viewport before the user has scrolled.

**Where used:**
- `SectionViewTracker` — zero-height `<span>` rendered at the top of every `SectionShell`. Threshold 0.01 (basically "any pixel visible"). Fires `section_reached` with the section id.
- `TopRankedCallout` — threshold 0.6 (most of the card visible). Fires `top_ranked_viewed` with the site name.

**Why `SectionViewTracker` exists:** to keep `SectionShell` server-rendered. The tracker is a small client component child; SectionShell can stay a Server Component.

---

## 2026-05-11 — Mapbox rebuild session

### Mapbox CSS overrides container positioning (silent rendering failure)

**Symptom:** Map area renders empty, dark navy rectangle. No error in browser console. DOM inspection shows the `.mapboxgl-canvas` element exists with proper dimensions (e.g. 1084 × 300 px). Borough/water DOM labels and halo DOM markers all exist in the DOM with correct geographic transforms.

**Root cause:** `mapbox-gl/dist/mapbox-gl.css`, imported in the page bundle, defines `.mapboxgl-map { position: relative; overflow: hidden; ... }`. That stylesheet loads **after** Tailwind in the page bundle, so its `.mapboxgl-map` rules win the CSS specificity tie against Tailwind utility classes. Mapbox adds the `mapboxgl-map` class to the container div on init. The container's `absolute inset-0` (Tailwind) gets turned into `position: relative` with inset offsets that have no effect, and the div collapses to content height = 0. The canvas inside is itself absolutely positioned by Mapbox so it doesn't push the parent. Result: canvas falls back to a 300 px height minimum and the harbor is squashed into a thin band.

**Fix:** use inline `style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}` on the Mapbox container ref. Inline styles always win over imported stylesheet rules.

**Verification:** spun up the local dev server, ran headless Chromium via Playwright, queried `mapDivRect` via `getBoundingClientRect`. Before fix: height 0. After fix: height 860.

**File:** [src/components/hero/HeroMap.tsx](../src/components/hero/HeroMap.tsx)

### Pulse animation clobbers Mapbox marker positioning

**Symptom:** All 12 top-10 halo markers stack on top of each other at the upper-left corner of the figure. Sites' actual canvas-drawn circles render in the correct geographic positions, but the halo overlays don't follow them. The user reported "a single animating dot in the upper left corner."

**Root cause:** Mapbox positions every Marker element via inline `transform: translate(X px, Y px) translate(-50%, -50%) translate(0px, 0px)`. The pulse-halo keyframes (`animate-pulse-halo` in tailwind.config.ts) also write to `transform` with `scale(...)`. Browsers can only resolve one `transform` property per element. During animation frames, the CSS animation's value takes precedence over the inline value Mapbox set, so the marker loses its positioning at `0%` and `100%` of the cycle and renders at `transform: scale(1)` which is effectively `translate(0, 0)` relative to its parent's content origin (the canvas container's top-left, which is the upper-left of the map area).

**Fix:** nest. Outer wrapper div holds Mapbox's positioning transform. Inner div with `animate-pulse-halo` class handles the scale. `data-rank` moves to the wrapper since `marker.getElement()` returns the wrapper and the bidirectional hover code reads `el.dataset.rank` from it.

**File:** [src/components/hero/HeroMap.tsx](../src/components/hero/HeroMap.tsx)

### Mapbox 3.x default projection can be globe, not mercator

**Symptom:** Bounds-fit appears to land off-target in some configurations.

**Fix:** explicitly pass `projection: 'mercator'` to the `new mapboxgl.Map({...})` constructor. Defensive; harmless if mercator is already the default for the config.

**File:** [src/components/hero/HeroMap.tsx](../src/components/hero/HeroMap.tsx)

### NEXT_PUBLIC_* env vars are baked at build time

**Symptom:** Updated `NEXT_PUBLIC_MAPBOX_TOKEN` on Vercel, but the preview still shows the old (broken) token value.

**Cause:** `NEXT_PUBLIC_*` variables are inlined into the JS bundle by Next.js at build time. The bundle for a previous build still has the previous value. Updating the env var on Vercel does nothing until a fresh build runs.

**Fix:** push an empty commit (`git commit --allow-empty -m "Retrigger build"`) and push. Vercel rebuilds with the current env vars.

### Mapbox token was truncated in Vercel storage

**Symptom:** Map renders an inline error: "A valid Mapbox access token is required to use Mapbox GL JS."

**Investigation:** The token in our local `.env.local` is 94 characters. The token baked into the production JS bundle was 85 characters — the signature segment was cut by 9 chars. Mapbox rejects truncated tokens because the signature doesn't validate against the payload.

**How it happened:** unclear. Possibly paste corruption during a prior dashboard add. The `.env.local.example` file in the repo also had a truncated value at one point — restored to a placeholder in commit `8c81b94` before that leaked further.

**Fix:** removed the existing entries via `vercel env rm NEXT_PUBLIC_MAPBOX_TOKEN <env>` (one per scope), then re-added the clean 94-char value piped from a tmp file: `vercel env add NEXT_PUBLIC_MAPBOX_TOKEN production < /tmp/mbx.txt`. Stripped quotes and trailing literal `\n` from the file value first.

**Sanity check tool:** to see what's actually in the deployed bundle:
```bash
PROD=bop-<slug>-dylan-natrx.vercel.app
vercel curl / --deployment "$PROD" 2>/dev/null > /tmp/prod.html
PAGE_CHUNK=$(grep -oE '/_next/static/chunks/app/page-[a-z0-9]+\.js' /tmp/prod.html | head -1)
vercel curl "$PAGE_CHUNK" --deployment "$PROD" 2>/dev/null \
  | grep -oE "pk\.eyJ[A-Za-z0-9_.-]{20,}" | head -1
```
Should return a 94-character `pk.eyJ...` token.

### Vercel CLI "Personal Account as scope" error

**Symptom:** `vercel link --scope dylan-natrx` fails with "You cannot set your Personal Account as the scope."

**Cause:** the personal Vercel account `dylan-natrx` and the team `dylan-natrx` share the same slug. The CLI matches the personal account first.

**Fix:** use the team ID instead. `vercel link --yes --project bop --scope team_soKrd53s4rItez1X38348FFe`. Team ID lives in `.vercel/project.json`.

### `vercel env pull` omits NEXT_PUBLIC_* values in some cases

**Symptom:** Pulled production env file shows `NEXT_PUBLIC_MAPBOX_TOKEN=` (empty value, length 0) even though `vercel env ls` shows the variable as set.

**Behavior:** Not a bug per se, just an inconsistency in how the CLI serializes the env pull file format for certain variables. Trust `vercel env ls` for ground truth on whether a value exists. Trust an actual bundle inspection (curl + grep) for what's getting baked into builds.

### Two GitHub accounts authed, pushes 403 on the wrong one

**Symptom:** `git push` succeeds at first, then suddenly returns "Permission to dylan-natrx/bop.git denied to dylandibona."

**Cause:** `gh auth status` shows two accounts authenticated (`dylan-natrx` team account and `dylandibona` personal). Git operations use the active gh account. When auth flips to `dylandibona`, pushes to the team repo fail.

**Fix:** `gh auth switch --user dylan-natrx`. Run periodically if pushes 403 unexpectedly.

### `git filter-branch` deletes untracked files from the working tree

**Symptom:** Local-only reference files (e.g. `_master_docs/`, `_overview-documents/`, working brief markdowns) disappear from disk after running `git filter-branch` to remove them from history.

**Cause:** `git filter-branch` rewrites history AND updates the working tree to match the new HEAD. If the files only existed in the commit that's being rewritten (as opposed to existing as truly untracked files), the working tree update removes them.

**Recovery:** while the original commit still exists in the local pack (which it does until `git gc --prune=now`), pull the files back via:
```bash
git checkout <bloat-commit-sha> -- <paths...>
git reset HEAD -- <paths...>   # unstage so they're untracked again
```
After the recovery you can safely `git push --force` to update origin.

**Prevention:** before filter-branch, manually back up the working tree. And: don't use `git add -A` near untracked reference docs. The `.gitignore` now blocks `_master_docs/` and `_overview-documents/` to prevent re-occurrence.

### Two Vercel projects with the same name (apparent — actually was one)

**Symptom:** Spent ~30 minutes thinking we had two Vercel projects (`bop_storytelling_tool` and `bop`) both deploying off the GitHub repo, with env vars only set on one of them.

**Actual cause:** It was one Vercel project (`prj_TnieqvvtmxV8wRM3gAQOvHPP2fqI`), but the CLI's scope had drifted to a different team/account context, making `vercel list` and `vercel env` operations appear to target a "stub" project that didn't really exist. Once the CLI was re-linked with the team ID (see above), the apparent duality resolved.

**Lesson:** when CLI behavior contradicts dashboard reality, check `.vercel/project.json` and `vercel teams ls` before assuming there are multiple projects.

### Hero figure height collapsing on short viewports

**Symptom:** With DevTools open or on a half-height window, the figure renders fine but the map area inside it is compressed to ~300 px tall and the harbor reads as empty.

**Cause:** Old constraint `lg:h-[min(85vh,800px)]` ties figure height to viewport height. When the viewport is short (e.g. 400 px tall), 85vh = 340 px and the figure shrinks proportionally.

**Fix:** floor the height with min-h that doesn't depend on viewport.
```
min-h-[640px] lg:min-h-[720px] lg:h-[min(90vh,860px)]
```
Both the grid container (in HeroFigure) AND the HeroMap inner container need min-h, because `h-full` doesn't always resolve through grid stretch reliably.

**File:** [src/components/hero/HeroFigure.tsx](../src/components/hero/HeroFigure.tsx), [src/components/hero/HeroMap.tsx](../src/components/hero/HeroMap.tsx)

### NJ shoreline polygon was too crude (32 points for the whole state)

**Symptom:** New Jersey rendered as a blocky polygon that visually overlapped Manhattan and Staten Island areas. Straight lines between sparse coastal points cut through the harbor.

**Cause:** The original `nj-shoreline.geojson` was a 32-point generalized state outline. Westchester was similar at 59 points.

**Fix:** replaced with US Census 2010 Cartographic Boundary 500k files. NJ now has 755 points, Westchester 332 points. Public domain. Sources:
- States: `https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_040_00_500k.json`
- Counties: `https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_050_00_500k.json`

Counties file has invalid UTF-8 bytes; load with `encoding='latin-1'` if parsing in Python.

### Mapbox preview URL gated behind Vercel auth

**Symptom:** `curl` returns 401 with "Authentication Required" HTML when fetching a Vercel deployment URL.

**Fix:** use `vercel curl <path> --deployment <deploy-url>` which generates a bypass token via the CLI's auth. Path must be relative (`/`, not the full URL).

### Headless browser bounced through Vercel auth wall

**Symptom:** Playwright `page.goto(<production-url>)` ended up on a vercel.com auth page instead of our site. No figure in the resulting DOM.

**Fix:** test against the local dev server (`http://localhost:3033/`) instead, which has no auth wall and runs the same code.

---

## Pre-rebuild SVG hero session (kept for historical reference)

These predate the Mapbox switch. The fixes still inform the visual register the user wants to carry forward.

### Turbopack cache corruption

**Symptom:** Internal server error, "Cannot find module '../chunks/ssr/[turbopack]_runtime.js'"

**Fix:** `rm -rf .next && npm run dev`. Happens after rapid file changes.

### Land/water contrast inverted

**Symptom:** Land appeared brighter than water on the SVG hero, causing visual confusion.

**Fix:** Changed `--land` from `#0B1D2F` → `#04101C` (darker). Added water layer at `rgba(19, 125, 118, 0.06)`. (For the current Mapbox-based hero, land is `#0E2236` and water is `#061321`.)

### Boxy coastline corners

**Symptom:** Extended SVG coastline polygons had visible right-angle corners at outer edges.

**Fix:** Replaced abrupt outer vertices with sequences of 3–5 intermediate vertices with slight lat/lng offsets. (Obsolete with Mapbox; the new boundary GeoJSONs handle this naturally.)

### "Pipeline" terminology confusion

**Symptom:** "Pipeline" implied industrial process rather than BOP's design queue.

**Fix:** Project-wide rename. Use "Sites already in design" for the 11 Design-status sites, "Candidate sites" for the full pool of 78.

### Below-threshold sites too prominent

**Symptom:** Sites with Score < 0.5 visually competed with high-suitability sites.

**Fix:** Below-threshold color → `rgba(80, 105, 115, 0.32)` muted with no stroke. ≥ 0.5 sites get full color + 1.5px teal-aqua stroke. (Carried into the Mapbox circle layer expression.)

### Top-ranked sites not distinctive enough

**Symptom:** Rank 1–10 sites didn't stand out from the 78-site field.

**Fix:** 1.15× radius boost + pulsing halo at scale 1→2×, opacity 0.85→0, 2.6s ease-in-out. Bidirectional hover with the FigurePanel. All carried into the Mapbox implementation.
