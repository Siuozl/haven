import { useParams, Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { getTip, tips } from '../data/tips'

function Block({ block }) {
  if (block.type === 'h') return <h2 className="article-h">{block.text}</h2>
  if (block.type === 'list')
    return (
      <ul className="article-list">
        {block.items.map((item, i) => (
          <li key={i}>
            <Icon name="check" size={16} /> <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  return <p className="article-p">{block.text}</p>
}

export default function TipDetail() {
  const { slug } = useParams()
  const tip = getTip(slug)

  if (!tip) {
    return (
      <div className="container section text-center">
        <h1 className="section-title">We couldn’t find that tip</h1>
        <p className="section-sub" style={{ margin: '12px auto 24px' }}>
          It may have moved. Here are all of our guides.
        </p>
        <Link to="/tips" className="btn btn-primary">Back to all tips</Link>
      </div>
    )
  }

  const others = tips.filter((t) => t.slug !== tip.slug).slice(0, 3)

  return (
    <div className="fade-in">
      <header className="page-head">
        <div className="container" style={{ maxWidth: 760 }}>
          <Link to="/tips" className="resource-link" style={{ marginBottom: 14 }}>
            ← All tips
          </Link>
          <div style={{ fontSize: '3rem', lineHeight: 1, marginTop: 8 }}>{tip.emoji}</div>
          <h1 className="display" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', marginTop: 14 }}>
            {tip.title}
          </h1>
          <div className="chips" style={{ marginTop: 16 }}>
            <span className="chip"><Icon name="book" size={14} /> {tip.readingTime} read</span>
          </div>
        </div>
      </header>

      <article className="container article" style={{ maxWidth: 760, paddingBlock: 44 }}>
        {tip.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        <div className="callout callout-info" style={{ marginTop: 36 }}>
          <div style={{ color: 'var(--ocean-deep)' }}>
            <Icon name="journal" size={24} />
          </div>
          <div>
            <h4>Want to put this into practice?</h4>
            <p>
              Your Haven journal is a great place to reflect on how these ideas land for you.
            </p>
            <Link to="/journal" className="btn btn-primary" style={{ marginTop: 14 }}>
              Open your journal <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </article>

      <section className="container section" style={{ paddingTop: 0 }}>
        <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: 22 }}>
          Keep reading
        </h2>
        <div className="grid grid-3">
          {others.map((t) => (
            <Link key={t.slug} to={`/tips/${t.slug}`} className="card card-hover feature">
              <span style={{ fontSize: '2rem' }}>{t.emoji}</span>
              <h3 style={{ fontSize: '1.12rem' }}>{t.title}</h3>
              <p>{t.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
