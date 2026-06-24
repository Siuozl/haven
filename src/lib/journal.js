// Journal data access. Talks to Firestore when configured, otherwise to
// localStorage so the journal is fully usable in demo mode. Both paths expose
// the same small API the Journal page consumes.

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase'

function lsKey(uid) {
  return `haven_entries_${uid}`
}

function readLocal(uid) {
  try {
    return JSON.parse(localStorage.getItem(lsKey(uid)) || '[]')
  } catch {
    return []
  }
}

function writeLocal(uid, entries) {
  localStorage.setItem(lsKey(uid), JSON.stringify(entries))
  // Notify same-tab listeners (storage event only fires across tabs).
  window.dispatchEvent(new CustomEvent('haven-entries-changed', { detail: { uid } }))
}

/**
 * Subscribe to a user's entries, newest first.
 * @returns an unsubscribe function.
 */
export function subscribeEntries(uid, callback) {
  if (isFirebaseConfigured) {
    const q = query(
      collection(db, 'users', uid, 'entries'),
      orderBy('createdAt', 'desc')
    )
    return onSnapshot(q, (snap) => {
      const entries = snap.docs.map((d) => {
        const data = d.data()
        return {
          id: d.id,
          ...data,
          // Normalize Firestore Timestamp -> millis for the UI.
          createdAtMs: data.createdAt?.toMillis?.() ?? Date.now(),
        }
      })
      callback(entries)
    })
  }

  // local
  const emit = () => {
    const entries = readLocal(uid).sort((a, b) => b.createdAtMs - a.createdAtMs)
    callback(entries)
  }
  emit()
  const handler = (e) => {
    if (!e.detail || e.detail.uid === uid) emit()
  }
  window.addEventListener('haven-entries-changed', handler)
  return () => window.removeEventListener('haven-entries-changed', handler)
}

export async function addEntry(uid, data) {
  if (isFirebaseConfigured) {
    await addDoc(collection(db, 'users', uid, 'entries'), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return
  }
  const entries = readLocal(uid)
  const now = Date.now()
  entries.push({
    id: 'e-' + now + '-' + Math.random().toString(36).slice(2, 7),
    ...data,
    createdAtMs: now,
    updatedAtMs: now,
  })
  writeLocal(uid, entries)
}

export async function updateEntry(uid, id, data) {
  if (isFirebaseConfigured) {
    await updateDoc(doc(db, 'users', uid, 'entries', id), {
      ...data,
      updatedAt: serverTimestamp(),
    })
    return
  }
  const entries = readLocal(uid).map((e) =>
    e.id === id ? { ...e, ...data, updatedAtMs: Date.now() } : e
  )
  writeLocal(uid, entries)
}

export async function deleteEntry(uid, id) {
  if (isFirebaseConfigured) {
    await deleteDoc(doc(db, 'users', uid, 'entries', id))
    return
  }
  const entries = readLocal(uid).filter((e) => e.id !== id)
  writeLocal(uid, entries)
}
