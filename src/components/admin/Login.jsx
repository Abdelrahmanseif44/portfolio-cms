import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../firebase/auth'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const { user, isAdmin, loading: authLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  if (!authLoading && user && isAdmin) return <Navigate to="/admin" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch {
      setError('Incorrect email or password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mist px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-paper border border-ink p-8">
        <p className="label-tag mb-1">Admin</p>
        <h1 className="font-display font-extrabold text-2xl mb-6">Sign in</h1>

        <label className="label-tag block mb-1.5">Email</label>
        <input
          type="email"
          required
          className="field mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />

        <label className="label-tag block mb-1.5">Password</label>
        <input
          type="password"
          required
          className="field mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="font-mono text-xs bg-red-600 text-white px-3 py-2 mb-4">{error}</p>
        )}

        <button type="submit" className="btn-solid w-full justify-center" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
