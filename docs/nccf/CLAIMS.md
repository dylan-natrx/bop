# NCCF: Claims Register

**Every number that appears on the page must appear here first.**

Numbers that cannot be sourced do not get published, however good they sound.

**Status key:**
`CONFIRMED` — sourced, checked, publishable
`PENDING` — real but needs a source, a decision, or review
`BLOCKED` — do not publish under any circumstance until resolved

**Sources referenced:**
- SOW — "2025-04-04 Natrx SOW_NCCF.md," Natrx to NCCF, signed Nicholas Brady
- Nick 07-22 — Nick Brady interview, 2026-07-22, and his follow-up email the same day
- Jacob 08-17 — Jacob Boyd interview, 2026-08-17 (Plaud `19aae093faaec5ae25eaceed1f38346d`)
- Stop-Loss — Wetland Stop-Loss executive summary, Natrx internal memo

---

## Erosion findings

| Claim | Value | Status | Notes |
|---|---|---|---|
| Transects analyzed | 93,004 | CONFIRMED | Figure 1. The public webmap carries 93,418 points across 39 layers; the ~400 difference is filtering. |
| Median shoreline change | -0.72 ft/yr | CONFIRMED | Erosion |
| Transects retreating faster than 1 ft/yr | 40.7% | CONFIRMED | |
| Transects retreating faster than 2 ft/yr | 23.5% | CONFIRMED | |
| Transects retreating faster than 5 ft/yr | 8.3% | CONFIRMED | |
| 5th-percentile transect | -6.77 ft/yr | CONFIRMED | |
| **Fastest 10% of eroding locations account for 43.5% of all land lost** | **43.5%** | **CONFIRMED, headline-safe** | The strongest number in the dataset and the one Nick endorses for the headline. Computed from the individual shoreline-change transect points, all ~76k eroding points equally weighted. **Not from the hexagon layer.** Robustness: filtering to points with regression r² ≥ 0.5, the top decile still accounts for ~39%. It holds. |
| Study period | 2012–2022 | CONFIRMED | |
| Resolution | 1 meter | CONFIRMED | |
| Temporal data points | 5 (2012, 2014, 2016, 2019, 2022) | CONFIRMED | Nick 07-22. Intended lower bound ~2010, in practice 2012. |
| Worst county: Dare | qualitative, "by far" | CONFIRMED | Nick 07-22: "Dare County. Dare County by far." Quotable. A peak rate from the final dataset is still wanted to attach. |
| Hyde County highly erosive | qualitative | CONFIRMED | Nick 07-22: Hyde "was bad," Dare "very bad." Jacob 08-17 independently: "pretty much the whole shoreline of Hyde County has disappeared at a pretty alarming rate." Quotable as severity, not as a number. |
| **Peak measured erosion** | **-45.91 ft/yr, Navy Shell** | **CONFIRMED** | Recomputed 2026-08-27 from the public ArcGIS webmap GeoJSON (39 layers, item f0ec44fa). r² = 0.98. Five transects past -42 ft/yr, all r² above 0.94, all at Navy Shell. Confirm the county before print. |
| Erosion up to 50 ft/yr | 50 ft/yr | **DO NOT USE the round 50** | Superseded. An earlier entry here claimed NCCF marsh tops out near -15 ft/yr. **That was wrong.** The real peak is -45.91. The 50 still traces to Stop-Loss (Gulf reef sites) rather than to this dataset, so do not publish 50. Publish the measured figure instead: erosion reaching roughly 46 feet per year at the worst transects. |
---

## Correlation findings

The central methodological claim. Handle carefully.

| Claim | Value | Status | Notes |
|---|---|---|---|
| Hexagons in analysis | n = 1,354 | CONFIRMED | Quality-controlled coastal hexagons |
| Spearman rho (overall) | 0.349 | CONFIRMED | p < 10^-39 |
| Pearson r (overall) | 0.196 | CONFIRMED | 95% CI 0.144–0.246 |
| **Pearson r² (overall)** | **0.038** | **CONFIRMED** | **Wetland change explains under 4% of variance. This number must accompany any claim of predictive power. Omitting it is the overclaim.** |

**Per-grid results.** Read the sample sizes before quoting any of these.

