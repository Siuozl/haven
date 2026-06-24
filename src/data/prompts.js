// Mood options and writing prompts for the journal.

export const moods = [
  { id: 'great', label: 'Great', emoji: '😄', color: '#5fb37e' },
  { id: 'good', label: 'Good', emoji: '🙂', color: '#7bae9a' },
  { id: 'okay', label: 'Okay', emoji: '😐', color: '#c9b878' },
  { id: 'low', label: 'Low', emoji: '😔', color: '#7d9bc4' },
  { id: 'rough', label: 'Rough', emoji: '😣', color: '#c98b8b' },
  { id: 'anxious', label: 'Anxious', emoji: '😰', color: '#b48bc9' },
]

export function moodById(id) {
  return moods.find((m) => m.id === id) || null
}

export const prompts = [
  'What’s one thing that went okay today?',
  'What’s taking up the most space in your mind right now?',
  'Name one thing you’re grateful for, however small.',
  'How does your body feel right now?',
  'What would you say to a friend who had your day?',
  'What’s something you’re looking forward to?',
  'What drained you today? What gave you energy?',
  'If today had a color, what would it be and why?',
  'What’s one kind thing you can do for yourself tomorrow?',
  'What’s a worry you can put down for tonight?',
  'Who or what made you feel supported recently?',
  'What did you learn about yourself this week?',
]

export function randomPrompt(exclude) {
  const pool = prompts.filter((p) => p !== exclude)
  return pool[Math.floor(Math.random() * pool.length)]
}
