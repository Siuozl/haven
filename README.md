# Haven 🌿

A calm, well-designed mental health resource hub for young people, with a private
daily journal. Built with **React + Vite** and **Firebase** (Email/Password auth +
Firestore).

- **Resources** — curated, real helplines & organizations (US + international)
- **Tips** — short, practical guides (anxiety, low mood, sleep, exam stress, panic, etc.)
- **Journal** — an iPhone-Journal-style private journal with mood tracking & prompts
- **FAQ / About**
- Footer: _Made by Snizzle © 2026_

> Haven runs in a local **demo mode** out of the box (accounts + entries saved in your
> browser) so you can try everything immediately. Add your Firebase config to switch on
> real, synced cloud accounts.

---

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). Without Firebase config it
runs in demo mode — sign up, journal, everything works locally.

---

## 2. Turn on real Firebase (Email/Password + Firestore)

You have a Firebase project (number `353887280737`). Finish wiring it up:

### a. Register a Web App & get config
1. Go to the [Firebase console](https://console.firebase.google.com/) → your project.
2. **Project settings** (gear icon) → **Your apps** → **Add app** → **Web** (`</>`).
3. Give it a nickname (e.g. "Haven web") and register. Copy the `firebaseConfig` values.

### b. Add the config to `.env`
Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=353887280737
VITE_FIREBASE_APP_ID=1:353887280737:web:...
```

Restart `npm run dev`. The demo-mode banners disappear once it detects real config.

### c. Enable Email/Password sign-in
Firebase console → **Build → Authentication → Get started → Sign-in method** →
enable **Email/Password**.

### d. Create the Firestore database
Firebase console → **Build → Firestore Database → Create database** (Production mode is
fine — the included rules secure it).

### e. Deploy the security rules
The rules in `firestore.rules` make sure each user can only read/write their **own**
journal. Deploy them with the Firebase CLI:

```bash
firebase login
firebase use 353887280737      # or your project id
firebase deploy --only firestore:rules
```

---

## 3. Deploy the site (optional)

```bash
npm run build
firebase deploy --only hosting
```

(`firebase.json` is preconfigured for SPA hosting from `dist/`.)

---

## Data model

Journal entries live at `users/{uid}/entries/{entryId}`:

| field       | type      | notes                          |
| ----------- | --------- | ------------------------------ |
| `title`     | string    | optional                       |
| `body`      | string    | the entry text                 |
| `mood`      | string    | one of the mood ids            |
| `createdAt` | timestamp | server timestamp               |
| `updatedAt` | timestamp | server timestamp               |

Security rules restrict every read/write to the document owner.

---

## Notes

- Haven is for support and reflection — **not** a medical service or a substitute for
  professional or emergency care. All linked organizations are independent; Haven is not
  affiliated with them.
- Crisis numbers can change. Please verify them locally if anything looks out of date.

Made by Snizzle © 2026