| Grid | n | Pearson r | p | Spearman rho | p | Read |
|---|---|---|---|---|---|---|
| 4 | 32 | -0.026 | 0.89 | 0.05 | 0.78 | No signal. Small n. |
| 5 | 14 | -0.209 | 0.47 | -0.232 | 0.43 | Wrong direction, n=14, not significant. Do not quote. |
| 6 | 223 | 0.098 | 0.15 | 0.19 | 0.0044 | Weak. Well-sampled. |
| 8 | 559 | 0.006 | 0.90 | 0.318 | 1.2e-14 | Largest sample. Zero linear relationship, moderate rank relationship. |
| 9 | 26 | 0.707 | 5.4e-05 | 0.546 | 0.0039 | Strong but n=26. Unstable. Do not lead with it. |
| 11 | 27 | 0.601 | 0.00091 | 0.593 | 0.0011 | Strong but n=27. Same caution. |
| 12 | 289 | 0.514 | 7.2e-21 | 0.478 | 6.6e-18 | Strong and well-sampled. Best evidence in the set. |
| 13 | 184 | 0.348 | 1.3e-06 | 0.483 | 3.7e-12 | Strong and well-sampled. Second best. |
| 1, 2, 3, 7, 10, 14, 15 | 0 | — | — | — | — | No surveyed shoreline. Nothing to compare. |

**The honest summary:** among grids with meaningful samples, the relationship ranges from weak (grid 6, rho = 0.19) to moderate (grids 12 and 13, rho ≈ 0.48). It is not uniform. Grids 9 and 11 look strongest but have samples of 26 and 27 and cannot carry the argument.

**Grid 8.** Its divergence (no linear relationship, real monotonic one) is explained by the confounder Nick named: the change analysis is area-based, so a high-tide versus low-tide image pairing can make a hexagon look like it lost land when the shoreline barely moved. Not a standalone hole. Worth having the answer ready, because grid 8 is a third of the hexagon sample and a careful reader will notice.

---

## The image-quality claim

**Status: SUPPORTED on record. Dated artifact still wanted.**

The claim: the grids where the correlation is weak are the grids where image quality was flagged as poor *before* the shoreline analysis ran, which makes it a confirmed prediction rather than a post-hoc story.

Nick 07-22, in his words: "the areas where we flagged before we did these shoreline change analysis as unreliable data, sure enough was not as related at all."

For publication, still obtain a dated artifact (notebook, commit, or message) so the sequence is documented and not only recalled.

**On the geographic gradient.** Nick attributes the weak southwestern grids mostly to "large amounts of difficult-to-classify data" and "error in the change analysis itself," compounded by smaller samples, not primarily to shoreline type. The honest read is a data-quality story that reinforces the image-quality point. **Do not frame it as a clean geomorphic law.**

---

## The two footprints (do not conflate)

| Analysis | Footprint | Resolution | Status | Notes |
|---|---|---|---|---|
| Change analysis (wide screen) | ~4,000 sq mi | area-based | **PENDING confirm** | Nick 07-22: "I wouldn't be surprised" it was 4,000, but "I'd have to check." The public "4,000 square mile study" figure refers to this one. |
| Shoreline change analysis (granular) | ~800 sq mi / ~2,900 mi of shoreline | 1 meter | CONFIRMED | Nick: 25 desktop analyses, 39 subprojects, ~2,900 miles of shoreline including internal water features, 800+ sq mi. |

**Two different analyses at two resolutions.** The public announcement used 4,000; an earlier briefing used 800. Both are true if labeled correctly. They are currently being used interchangeably, which is a factual error waiting to be caught. **Do not headline either until Nick confirms the 4,000.**

---

## Carbon

**Editorial decision, locked 2026-08-27: carbon appears once, as the reason the grant exists. See `EDITORIAL.md`.**

