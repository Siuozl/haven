import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { faqs } from '../data/faq'

function FaqItem({ item, open, onToggle }) {
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{item.q}</span>
        <span className="faq-icon"><Icon name={open ? 'close' : 'plus'} size={18} /></span>
      </button>
      <div className="faq-a-wrap">
        <p className="faq-a">{item.a}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="fade-in">
      <header className="page-head">
        <div className="container">
          <span className="eyebrow">FAQ</span>
          <h1 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 10 }}>
            Questions, answered
          </h1>
          <p className="lead">
            A few things people often wonder about Haven, privacy, and getting help.
          </p>
        </div>
      </header>

      <div className="container section" style={{ paddingTop: 44, maxWidth: 800 }}>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        <div className="callout callout-info" style={{ marginTop: 40 }}>
          <div style={{ color: 'var(--ocean-deep)' }}>
            <Icon name="heart" size={26} />
          </div>
          <div>
            <h4>Still have a question, or just need support?</h4>
            <p>
              Our <Link to="/resources" style={{ color: 'var(--ocean-deep)', fontWeight: 600 }}>Resources</Link>{' '}
              page lists free helplines and chat services with real people who are there to help.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
