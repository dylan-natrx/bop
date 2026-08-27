/**
 * Shared capture logic for the BOP regression harness.
 *
 * The harness exists to prove that bop.natrx.report renders identically
 * (content byte-exact, pixels within a tight perceptual threshold) across
 * the platform restructure. It never touches app code.
 *
 * Determinism measures, in order of application per page:
 *   1. Fixed viewport, deviceScaleFactor 1, locale/timezone pinned,
 *      prefers-reduced-motion emulated.
 *   2. Scroll through the whole page to fire every scroll-tied entrance
 *      (Framer Motion whileInView is one-shot), then return to top.
 *   3. Fixed settle wait for Mapbox tiles/glyphs and font loading.
 *   4. Finish/cancel all Web Animations (Framer Motion), then inject CSS
 *      that disables CSS animations/transitions (the pulse-halo loop).
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { chromium } from 'playwright'
import { PNG } from 'pngjs'

export const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

export const DEFAULT_URL = 'https://bop.natrx.report'
export const BASELINE_DIR = path.join(import.meta.dirname, 'baseline')

// Pixel diff tuning. threshold is pixelmatch's per-pixel colour sensitivity;
// FAIL_RATIO is the fraction of differing pixels above which an image FAILS.
// Measured noise floor between two back-to-back production captures is the
// basis for FAIL_RATIO — see README. Overridable for investigation only.
export const PIXEL_THRESHOLD = Number(process.env.HARNESS_PIXEL_THRESHOLD ?? 0.1)
export const FAIL_RATIO = Number(process.env.HARNESS_FAIL_RATIO ?? 0.002)

const FREEZE_CSS =
  '*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }'

const SETTLE_MS = 4000

function log(msg) {
  process.stdout.write(`  ${msg}\n`)
}

export async function launchBrowser() {
  return chromium.launch({
    args: ['--force-color-profile=srgb', '--disable-lcd-text', '--hide-scrollbars'],
  })
}

export async function newContext(browser, viewport) {
  return browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    locale: 'en-US',
    timezoneId: 'America/New_York',
    reducedMotion: 'reduce',
  })
}

export async function newAuthedContext(browser, baseUrl, viewport) {
  const context = await newContext(browser, viewport)
  const username = process.env.HARNESS_USERNAME
  const password = process.env.HARNESS_PASSWORD
  if (!username || !password) {
    console.error(
      'HARNESS_USERNAME and HARNESS_PASSWORD must be set — no fallback credentials exist.'
    )
    process.exit(2)
  }
  const res = await context.request.post(new URL('/api/auth/login', baseUrl).href, {
    data: { username, password },
  })
  if (res.status() === 404) {
    log('no auth endpoint at target (gate absent) — continuing unauthenticated')
  } else if (!res.ok()) {
    throw new Error(`Login failed against ${baseUrl}: HTTP ${res.status()} ${await res.text()}`)
  }
  return context
}

async function freezeAnimations(page) {
  await page.evaluate(() => {
    for (const anim of document.getAnimations()) {
      try {
        anim.finish() // one-shot animations jump to their settled end state
      } catch {
        anim.cancel() // infinite loops (pulse halo) revert to base style
      }
    }
  })
  await page.addStyleTag({ content: FREEZE_CSS })
  await page.waitForTimeout(200)
}

export async function gotoAndSettle(page, url, { expectLogin = false } = {}) {
  await page.goto(url, { waitUntil: 'load', timeout: 60_000 })
  if (!expectLogin && page.url().includes('/login')) {
    throw new Error(`Gate blocked the harness: landed on ${page.url()}. Check credentials.`)
  }
  await page.evaluate(() => document.fonts.ready)
  // Fire every scroll-tied entrance, then return to top.
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    const step = Math.max(200, Math.floor(window.innerHeight * 0.7))
    const max = () => document.documentElement.scrollHeight
    for (let y = 0; y <= max(); y += step) {
      window.scrollTo(0, y)
      await sleep(250)
    }
    window.scrollTo(0, max())
    await sleep(600)
    window.scrollTo(0, 0)
    await sleep(400)
  })
  await page.waitForTimeout(SETTLE_MS)
  await freezeAnimations(page)
}

/**
 * Every string in the page, in DOM order, byte-exact. No whitespace
 * normalization: a whitespace change is a change. Whitespace-only text
 * nodes (JSX indentation between elements) are skipped; everything else
 * is captured verbatim. Reader-facing attribute strings and metadata are
 * captured alongside.
 */
