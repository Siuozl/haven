import Icon from './Icon'

export default function CrisisBanner() {
  return (
    <div className="crisis" role="region" aria-label="Crisis help">
      <div className="crisis-inner">
        <Icon name="phone" size={16} />
        <span>
          <strong>In crisis or unsafe right now?</strong> Call or text{' '}
          <a href="tel:988">988</a> (US) or your local emergency number. You’re not alone.
        </span>
      </div>
    </div>
  )
}
