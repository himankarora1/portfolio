# Himank Arora — Portfolio

Dual-identity personal site for **Himank Arora**:

- **Hub** (`/`) — choose Tech or Artist
- **Tech** (`/tech`) — Technical Analyst & Developer portfolio
- **Artist** (`/artist`) — music, gaming, and content creator portfolio

**Live:** [himankarora.com](https://himankarora.com)

---

## Stack

- React 18 (Create React App)
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React + custom brand social icons
- React Helmet Async (SEO)
- Vercel serverless function for contact email (`api/send-email.js`)
- YouTube Data API (Artist Work gallery)
- Google Analytics (optional)

---

## Site map

| Path | Purpose |
|------|---------|
| `/` | Dual-path hub |
| `/tech` | Tech portfolio (single-page sections) |
| `/artist` | Artist home + cinematic welcome |
| `/artist/about` | Artist about |
| `/artist/work` | Music / gaming YouTube work |
| `/artist/contact` | Artist contact |
| `/privacy`, `/terms`, `/sitemap` | Legal |

**Theme model**

- Hub: cyan + amber
- Tech: cyan / glass / dark grid
- Artist: amber accents + charcoal surfaces

---

## Getting started

```bash
npm install
npm start
```

App runs at [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build → build/
npm test        # test runner
```

Deployed from `main` on Vercel.

---

## Environment variables

Create a `.env` in the project root for local development. On Vercel, set the same keys in Project Settings → Environment Variables.

### Frontend (CRA — must be prefixed with `REACT_APP_`)

| Variable | Purpose |
|----------|---------|
| `REACT_APP_YOUTUBE_API_KEY` | YouTube Data API key (Artist Work) |
| `REACT_APP_MUSIC_CHANNEL_ID` | Music channel ID |
| `REACT_APP_GAMING_CHANNEL_ID` | Gaming channel ID |
| `REACT_APP_GA_MEASUREMENT_ID` | Google Analytics measurement ID (optional) |

### Serverless contact form (`api/send-email.js`)

| Variable | Purpose |
|----------|---------|
| `GMAIL_USER` | Gmail address that sends form mail |
| `GMAIL_APP_PASSWORD` | Gmail app password |

Without Gmail vars, contact forms will fail in production. Without YouTube vars, Artist Work falls back / shows API errors.

---

## Project structure (high level)

```
src/
  pages/           # Hub, Tech, Artist, Legal
  components/      # Shared UI, SEO, Analytics, Artist chrome
  services/        # YouTube API + cache
  utils/           # contentManager, artistMedia, layout tokens
  context/         # Theme context (legacy; site is dark-by-design)
api/
  send-email.js    # Vercel serverless contact handler
public/
  images/          # OG + artist stills
  videos/artist/   # Home montage clips
```

Content and copy live mainly in `src/utils/contentManager.js`.  
Artist media paths live in `src/utils/artistMedia.js`.

---

## Notes

- Artist welcome intro runs once per browser tab session (or when arriving from the hub).
- Service worker lives in `public/sw.js` — bump cache version when shipping major asset changes.
- Do not commit secrets (`.env`). Use Vercel env for production.

---

## License

Personal portfolio — all rights reserved © Himank Arora.
