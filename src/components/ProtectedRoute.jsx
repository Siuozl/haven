import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wraps routes that require a signed-in user. Sends guests to /login and
// remembers where they were headed so we can return them after sign-in.
export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  return children
}
