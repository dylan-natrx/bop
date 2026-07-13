/**
 * Holding page for the natrx.report apex. Deliberately unbranded and
 * dependency-free: it must never 500 and it must never inherit a
 * project's design. Reached only via the middleware rewrite of the apex
 * hostname.
 */

export const metadata = {
  title: 'natrx.report',
  description: 'Project reports from Natrx.',
  robots: { index: false, follow: false },
}

export default function PlatformHoldingPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        background: '#111',
        color: '#eee',
      }}
    >
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ fontSize: '1.1rem', letterSpacing: '0.02em', margin: 0 }}>
          natrx.report
        </p>
        <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.75rem' }}>
          Project reports from Natrx. Access is provided per project.
        </p>
      </div>
    </main>
  )
}
