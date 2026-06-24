import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

// ---- Local demo fallback (used only when Firebase isn't configured) --------
// This keeps the whole app usable before you paste your Firebase keys in.
// It is NOT secure and is never used once real config is present.
const LS_USERS = 'haven_demo_users'
const LS_SESSION = 'haven_demo_session'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS) || '{}')
  } catch {
    return {}
  }
}
function writeUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users))
}

function friendlyError(code) {
  const map = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'That doesn’t look like a valid email address.',
    'auth/weak-password': 'Please choose a password with at least 6 characters.',
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/operation-not-allowed':
      'Email/Password sign-in isn’t turned on yet. Enable it in Firebase console → Authentication → Sign-in method.',
    'auth/configuration-not-found':
      'Firebase Authentication isn’t set up yet. In the console, open Authentication → Get started, then enable Email/Password.',
    'auth/network-request-failed': 'Network problem reaching Firebase. Check your connection and try again.',
  }
  return map[code] || 'Something went wrong. Please try again.'
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isFirebaseConfigured) {
      const unsub = onAuthStateChanged(auth, (user) => {
        setCurrentUser(
          user ? { uid: user.uid, email: user.email, name: user.displayName } : null
        )
        setLoading(false)
      })
      return unsub
    }

    // Local demo mode: restore session from localStorage.
    try {
      const session = JSON.parse(localStorage.getItem(LS_SESSION) || 'null')
      setCurrentUser(session)
    } catch {
      setCurrentUser(null)
    }
    setLoading(false)
  }, [])

  async function signup(email, password, name) {
    email = email.trim().toLowerCase()
    if (isFirebaseConfigured) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        if (name) await updateProfile(cred.user, { displayName: name })
        return cred.user
      } catch (err) {
        throw new Error(friendlyError(err.code))
      }
    }

    // demo
    const users = readUsers()
    if (users[email]) throw new Error(friendlyError('auth/email-already-in-use'))
    if (password.length < 6) throw new Error(friendlyError('auth/weak-password'))
    const uid = 'demo-' + Math.random().toString(36).slice(2, 11)
    users[email] = { uid, password, name: name || '' }
    writeUsers(users)
    const session = { uid, email, name: name || '' }
    localStorage.setItem(LS_SESSION, JSON.stringify(session))
    setCurrentUser(session)
    return session
  }

  async function login(email, password) {
    email = email.trim().toLowerCase()
    if (isFirebaseConfigured) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password)
        return cred.user
      } catch (err) {
        throw new Error(friendlyError(err.code))
      }
    }

    // demo
    const users = readUsers()
    const record = users[email]
    if (!record) throw new Error(friendlyError('auth/user-not-found'))
    if (record.password !== password) throw new Error(friendlyError('auth/wrong-password'))
    const session = { uid: record.uid, email, name: record.name || '' }
    localStorage.setItem(LS_SESSION, JSON.stringify(session))
    setCurrentUser(session)
    return session
  }

  async function logout() {
    if (isFirebaseConfigured) {
      await signOut(auth)
      return
    }
    localStorage.removeItem(LS_SESSION)
    setCurrentUser(null)
  }

  async function resetPassword(email) {
    email = email.trim().toLowerCase()
    if (isFirebaseConfigured) {
      try {
        await sendPasswordResetEmail(auth, email)
      } catch (err) {
        throw new Error(friendlyError(err.code))
      }
      return
    }
    // demo: no email to send, just confirm the account exists.
    const users = readUsers()
    if (!users[email]) throw new Error(friendlyError('auth/user-not-found'))
  }

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    authMode: isFirebaseConfigured ? 'firebase' : 'local',
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
