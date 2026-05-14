'use client'

import { useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * Credential form for the password gate. Submits to /api/auth/login;
 * on success the API sets the bop-auth cookie and returns a redirect
 * target (the `from` query param, or "/" if absent).
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
      // router.push triggers a soft nav; replace keeps /login out of history.
      router.replace(data.redirect || '/')
      router.refresh()
    } catch {
      setError('Could not reach the server. Try again.')
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-3" noValidate>
      <Field
        id="username"
        label="Username"
        value={username}
        onChange={setUsername}
        autoComplete="username"
        autoFocus
      />
      <Field
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
      />

      {error ? (
        <div
          role="alert"
          className="
            font-mono text-eyebrow uppercase tracking-[0.22em]
            text-[#E89B7A]
            mt-1
          "
        >
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending || !username || !password}
        className="
          mt-2
          w-full h-12
          font-mono text-eyebrow uppercase tracking-[0.22em]
          text-bg-deep
          bg-teal-aqua hover:bg-ivory
          disabled:bg-ivory-faint/40 disabled:text-ivory-faint disabled:cursor-not-allowed
          rounded
          transition-colors duration-200
        "
      >
        {pending ? 'Verifying…' : 'Enter'}
      </button>
    </form>
  )
}

interface FieldProps {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  autoComplete?: string
  autoFocus?: boolean
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  autoFocus,
}: FieldProps) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="
          block
          font-mono text-eyebrow uppercase tracking-[0.22em] text-ivory-faint
          mb-1.5
        "
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        required
        className="
          w-full h-12 px-4
          bg-bg-soft/30
          border border-rule
          focus:border-teal-bright focus:outline-none
          rounded
          font-sans text-ivory text-[15px]
          placeholder:text-ivory-faint/60
          transition-colors duration-200
        "
      />
    </div>
  )
}
