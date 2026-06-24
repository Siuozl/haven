import { useEffect, useMemo, useState } from 'react'
import Icon from '../components/Icon'
import { useAuth } from '../context/AuthContext'
import { subscribeEntries, addEntry, updateEntry, deleteEntry } from '../lib/journal'
import { moods, moodById, randomPrompt } from '../data/prompts'

/* ---------- date helpers ---------- */
function startOfDay(ms) {
  const d = new Date(ms)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}
function dayLabel(ms) {
  const today = startOfDay(Date.now())
  const day = startOfDay(ms)
  const diff = Math.round((today - day) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  return new Date(ms).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}
function timeLabel(ms) {
  return new Date(ms).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}
function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

/* ---------- streak / stats ---------- */
function computeStats(entries) {
  const total = entries.length
  const days = new Set(entries.map((e) => startOfDay(e.createdAtMs)))
  let streak = 0
  let cursor = startOfDay(Date.now())
  // Allow the streak to count even if today has no entry yet.
  if (!days.has(cursor)) cursor -= 86400000
  while (days.has(cursor)) {
    streak += 1
    cursor -= 86400000
  }
  const weekAgo = Date.now() - 7 * 86400000
  const thisWeek = entries.filter((e) => e.createdAtMs >= weekAgo).length
  return { total, streak, thisWeek }
}

/* ============================================================
   Composer (modal)
   ============================================================ */
function Composer({ initial, onClose, onSave }) {
  const [mood, setMood] = useState(initial?.mood || 'okay')
  const [title, setTitle] = useState(initial?.title || '')
  const [body, setBody] = useState(initial?.body || '')
  const [prompt, setPrompt] = useState(() => randomPrompt())
  const [busy, setBusy] = useState(false)
  const isEdit = Boolean(initial)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  async function handleSave() {
    if (!body.trim()) return
    setBusy(true)
    try {
      await onSave({ mood, title: title.trim(), body: body.trim() })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal composer fade-in"
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? 'Edit entry' : 'New journal entry'}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="composer-head">
          <h2>{isEdit ? 'Edit entry' : 'New entry'}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="composer-body">
          <label className="composer-label">How are you feeling?</label>
          <div className="mood-row">
            {moods.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`mood-btn ${mood === m.id ? 'selected' : ''}`}
                style={mood === m.id ? { borderColor: m.color, background: m.color + '22' } : undefined}
                onClick={() => setMood(m.id)}
                aria-pressed={mood === m.id}
              >
                <span className="mood-emoji">{m.emoji}</span>
                <span className="mood-label">{m.label}</span>
              </button>
            ))}
          </div>

          <input
            className="input composer-title"
            placeholder="Give it a title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
          />

          <div className="prompt-chip" onClick={() => setPrompt(randomPrompt(prompt))} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setPrompt(randomPrompt(prompt)) }}>
            <Icon name="sparkle" size={15} />
            <span>{prompt}</span>
            <span className="prompt-shuffle">shuffle ↻</span>
          </div>

          <textarea
            className="input composer-text"
            placeholder="Write whatever’s on your mind. There’s no wrong way to do this."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={9}
            maxLength={20000}
            autoFocus
          />
        </div>

        <div className="composer-foot">
          <span className="composer-count">{body.length} characters</span>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-soft" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={busy || !body.trim()}>
              {busy ? 'Saving…' : isEdit ? 'Save changes' : 'Save entry'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Entry card
   ============================================================ */
function EntryCard({ entry, onEdit, onDelete }) {
  const [confirm, setConfirm] = useState(false)
  const mood = moodById(entry.mood)

  return (
    <article className="entry">
      <div className="entry-rail" style={{ background: mood?.color || 'var(--sage)' }} />
      <div className="entry-main">
        <div className="entry-top">
          <span className="entry-mood" title={mood?.label}>{mood?.emoji || '📝'}</span>
          <div style={{ flex: 1 }}>
            {entry.title && <h3 className="entry-title">{entry.title}</h3>}
            <div className="entry-time">{timeLabel(entry.createdAtMs)}</div>
          </div>
          <div className="entry-actions">
            <button className="icon-btn" onClick={() => onEdit(entry)} aria-label="Edit entry">
              <Icon name="edit" size={17} />
            </button>
            <button className="icon-btn danger" onClick={() => setConfirm(true)} aria-label="Delete entry">
              <Icon name="trash" size={17} />
            </button>
          </div>
        </div>
        <p className="entry-body">{entry.body}</p>

        {confirm && (
          <div className="entry-confirm">
            <span>Delete this entry? This can’t be undone.</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-soft btn-sm" onClick={() => setConfirm(false)}>Keep</button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(entry.id)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

/* ============================================================
   Journal page
   ============================================================ */
export default function Journal() {
  const { currentUser, authMode } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [composer, setComposer] = useState(null) // null | { mode:'new' } | { mode:'edit', entry }
  const [error, setError] = useState('')

  useEffect(() => {
    if (!currentUser) return
    setLoading(true)
    const unsub = subscribeEntries(currentUser.uid, (list) => {
      setEntries(list)
      setLoading(false)
    })
    return unsub
  }, [currentUser])

  const stats = useMemo(() => computeStats(entries), [entries])

  const grouped = useMemo(() => {
    const groups = []
    let current = null
    for (const e of entries) {
      const label = dayLabel(e.createdAtMs)
      if (!current || current.label !== label) {
        current = { label, items: [] }
        groups.push(current)
      }
      current.items.push(e)
    }
    return groups
  }, [entries])

  async function handleSave(data) {
    setError('')
    try {
      if (composer?.mode === 'edit') {
        await updateEntry(currentUser.uid, composer.entry.id, data)
      } else {
        await addEntry(currentUser.uid, data)
      }
      setComposer(null)
    } catch (err) {
      setError('Couldn’t save your entry. Please try again.')
      console.error(err)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteEntry(currentUser.uid, id)
    } catch (err) {
      setError('Couldn’t delete that entry. Please try again.')
      console.error(err)
    }
  }

  const name = currentUser?.name || currentUser?.email?.split('@')[0] || 'friend'

  return (
    <div className="journal-page fade-in">
      <div className="container" style={{ paddingBlock: 'clamp(28px, 5vw, 48px)' }}>
        {/* Header */}
        <div className="journal-head">
          <div>
            <span className="eyebrow">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            <h1 className="display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginTop: 8 }}>
              {greeting()}, {name}.
            </h1>
            <p className="lead" style={{ marginTop: 6, fontSize: '1.05rem' }}>
              How are you, really? Take a moment to check in.
            </p>
          </div>
          <button className="btn btn-primary btn-lg journal-new" onClick={() => setComposer({ mode: 'new' })}>
            <Icon name="plus" size={18} /> New entry
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat">
            <div className="stat-num">{stats.total}</div>
            <div className="stat-label">{stats.total === 1 ? 'Entry' : 'Entries'}</div>
          </div>
          <div className="stat">
            <div className="stat-num">{stats.streak}🔥</div>
            <div className="stat-label">Day streak</div>
          </div>
          <div className="stat">
            <div className="stat-num">{stats.thisWeek}</div>
            <div className="stat-label">This week</div>
          </div>
        </div>

        {authMode === 'local' && (
          <div className="notice" style={{ marginTop: 20 }}>
            <Icon name="lock" size={16} />
            <span>
              <strong>Demo mode:</strong> entries are saved in this browser only. Add Firebase
              config to sync them securely to your account across devices.
            </span>
          </div>
        )}

        {error && <div className="form-error" style={{ marginTop: 20 }}>{error}</div>}

        {/* Timeline */}
        <div className="timeline">
          {loading ? (
            <div className="journal-empty">
              <p>Loading your journal…</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="journal-empty card">
              <div style={{ fontSize: '2.6rem' }}>🌱</div>
              <h3>Your journal starts here</h3>
              <p>
                Writing even a sentence a day can help you notice patterns and feel a little
                lighter. No one else can see this — it’s just for you.
              </p>
              <button className="btn btn-primary" onClick={() => setComposer({ mode: 'new' })}>
                <Icon name="plus" size={18} /> Write your first entry
              </button>
            </div>
          ) : (
            grouped.map((group) => (
              <section key={group.label} className="timeline-group">
                <div className="timeline-date">
                  <Icon name="calendar" size={15} /> {group.label}
                </div>
                <div className="entry-list">
                  {group.items.map((entry) => (
                    <EntryCard
                      key={entry.id}
                      entry={entry}
                      onEdit={(e) => setComposer({ mode: 'edit', entry: e })}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      {composer && (
        <Composer
          initial={composer.mode === 'edit' ? composer.entry : null}
          onClose={() => setComposer(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
