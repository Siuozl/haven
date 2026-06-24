import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/resources', label: 'Resources' },
  { to: '/tips', label: 'Tips' },
  { to: '/journal', label: 'Journal' },
  { to: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const close = () => setOpen(false)

  async function handleLogout() {
    await logout()
    close()
    navigate('/')
  }

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">
            <Icon name="feather" size={20} stroke={2} />
          </span>
          Haven
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={close}
            >
              {l.label}
            </NavLink>
          ))}

          {/* Auth actions — only rendered inside the mobile dropdown */}
          <div className="only-mobile nav-mobile-auth">
            {currentUser ? (
              <button className="btn btn-primary btn-block" onClick={handleLogout}>
                Sign out
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-block" onClick={close}>
                  Sign in
                </Link>
                <Link to="/signup" className="btn btn-primary btn-block" onClick={close}>
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="nav-actions">
          {currentUser ? (
            <>
              <Link to="/journal" className="btn btn-primary nav-cta-desktop">
                Open journal
              </Link>
              <button className="btn btn-ghost nav-cta-desktop" onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link nav-cta-desktop">
                Sign in
              </Link>
              <Link to="/signup" className="btn btn-primary nav-cta-desktop">
                Get started
              </Link>
            </>
          )}
          <button
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}
