import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { crisisLines } from '../data/resources'
import { tips } from '../data/tips'
import { useAuth } from '../context/AuthContext'

const features = [
  {
    icon: 'compass',
    title: 'Find real help',
    text: 'Hand-picked helplines, chat services, and trusted organizations — many free, all youth-friendly.',
    to: '/resources',
    cta: 'Browse resources',
  },
  {
    icon: 'sun',
    title: 'Learn what helps',
    text: 'Short, practical guides for anxiety, low days, sleep, school stress, and more.',
    to: '/tips',
    cta: 'Read the tips',
  },
  {
    icon: 'journal',
    title: 'Keep a private journal',
    text: 'A calm space to check in daily, track your mood, and notice patterns over time. Only you can see it.',
    to: '/journal',
    cta: 'Start journaling',
  },
]

export default function Home() {
  const { currentUser } = useAuth()

  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">You don’t have to figure it out alone</span>
            <h1 className="display" style={{ marginTop: 14 }}>
              A calm place for your mind.
            </h1>
            <p className="lead">
              Haven brings together trustworthy mental health support, practical tips,
              and a private journal — designed especially for young people. Free, always.
            </p>
            <div className="hero-cta">
              <Link to={currentUser ? '/journal' : '/signup'} className="btn btn-primary btn-lg">
                {currentUser ? 'Open your journal' : 'Start your journal'}
                <Icon name="arrowRight" size={18} />
              </Link>
              <Link to="/resources" className="btn btn-ghost btn-lg">
                Get help now
              </Link>
            </div>
            <p className="hero-reassure">
              <Icon name="lock" size={15} /> Private by design · No cost · No judgment
            </p>
          </div>

          <div className="hero-art">
            <div className="breath" aria-hidden="true">
              <div className="breath-orb" />
              <div className="breath-orb b2" />
              <div className="breath-orb b3" />
              <span className="breath-label">Breathe in… and out</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick crisis strip */}
      <section className="container" style={{ marginTop: -28, position: 'relative', zIndex: 2 }}>
        <div className="callout callout-info">
          <div style={{ color: 'var(--ocean-deep)' }}>
            <Icon name="phone" size={26} />
          </div>
          <div style={{ flex: 1 }}>
            <h4>Need to talk to someone right now?</h4>
            <p>
              These are free and available 24/7. If you’re in immediate danger, call your
              local emergency number.
            </p>
            <div className="chips" style={{ marginTop: 12 }}>
              {crisisLines.slice(0, 3).map((c) => (
                <a
                  key={c.name}
                  className="chip"
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong style={{ color: 'var(--ink)' }}>{c.name}</strong> · {c.contact}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Three ways Haven helps</span>
            <h2 className="section-title">Support that meets you where you are</h2>
          </div>
          <div className="grid grid-3">
            {features.map((f) => (
              <Link key={f.title} to={f.to} className="card card-hover feature">
                <span className="feature-icon">
                  <Icon name={f.icon} size={26} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <span className="resource-link" style={{ marginTop: 'auto' }}>
                  {f.cta} <Icon name="arrowRight" size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Journal showcase */}
      <section className="section" style={{ background: 'var(--bg-soft)', borderBlock: '1px solid var(--line)' }}>
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">The journal</span>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              Like a journal app — but online, and totally private.
            </h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Open Haven, pick how you’re feeling, and write. Gentle prompts help when you
              don’t know where to start. Your entries are saved to your account and synced
              securely, so they’re there whenever you come back.
            </p>
            <ul className="home-list">
              {[
                'Daily check-ins with a simple mood picker',
                'Writing prompts when you’re stuck',
                'A timeline of past entries to look back on',
                'Private to you — protected by your login',
              ].map((t) => (
                <li key={t}>
                  <Icon name="check" size={18} /> {t}
                </li>
              ))}
            </ul>
            <Link to={currentUser ? '/journal' : '/signup'} className="btn btn-primary" style={{ marginTop: 24 }}>
              {currentUser ? 'Open your journal' : 'Create a free account'}
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>

          <div className="journal-preview" aria-hidden="true">
            <div className="jp-card">
              <div className="jp-row">
                <span className="jp-mood">🙂</span>
                <div>
                  <div className="jp-date">Today · 9:14 PM</div>
                  <div className="jp-title">A pretty okay day</div>
                </div>
              </div>
              <p>Got through the presentation I was dreading. Still anxious but proud I showed up…</p>
            </div>
            <div className="jp-card jp-card-2">
              <div className="jp-row">
                <span className="jp-mood">😌</span>
                <div>
                  <div className="jp-date">Yesterday</div>
                  <div className="jp-title">Walk after school</div>
                </div>
              </div>
              <p>The fresh air helped more than I expected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips preview */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Practical tips</span>
            <h2 className="section-title">Small things that actually help</h2>
          </div>
          <div className="grid grid-3">
            {tips.slice(0, 6).map((t) => (
              <Link key={t.slug} to={`/tips/${t.slug}`} className="card card-hover feature">
                <span style={{ fontSize: '2rem' }}>{t.emoji}</span>
                <h3 style={{ fontSize: '1.18rem' }}>{t.title}</h3>
                <p>{t.summary}</p>
                <span className="resource-link" style={{ marginTop: 'auto' }}>
                  Read · {t.readingTime} <Icon name="arrowRight" size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container" style={{ paddingBottom: 80 }}>
        <div className="cta-band">
          <h2 className="section-title" style={{ color: '#fff' }}>
            Your mind deserves a soft place to land.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '52ch', margin: '12px auto 0' }}>
            Start a journal, explore resources, or just take a breath. Whatever you need today,
            Haven is here for it.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 26 }}>
            <Link to={currentUser ? '/journal' : '/signup'} className="btn btn-lg" style={{ background: '#fff', color: 'var(--sage-deep)' }}>
              {currentUser ? 'Open your journal' : 'Get started — it’s free'}
            </Link>
            <Link to="/resources" className="btn btn-lg btn-ghost" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>
              Explore resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