| Claim | Value | Status | Notes |
|---|---|---|---|
| The grant targeted carbon rather than treating it as a co-benefit | qualitative | CONFIRMED | Jacob 08-17: "It's a lot different than some of our previous work where the carbon was really the co-benefit. This was really targeting these areas for carbon." Client's own framing. Quotable. |
| Program target: up to 600 acres of marsh protected from eroding | 600 acres | **CONFIRMED, cleared for page** | SOW, Executive Summary. A land-protection target, which is what the grant bought. Cleared precisely because it carries no carbon-accounting claim. |
| Marsh loss releases carbon | qualitative | PENDING | True and uncontroversial. Needs a citation if stated as fact rather than as the grant's premise. |
| SOW CO2e figures: 183,000 Mt total, 305 Mt/acre | — | **BLOCKED by editorial decision** | Real, sourced to the SOW, deliberately excluded. Tonnage is a carbon-accounting claim and opens the methodology fight. |
| Verra, REDD+, VM0007, VM0033 | — | **BLOCKED** | Nick 07-22: "We're not doing carbon accounting, and we shouldn't claim to. I'd be very wary of mentioning Verra at all." Named in the SOW and in Stop-Loss citation 29, so it is a deliberate company framing rather than an error. It stays off this page regardless. |
| Global: disturbed coastal wetlands emit ~1.9 Gt CO2/yr, ~4.5% of anthropogenic emissions | 1.9 Gt / ~4.5% | CONFIRMED but **excluded** | Temmink et al. 2022, *Science*, via Stop-Loss. Scope is coastal wetlands as a class plus soil-carbon release on disturbance, **not marsh erosion alone**. Citable if ever needed, belongs to Natrx's Dry Forming thesis, not to NCCF. Never use Nick's off-the-cuff "5% from eroded marsh." |
| Per-acre marsh sequestration rate, "highest sequestering habitat in the world" | — | **BLOCKED, awaiting citation** | Jacob 08-17 tentatively attributed it to NOAA and could not name the source: "I can look at that and send it to you." Owed by Jacob. **A different figure from Temmink. Do not merge the two.** |

**Natrx measured no carbon on this project.** The deliverable was erosion-based site selection. Any copy implying otherwise is wrong on the facts, not just off-message.

---

## Cost

| Claim | Value | Status | Notes |
|---|---|---|---|
| Traditional-method equivalent cost | $3.5–5M | PENDING (soft, attributed) | Nick 07-22: doing this the traditional way "would have easily been three and a half to five million dollars," with "I don't want to pin ourselves" to it. Attributed, order-of-magnitude, never a hard figure. |
| Comparator: engineering firm site survey | ~$65,000 for 3–4 sites | CONFIRMED (Nick) | The firm Coastal Fed uses would charge ~$65K to survey three or four sites. Natrx covered ~2,900 miles of shoreline. The honest comparison per Nick, not field-vs-desktop apples-to-apples. |
| Physical inspection at this scale is impractical | qualitative | CONFIRMED | Nick: practical ceiling of field inspection is "less than a single municipality"; an engineering firm on Natrx's budget could cover "probably a single county." |
| Contract value | $350,000 | CONFIRMED | SOW. Phase I $55,000, Phase II $52,500, Phase III $152,500, Phase IV $90,000. **Check with Nick and Dylan before publishing a client contract value.** |
| Percent-of-program-spend framing | — | **RETIRED** | Do not frame cost as a share of program spend. Nick flagged the apples-to-oranges risk directly. Lead with capability and orders of magnitude. |

Avoid the word "cheap" in copy. It undersells the work.

---

## Downstream benefits (Jacob 08-17)

| Claim | Status | Notes |
|---|---|---|
| Better data lets living shorelines be sized to actual conditions rather than built to permit maximums | **CONFIRMED, headline-safe** | Jacob, quoted in full in `EDITORIAL.md`. The economic lead. |
| Data improves funding competitiveness | CONFIRMED | Jacob: "If it comes down to you and another proposal, if you have the data they don't, you're going to get funded versus other projects." |
| Data eases permitting and reduces cost | CONFIRMED | Jacob: "the regulators and permit reviewers, we definitely want to see as much data as possible, so it definitely helps move everything along more efficiently." |
| Prior method required more upfront field verification | CONFIRMED | Jacob: "you would have to go out and do a lot more upfront pre-site verification and looking at rates... Now we have the shorelines prioritized, so that's step one done." |
| Permit submission targeted within ~6 months, construction within ~2 years | CONFIRMED as intent | Jacob 08-17. Frame as his stated timeline, not a commitment. |
| Datasets and tool public on the Federation site by fall 2026, via ArcGIS Online | CONFIRMED as intent | Jacob: "It'll certainly all be publicly available by this fall at some point." No date. The page cannot promise one. |
| No site moved up or down once the data landed | CONFIRMED | Jacob, asked directly: "Not really." **The page cannot claim the data surprised the experts.** |

---

## Scope

