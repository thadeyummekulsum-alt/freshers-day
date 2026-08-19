# The New Wave — Freshers Celebration Invitation

A single-website, multi-file digital invitation for the B.Sc. Artificial
Intelligence Freshers Celebration at Marudhar Kesari Jain College for
Women, Vaniyambadi.

## Folder structure
```
freshers-invite/
├── index.html        → main page (structure)
├── css/
│   └── style.css      → all styling (black & crimson cinematic theme)
├── js/
│   └── script.js       → curtain reveal, confetti, countdown, RSVP, calendar
├── audio/
│   └── ambient.mp3      → ⚠️ add your own royalty-free music file here (see below)
└── README.md
```

## Before you launch it

1. **Add background music** (required for the mute/unmute button to have
   anything to play). Copyright rules mean I can't embed or hot-link a
   licensed track for you. Download a royalty-free instrumental (e.g. from
   Pixabay Music, Mixkit, or Uppbeat — all offer free, no-attribution
   tracks) and save it as:
   ```
   audio/ambient.mp3
   ```
   The site works fine even without this file — the curtain, confetti,
   countdown, and RSVP all function; the mute button will simply have
   nothing to play until you add a track.

2. **Set the real event date.** Open `js/script.js` and edit this line near
   the top:
   ```js
   const EVENT_DATE = new Date(2026, 7, 20, 10, 0); // year, month(0-11), day, hour, minute
   ```
   This single line drives both the live countdown and the "Add to Google
   Calendar" button.

3. **Open `index.html`** in any browser (double-click it, or serve the
   folder with any static server) — no build step needed.

## Notes
- Fonts: Cinzel, Playfair Display, Montserrat (Google Fonts CDN)
- Framework: Bootstrap 5 (CDN) — used for the grid/form only; visual style
  is fully custom
- Confetti: canvas-confetti (CDN)
- Fully responsive, keyboard-focus visible, and respects
  `prefers-reduced-motion`
