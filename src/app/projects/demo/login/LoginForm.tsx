'use client'

import { useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * Credential form for the demo tenant's gate. Submits to /api/auth/login;
 * on success the API sets the session cookie and returns a redirect target
 * (the `from` query param, or "/" if absent). The credential itself lives
 * outside this codebase as a hash; nothing here knows it.
 */
export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    setError(null)
    setPending(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, from }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error ?? 'Incorrect username or password.')
        setPending(false)
        return
      }
      const data = (await res.json()) as { redirect?: string }
      // replace keeps /login out of history
      router.replace(data.redirect || '/')
      router.refresh()
    } catch {
      setError('Could not reach the server. Try again.')
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="demo-login-form" noValidate>
      <div className="demo-field">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          autoFocus
          required
        />
      </div>

      <div className="demo-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      {error ? (
        <div role="alert" className="demo-error">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        className="demo-submit"
        disabled={pending || !username || !password}
      >
        {pending ? 'Verifying…' : 'Enter'}
      </button>
    </form>
  )
}
