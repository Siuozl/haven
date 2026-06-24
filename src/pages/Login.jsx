import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, resetPassword, authMode } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/journal'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleReset() {
    setError('')
    setInfo('')
    if (!email) {
      setError('Enter your email above first, then tap “Forgot password”.')
      return
    }
    try {
      await resetPassword(email)
      setInfo(
        authMode === 'firebase'
          ? 'If an account exists for that email, a reset link is on its way.'
          : 'In demo mode there’s no email — but that account exists. Try signing in again.'
      )
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card fade-in">
        <h1>Welcome back</h1>
        <p className="sub">Sign in to open your journal and pick up where you left off.</p>

        {authMode === 'local' && (
          <div className="notice">
            <Icon name="lock" size={16} />
            <span>
              <strong>Demo mode:</strong> Firebase isn’t configured yet, so accounts are saved
              only in this browser. Add your Firebase keys to switch on real, synced accounts.
            </span>
          </div>
        )}

        {error && <div className="form-error">{error}</div>}
        {info && <div className="form-ok">{info}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="input"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <button type="button" className="link-btn" onClick={handleReset}>
                Forgot password?
              </button>
            </div>
          </div>

          <button className="btn btn-primary btn-block btn-lg" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="auth-alt">
          New to Haven? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
