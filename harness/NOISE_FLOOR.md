# Measured noise floor

Calibration runs: independent captures of production
(`https://bop.natrx.report`) diffed against the committed baseline,
2026-07-13, same machine (darwin, Playwright-pinned Chromium headless).

| Artifact | Run-to-run pixel delta |
|---|---|
| mobile.png / tablet.png / desktop.png | 0.0000% |
| hero-map.png | 0.0000% |
| walkthrough-step-1 … 5 | 0.0000% |
| walkthrough-step-6 | 0.094% (run 1), 0.0000% (run 2) |
| drawer-glossary.png / drawer-press.png | 0.0000% |

Content manifest sha256 was identical across all three captures
(`8939faf75c7d85e1…`), confirming the text capture is fully deterministic.

The only nonzero observation was walkthrough step 6 in one run, where the
priority-halo reveal leaves more WebGL marker layers active; the residue
is animation phase in the frozen halo ring. The 0.2% `FAIL_RATIO` sits ~2× above that
worst case while staying far below anything a real visual regression
(shifted layout, changed color, missing element) would produce, which
registers in whole percents.

If a future run fails only on walkthrough-step-6 in the 0.2–0.5% band,
inspect `.last-run/diff/walkthrough-step-6.png` before concluding either
way; anything else failing, or any content mismatch, is a real regression.
