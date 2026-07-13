/**
 * The demo tenant's single page. A short self-describing internal note:
 * the page itself is the evidence that projects on this platform share
 * nothing but the middleware and the root html/body shell.
 */
export default function DemoPage() {
  return (
    <main className="demo-page">
      <p className="demo-kicker">Internal / natrx.report platform</p>
      <h1 className="demo-title">Platform isolation demo</h1>
      <p className="demo-standfirst">
        This page exists to prove one thing: a second project can live on
        this platform without touching the first. Everything below is the
        evidence.
      </p>

      <section className="demo-section">
        <p className="demo-section-num">01</p>
        <h2 className="demo-section-heading">Its own look</h2>
        <p>
          The typefaces (Space Grotesk, IBM Plex Serif), the paper
          background, and the vermillion accent on this page load from this
          project&apos;s own directory. None of it is shared with, or
          visible to, any other project on the platform.
        </p>
      </section>

      <section className="demo-section">
        <p className="demo-section-num">02</p>
        <h2 className="demo-section-heading">Its own front door</h2>
        <p>
          You signed in with a credential that only works here. The session
          cookie it set is scoped to this subdomain, so being signed in to
          this demo grants nothing anywhere else, and vice versa.
        </p>
      </section>

      <section className="demo-section">
        <p className="demo-section-num">03</p>
        <h2 className="demo-section-heading">Cheap to add</h2>
        <p>
          Standing this project up required one directory in the codebase,
          one entry in the tenant registry, and one DNS record. No changes
          to any existing project&apos;s files.
        </p>
      </section>

      <footer className="demo-footer">
        demo.natrx.report — a throwaway project proving isolation. Not a
        public page.
      </footer>
    </main>
  )
}
