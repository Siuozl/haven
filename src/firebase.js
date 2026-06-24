// Firebase initialization for Haven.
//
// Reads config from Vite env vars (see .env.example). If those aren't filled
// in yet, the app runs in a local "demo mode" (localStorage) so you can try
// everything immediately. The moment you add real config to .env and restart,
// the same UI talks to real Firebase Auth + Firestore instead.

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// We consider Firebase "configured" only when the essential values are present
// and not the placeholder strings from .env.example.
function looksReal(value) {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    !value.startsWith('your-')
  )
}

export const isFirebaseConfigured =
  looksReal(firebaseConfig.apiKey) &&
  looksReal(firebaseConfig.projectId) &&
  looksReal(firebaseConfig.appId)

let app = null
let auth = null
let db = null

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
}

export { app, auth, db }
