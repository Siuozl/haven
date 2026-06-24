import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to the top whenever the route changes (unless a hash anchor is set).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])
  return null
}
