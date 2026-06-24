import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default function About() {
  return (
    <div className="fade-in">
      <header className="page-head">
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="eyebrow">About</span>
          <h1 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 10 }}>
            Why Haven exists
          </h1>
        </div>
      </header>

      <article className="container article" style={{ maxWidth: 760, paddingBlock: 44 }}>
        <p className="article-p">
          Growing up can be heavy. Between school, friendships, family, and figuring out who
          you are, it’s easy to feel overwhelmed — and easy to feel like you’re the only one.
          You’re not.
        </p>
        <p className="article-p">
          Haven was built to be a calm, safe corner of the internet for young people: a place
          to find real help, learn a few things that actually make hard days easier, and keep a
          private journal to check in with yourself.
        </p>

        <h2 className="article-h">What we believe</h2>
        <ul className="article-list">
          <li><Icon name="check" size={16} /> <span>Asking for help is a strength, not a weakness.</span></li>
          <li><Icon name="check" size={16} /> <span>Support should be free and easy to reach.</span></li>
          <li><Icon name="check" size={16} /> <span>Your private thoughts should stay private.</span></li>
          <li><Icon name="check" size={16} /> <span>Small steps count. You don’t have to fix everything at once.</span></li>
        </ul>

        <div className="callout callout-danger" style={{ marginTop: 30 }}>
          <div style={{ color: 'var(--danger-deep)' }}>
            <Icon name="shield" size={26} />
          </div>
          <div>
            <h4>An important note</h4>
            <p>
              Haven is not a medical service and isn’t a replacement for professional care. If
              you’re in crisis, please reach out to a helpline or your local emergency services —
              you deserve real, human support.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/resources" className="btn btn-primary">Explore resources</Link>
          <Link to="/journal" className="btn btn-ghost">Start your journal</Link>
        </div>
      </article>
    </div>
  )
}