export async function extractContent(page, scopeSelector = 'body') {
  return page.evaluate((sel) => {
    const root = document.querySelector(sel)
    if (!root) throw new Error(`extractContent: no element matches ${sel}`)
    const texts = []
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
      const node = walker.currentNode
      const tag = node.parentElement?.tagName
      if (!tag || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(tag)) continue
      if (node.textContent.trim() === '') continue
      texts.push(node.textContent)
    }
    const attrs = []
    for (const el of root.querySelectorAll('[alt], [aria-label], [placeholder], [title]')) {
      for (const name of ['alt', 'aria-label', 'placeholder', 'title']) {
        if (el.hasAttribute(name)) attrs.push(`${name}=${el.getAttribute(name)}`)
      }
    }
    return { texts, attrs }
  }, scopeSelector)
}

async function extractMeta(page) {
  return page.evaluate(() => {
    const meta = { title: document.title }
    const selector = 'meta[name="description"], meta[property^="og:"], meta[name^="twitter:"]'
    for (const m of document.querySelectorAll(selector)) {
      meta[m.getAttribute('name') || m.getAttribute('property')] = m.getAttribute('content')
    }
    return meta
  })
}

/** Guard against silently-blank WebGL captures: a real map has colour variety. */
function assertNotBlank(pngPath, label) {
  const png = PNG.sync.read(fs.readFileSync(pngPath))
  const seen = new Set()
  for (let i = 0; i < png.data.length; i += 4 * 97) {
    seen.add((png.data[i] << 16) | (png.data[i + 1] << 8) | png.data[i + 2])
    if (seen.size > 24) return
  }
  throw new Error(`${label} looks blank (${seen.size} distinct sampled colours) — WebGL render likely failed`)
}

function visible(page, selector) {
  return page.locator(`${selector}:visible`).first()
}

/**
 * Full capture of a deployment into outDir:
 *   {mobile,tablet,desktop}.png       full-page screenshots
 *   hero-map.png                      Map 1 element state
 *   walkthrough-step-{1..6}.png       Map 2 + spectra panel, every step
 *   drawer-glossary.png / drawer-press.png
 *   content.json + content.sha256     the exact-match text manifest
 *   meta.json                         capture provenance (not compared)
 */
