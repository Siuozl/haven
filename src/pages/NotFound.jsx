import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container section text-center" style={{ minHeight: '60vh', display: 'grid', placeContent: 'center' }}>
      <div style={{ fontSize: '3rem' }}>🧭</div>
      <h1 className="display" style={{ fontSize: '2.4rem', marginTop: 12 }}>
        This page wandered off
      </h1>
      <p className="section-sub" style={{ margin: '12px auto 26px' }}>
        The page you’re looking for doesn’t exist — but you’re still in a good place.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">Back home</Link>
        <Link to="/resources" className="btn btn-ghost">Find resources</Link>
      </div>
    </div>
  )
}
