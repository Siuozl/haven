import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { tips } from '../data/tips'

export default function Tips() {
  return (
    <div className="fade-in">
      <header className="page-head">
        <div className="container">
          <span className="eyebrow">Tips & guides</span>
          <h1 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 10 }}>
            Practical things that help
          </h1>
          <p className="lead">
            Short, judgment-free guides for the moments that feel hard. No jargon — just
            small steps you can actually try today.
          </p>
        </div>
      </header>

      <div className="container section" style={{ paddingTop: 44 }}>
        <div className="grid grid-3">
          {tips.map((t) => (
            <Link key={t.slug} to={`/tips/${t.slug}`} className="card card-hover feature">
              <span style={{ fontSize: '2.2rem' }}>{t.emoji}</span>
              <h3 style={{ fontSize: '1.22rem' }}>{t.title}</h3>
              <p>{t.summary}</p>
              <span className="resource-link" style={{ marginTop: 'auto' }}>
                Read · {t.readingTime} <Icon name="arrowRight" size={16} />
              </span>
            </Link>
          ))}
        </div>

        <div className="callout callout-info" style={{ marginTop: 48 }}>
          <div style={{ color: 'var(--ocean-deep)' }}>
            <Icon name="heart" size={26} />
          </div>
          <div>
            <h4>These tips aren’t a replacement for real support</h4>
            <p>
              If something feels too big to handle on your own, that’s not a weakness — it’s
              human. Talking to a trusted adult, doctor, counselor, or a helpline on our{' '}
              <Link to="/resources" style={{ color: 'var(--ocean-deep)', fontWeight: 600 }}>Resources</Link>{' '}
              page can make a real difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