| Claim | Status | Notes |
|---|---|---|
| Coverage expanded to most of the Pamlico | CONFIRMED | |
| Coverage exceeded original scope | CONFIRMED | Nick's "over-delivery." The expansion made the comparison possible at all. Jacob 08-17 corroborates and explains why: "We both got better at identifying sites and they got better at running it. They were able to take on more." |
| Method suits marsh-dominated estuaries across Southeast, East, Gulf | PENDING | Reasonable. Wants Lise's sign-off as a generalization. |
| Method unsuited to sandy beaches | CONFIRMED | The method reads the vegetation line as a shoreline proxy, accurate for marsh, not for beaches. State it plainly. Naming the limitation buys credibility for everything else. |
| The moat is process, not the model | CONFIRMED (Nick, attributed) | Methodology public, NAIP imagery free, ML not the hard part. The hard part is a reproducible process across 39 subprojects, human-in-the-loop QA, and trained judgment on ambiguous tidal imagery. Two people in the company can do the interpretation well. |
| One meter matters | CONFIRMED (Nick) | NCCF cared about rates as low as 2 ft/yr. Over ten years that is ~20 feet, roughly 7 one-meter pixels, near the floor of what can be confidently fit. Ten-meter data would miss it. |

---

## Not for print

**Site selection versus erosion data.** Nick 07-22: the Coastal Federation chose some sites as pet projects rather than by peak erosion, so projected savings came in below a Dare-County-first selection. This explains why the erosion data and the final site list do not perfectly align. **Internal only. Never external, and never characterized in any way that reflects on the client.**

**Ranked top-ten list. Do not build.** Nick 07-22: keep it high level, defer to NCCF's own takeaways, lead with the concentration finding. Dare County can be named as worst, on record. No sortable leaderboard of named places.

---

## Review

The July register carried a line that nothing ships without Lise Montefiore's review. Whether that gate still stands for NCCF is open. See `OPEN-QUESTIONS.md` #2.

---

## Prior public claims (the Natrx OS one-pager)

A Natrx OS project page for this engagement, "NC Coastal Federation Coastal Wetlands Assessment & Planning," exists as a five-page asset and carries a cleared Jacob Boyd quote, which means it has been client-reviewed. Anything it states publicly is already attributable to Natrx, and this page cannot silently contradict it.

| Claim on that page | Relationship to this register |
|---|---|
| "808 SQ MI · SHORELINE CHANGE ANALYSIS (SCA)" | Consistent with the ~800 sq mi granular footprint. **Resolves the labeling question in public: 808 is the SCA number.** The 4,000 figure is the change analysis and still needs Nick's confirm. |
| "600+ ACRES · WETLANDS TARGETED FOR PROTECTION" | Consistent. Cleared for our page. |
| "1m IMAGERY PRECISION" | Consistent. |
| "183K+ TONS OF CO2 KEPT OUT OF THE ATMOSPHERE · 25-YEAR HORIZON" | **Conflicts with the locked editorial decision to carry no tonnage.** The figure is already public under Natrx's name. See `OPEN-QUESTIONS.md` #1a. |
| "wetland loss ... can happen at up to eight feet of shoreline retreat per year" | Consistent with the SOW's 4–8 ft/yr band and with the measured data. **Note that the public Natrx claim is 8 ft/yr, not 50.** Further reason the 50 stays dead. |
| "soil-organic-carbon mapping," "carbon maps" as deliverables | **Conflicts with Nick's 2026-07-22 position** that Natrx is not doing carbon accounting. Both cannot be described the same way. Needs Nick. |
| "turning history into prediction," "predictive erosion-hotspot identification" | **Conflicts with the triage-not-predictor rule.** Do not repeat this phrasing on the NCCF page. |
| Jacob Boyd, cleared quote: "This level of decision-ready, coastwide data has never been available before. With the results of Natrx's assessment, we will have the insight needed to direct resources where they will have the greatest impact." | CONFIRMED and already client-approved. Usable. |
| "more than 12,000 miles of estuarine shoreline" in NC | PENDING. Needs a source before reuse. |
| Contact: Drew Keeley, Solutions Specialist | Note: that page routes to sales. This one routes to press. |

The one-pager is written largely in future tense ("is mapping," "will have") under a headline that says the analysis is complete. Our page is past tense for completed work, so the two will read differently by design.
