# TechFest 2026 — "The Future Begins Here"

An immersive, cinematic 3D website for IIT TechFest 2026: a scroll-driven
interactive movie built with React Three Fiber, GSAP-timed transitions,
and a production Express/MongoDB backend.

**Status: all 4 build phases complete.** This is the final, deployable state.

---

## What's included, by phase

**Phase 1 — Foundation**
Vite + React 18 + TypeScript + Tailwind, design system, global chrome
(Navbar, Footer, LoadingScreen, CustomCursor), Lenis smooth scroll, and
Scene 1 (Deep Space) with the particle-formed logo intro.

**Phase 2 — Cinematic story & content**
Scenes 2–7 (Earth, Future City, AI World, Quantum Computing, Robotics
Lab, Main Arena) wired into one scroll-pinned camera journey, every main
content section (About, Events, Workshops, Speakers, Sponsors, Gallery,
Timeline, Countdown), and all 8 event detail pages.

**Phase 3 — Backend & interactivity**
Full REST API (Events, Registrations, Gallery, Sponsors, Contact,
Newsletter) with Mongoose models, express-validator validation, an
admin-key gate for CRUD, rate limiting, a seed script, and a frontend
wired to it: live search/filter, a real registration form, a real
contact form, and a working newsletter signup — all with loading,
error, and success states, falling back to bundled static content if
the API is unreachable.

**Phase 4 — Polish, performance, accessibility, deployment**
Route-level code splitting, a WebGL/`prefers-reduced-motion`-aware
static fallback so the site degrades gracefully, an error boundary
around the 3D canvases, full SEO (meta tags, Open Graph, JSON-LD,
sitemap, robots.txt), accessibility passes (skip link, focus-visible
styles, scroll-reset on navigation), Docker images for both apps, a
Compose file to run the whole stack, and CI.

---

## Project structure

\`\`\`
techfest-2026/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/       # Navbar, Footer
│   │   │   ├── three/        # All R3F scenes, camera rigs, error boundary
│   │   │   ├── sections/     # About, Events, Workshops, Speakers, ...
│   │   │   ├── ui/           # LoadingScreen, CustomCursor, forms, PageHero
│   │   │   └── utility/      # ScrollToTop
│   │   ├── context/          # LoadingContext
│   │   ├── hooks/            # useLenis, useEvents, useFormSubmit, useWebGLSupport, ...
│   │   ├── lib/               # api.ts, siteConfig, eventsData, and other content
│   │   ├── pages/             # One component per route
│   │   ├── routes/            # AppRoutes (code-split)
│   │   ├── three/             # journeyState.ts, journeyScenes.ts
│   │   └── styles/            # globals.css (design tokens)
│   ├── public/                 # favicon, manifest, robots.txt, sitemap.xml
│   ├── Dockerfile / nginx.conf
│   └── ...config files
├── backend/
│   ├── config/                 # db.js
│   ├── controllers/            # one per resource
│   ├── middleware/             # errorHandler, requireAdmin, handleValidation, writeLimiter
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # one router per resource + index.js
│   ├── seed.js                 # populates Events/Sponsors/Gallery with real content
│   ├── Dockerfile
│   ├── app.js
│   └── server.js
├── docker-compose.yml           # mongo + backend + frontend, one command
└── .github/workflows/ci.yml
\`\`\`

## Tech stack

React · TypeScript · Vite · React Three Fiber · Three.js · Drei ·
`@react-three/postprocessing` · GSAP · Framer Motion · Lenis ·
TailwindCSS · React Router · Node.js · Express · MongoDB · Mongoose ·
express-validator

---

## Local installation

### 1. Backend

\`\`\`bash
cd backend
cp .env.example .env      # set MONGO_URI, ADMIN_API_KEY
npm install
npm run seed               # populates Events, Sponsors, Gallery
npm run dev                # http://localhost:5000
\`\`\`

Verify it's healthy:

\`\`\`bash
curl http://localhost:5000/api/health
\`\`\`

### 2. Frontend

\`\`\`bash
cd frontend
cp .env.example .env       # VITE_API_BASE_URL=http://localhost:5000/api
npm install
npm run dev                 # http://localhost:5173
\`\`\`

### 3. (Optional) Admin API calls

Write endpoints for Events/Sponsors/Gallery require the admin key set
in `backend/.env`:

\`\`\`bash
curl -X POST http://localhost:5000/api/sponsors \\
  -H "Content-Type: application/json" \\
  -H "x-admin-key: <your ADMIN_API_KEY>" \\
  -d '{"name":"New Sponsor","tier":"Gold"}'
\`\`\`

---

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for full step-by-step guides
covering Docker Compose, Vercel/Netlify + Render/Railway, and MongoDB
Atlas.

Quickest path — Docker Compose (runs Mongo + API + frontend together):

\`\`\`bash
docker compose up --build
\`\`\`

Frontend at `http://localhost:8080`, API at `http://localhost:5000/api`.

---

## Environment variables

**backend/.env**
| Variable | Description |
|---|---|
| `PORT` | API port (default 5000) |
| `NODE_ENV` | `development` or `production` |
| `MONGO_URI` | MongoDB connection string |
| `CORS_ORIGIN` | Comma-separated allowed origins for the frontend |
| `ADMIN_API_KEY` | Required header value for admin CRUD endpoints |

**frontend/.env**
| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API, e.g. `https://api.techfest2026.in/api` |

---

## Scripts reference

**frontend**
- `npm run dev` — local dev server
- `npm run build` — type-check + production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — ESLint

**backend**
- `npm run dev` — nodemon dev server
- `npm start` — production start
- `npm run seed` — reset and re-populate Events/Sponsors/Gallery