export async function capture(baseUrl, outDir) {
  fs.rmSync(outDir, { recursive: true, force: true })
  fs.mkdirSync(outDir, { recursive: true })
  const browser = await launchBrowser()
  try {
    // 1. Full-page screenshots, one fresh context per viewport.
    for (const vp of VIEWPORTS) {
      const context = await newAuthedContext(browser, baseUrl, vp)
      const page = await context.newPage()
      await gotoAndSettle(page, baseUrl)
      const file = path.join(outDir, `${vp.name}.png`)
      await page.screenshot({ path: file, fullPage: true })
      log(`captured ${vp.name}.png`)
      await context.close()
    }

    // 1b. The login page, pre-authentication — the first thing every
    // stakeholder sees. Fresh unauthenticated context per viewport.
    let loginContent = null
    for (const vp of VIEWPORTS) {
      const context = await newContext(browser, vp)
      const page = await context.newPage()
      await gotoAndSettle(page, new URL('/login', baseUrl).href, { expectLogin: true })
      const file = path.join(outDir, `login-${vp.name}.png`)
      await page.screenshot({ path: file, fullPage: true })
      log(`captured login-${vp.name}.png`)
      if (vp.name === 'desktop') loginContent = await extractContent(page, 'body')
      await context.close()
    }

    // 2. Content manifest + component states on a fresh desktop context.
    const context = await newAuthedContext(browser, baseUrl, VIEWPORTS[2])
    const page = await context.newPage()
    await gotoAndSettle(page, baseUrl)

    const content = {
      page: await extractContent(page, 'body'),
      meta: await extractMeta(page),
      login: loginContent,
      walkthroughSteps: {},
      drawerGlossary: null,
      drawerPress: null,
    }

    // Hero map (Map 1) element state.
    const heroMap = page.locator('.mapboxgl-map').first()
    await heroMap.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1500)
    await freezeAnimations(page)
    await heroMap.screenshot({ path: path.join(outDir, 'hero-map.png') })
    assertNotBlank(path.join(outDir, 'hero-map.png'), 'hero-map.png')
    log('captured hero-map.png')

    // Walkthrough (Map 2 + spectra panel), all six steps.
    const walkthrough = visible(page, '[aria-label="Methodology walkthrough"]')
    await walkthrough.scrollIntoViewIfNeeded()
    await page.waitForTimeout(2500)
    for (let stepNum = 1; stepNum <= 6; stepNum++) {
      if (stepNum > 1) {
        await visible(page, 'button[aria-label="Next step"]').click()
        await page.waitForTimeout(1600) // 600ms colour interpolation + settle
      }
      await freezeAnimations(page)
      const file = path.join(outDir, `walkthrough-step-${stepNum}.png`)
      await walkthrough.screenshot({ path: file })
      assertNotBlank(file, `walkthrough-step-${stepNum}.png`)
      content.walkthroughSteps[stepNum] = await extractContent(
        page,
        '[aria-label="Methodology walkthrough"]',
      )
      log(`captured walkthrough-step-${stepNum}.png`)
    }

    // Drawer: glossary state, then press contact state.
    await visible(page, '[aria-label="Open glossary and press contact"]').click()
    await page.waitForTimeout(800)
    await freezeAnimations(page)
    await page.locator('#site-drawer').screenshot({ path: path.join(outDir, 'drawer-glossary.png') })
    content.drawerGlossary = await extractContent(page, '#site-drawer')
    log('captured drawer-glossary.png')

    await page.getByRole('tab', { name: 'Press contact' }).click()
    await page.waitForTimeout(600)
    await freezeAnimations(page)
    await page.locator('#site-drawer').screenshot({ path: path.join(outDir, 'drawer-press.png') })
    content.drawerPress = await extractContent(page, '#site-drawer')
    log('captured drawer-press.png')

    await context.close()

    // 3. Manifest + hash + provenance.
    const contentJson = JSON.stringify(content, null, 2)
    fs.writeFileSync(path.join(outDir, 'content.json'), contentJson)
    const hash = crypto.createHash('sha256').update(contentJson).digest('hex')
    fs.writeFileSync(path.join(outDir, 'content.sha256'), hash + '\n')
    fs.writeFileSync(
      path.join(outDir, 'meta.json'),
      JSON.stringify(
        { capturedFrom: baseUrl, capturedAt: new Date().toISOString(), viewports: VIEWPORTS },
        null,
        2,
      ),
    )
    log(`content manifest sha256: ${hash}`)
    return hash
  } finally {
    await browser.close()
  }
}

export const IMAGE_FILES = [
  'mobile.png',
  'tablet.png',
  'desktop.png',
  'login-mobile.png',
  'login-tablet.png',
  'login-desktop.png',
  'hero-map.png',
  'walkthrough-step-1.png',
  'walkthrough-step-2.png',
  'walkthrough-step-3.png',
  'walkthrough-step-4.png',
  'walkthrough-step-5.png',
  'walkthrough-step-6.png',
  'drawer-glossary.png',
  'drawer-press.png',
]
