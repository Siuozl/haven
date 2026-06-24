import Icon from '../components/Icon'
import { crisisLines, categories, international } from '../data/resources'

const catColors = {
  'talk-now': '#5a8a9c',
  learn: '#79ad99',
  specific: '#c47a7a',
  tools: '#a996cf',
}

function ResourceCard({ item }) {
  return (
    <div className="card resource">
      <h4>{item.name}</h4>
      <p>{item.blurb}</p>
      {item.contact && <div className="resource-contact">{item.contact}</div>}
      <a className="resource-link" href={item.href} target="_blank" rel="noopener noreferrer">
        Visit <Icon name="external" size={15} />
      </a>
    </div>
  )
}

export default function Resources() {
  return (
    <div className="fade-in">
      <header className="page-head">
        <div className="container">
          <span className="eyebrow">Resources</span>
          <h1 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 10 }}>
            Real help, in one calm place
          </h1>
          <p className="lead">
            A curated list of trustworthy helplines, chat services, and organizations.
            Many are free and built for young people. Haven isn’t affiliated with these —
            they’re simply good places to turn.
          </p>
        </div>
      </header>

      <div className="container section" style={{ paddingTop: 40 }}>
        {/* Emergency callout */}
        <div className="callout callout-danger" style={{ marginBottom: 40 }}>
          <div style={{ color: 'var(--danger-deep)' }}>
            <Icon name="shield" size={28} />
          </div>
          <div>
            <h4>If you’re in immediate danger</h4>
            <p>
              Call your local emergency number now (911 in the US). In the US you can also
              call or text <a href="tel:988" style={{ color: 'var(--danger-deep)', fontWeight: 700 }}>988</a>{' '}
              to reach the Suicide &amp; Crisis Lifeline, 24/7. Your safety comes first.
            </p>
          </div>
        </div>

        {/* Anchor nav */}
        <nav className="anchor-nav" aria-label="Jump to section">
          <a href="#crisis">Crisis lines</a>
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`}>{c.title}</a>
          ))}
          <a href="#international">International</a>
        </nav>

        {/* Crisis lines */}
        <section id="crisis" style={{ scrollMarginTop: 90 }}>
          <div className="cat-head">
            <span className="cat-icon" style={{ background: '#c47a7a' }}>
              <Icon name="phone" size={22} />
            </span>
            <div>
              <h2 className="section-title" style={{ fontSize: '1.7rem' }}>Talk to someone now</h2>
              <p className="section-sub">Free, confidential, and available 24/7.</p>
            </div>
          </div>
          <div className="grid grid-2">
            {crisisLines.map((item) => (
              <ResourceCard key={item.name} item={item} />
            ))}
          </div>
        </section>

        {/* Categories */}
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} style={{ scrollMarginTop: 90, marginTop: 56 }}>
            <div className="cat-head">
              <span className="cat-icon" style={{ background: catColors[cat.id] || 'var(--sage)' }}>
                <Icon name={cat.icon} size={22} />
              </span>
              <div>
                <h2 className="section-title" style={{ fontSize: '1.7rem' }}>{cat.title}</h2>
                <p className="section-sub">{cat.description}</p>
              </div>
            </div>
            <div className="grid grid-2">
              {cat.items.map((item) => (
                <ResourceCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))}

        {/* International */}
        <section id="international" style={{ scrollMarginTop: 90, marginTop: 56 }}>
          <div className="cat-head">
            <span className="cat-icon" style={{ background: '#5a8a9c' }}>
              <Icon name="compass" size={22} />
            </span>
            <div>
              <h2 className="section-title" style={{ fontSize: '1.7rem' }}>Outside the US</h2>
              <p className="section-sub">Find support wherever you are in the world.</p>
            </div>
          </div>
          <div className="grid grid-3">
            {international.map((item) => (
              <a
                key={item.name}
                className="card card-hover resource"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4>{item.name}</h4>
                <p>{item.blurb}</p>
                <span className="resource-link">Visit <Icon name="external" size={15} /></span>
              </a>
            ))}
          </div>
        </section>

        <p className="text-center" style={{ color: 'var(--muted)', marginTop: 56, fontSize: '0.9rem' }}>
          Links open in a new tab. If a number or service has changed, please double-check
          locally — and thank you for looking out for yourself or someone you care about. 💚
        </p>
      </div>
    </div>
  )
}
