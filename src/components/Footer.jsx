import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function Footer() {
  const year = 2026
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <span className="brand-mark">
                <Icon name="feather" size={20} />
              </span>
              Haven
            </Link>
            <p>
              A calm, free place for young people to find support, learn what helps,
              and keep a private daily journal.
            </p>
          </div>

          <div>
            <h5>Explore</h5>
            <ul>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/tips">Tips</Link></li>
              <li><Link to="/journal">Journal</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h5>Get help now</h5>
            <ul>
              <li><a href="tel:988">Call or text 988 (US)</a></li>
              <li><a href="sms:741741&body=HOME">Text HOME to 741741</a></li>
              <li><a href="https://www.thetrevorproject.org/get-help" target="_blank" rel="noopener noreferrer">The Trevor Project</a></li>
              <li><a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer">Find a helpline</a></li>
            </ul>
          </div>

          <div>
            <h5>Account</h5>
            <ul>
              <li><Link to="/login">Sign in</Link></li>
              <li><Link to="/signup">Create account</Link></li>
              <li><Link to="/about">About Haven</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Made by Snizzle © {year}</span>
          <span>Haven is for support and reflection — not a substitute for professional or emergency care.</span>
        </div>
      </div>
    </footer>
  )
}
