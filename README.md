# TechFest 2026 — "The Future Begins Here"

An immersive, cinematic 3D website for IIT TechFest 2026, built as a
scroll-driven interactive movie: React Three Fiber scenes, GSAP-timed
transitions, and a production Express/MongoDB backend.

This repository is being built in four phases (see the original brief).
**Phase 1 — Project Foundation & Core Experience — is complete.**

---

## What's in Phase 1

- Full frontend + backend project architecture
- Vite + React 18 + TypeScript + Tailwind, configured end-to-end
- Design system: color tokens, type scale (Orbitron / Inter / JetBrains
  Mono), glass/glow utilities — see `frontend/tailwind.config.ts` and
  `frontend/src/styles/globals.css`
- Global chrome: glassmorphic `Navbar`, `Footer` with animated skyline,
  cinematic `LoadingScreen`, magnetic `CustomCursor`
- Routing (`react-router-dom`) with a real Home route and staged
  "Coming Soon" shells for every other route (styled, not placeholder
  Lorem Ipsum — these get replaced feature-by-feature in Phase 2 & 3)
- Smooth scrolling via Lenis, driven by the GSAP ticker so future
  ScrollTrigger timelines stay in sync
- **Scene 1 — Deep Space**: layered parallax starfields, drifting
  volumetric nebula clouds, a GPU shader-based particle system that
  forms the TechFest wordmark out of chaos and can burst it apart,
  bloom + vignette post-processing, and a mouse-driven camera rig
- Express + MongoDB backend architecture: security middleware (helmet,
  rate limiting, CORS), centralized error handling, a working
  `/api/health` endpoint that proves the DB connection, and the
  routes/controllers/models folder pattern that Phase 3 will fill in

## Coming in later phases

- **Phase 2**: remaining cinematic scenes (Earth, Future City, AI
  World, Quantum Computing, Robotics Lab, Main Arena), all main
  content sections (About, Events, Workshops, Speakers, Gallery,
  Countdown), and all 8 event detail pages
- **Phase 3**: full backend APIs (events, registration, gallery,
  sponsors, contact, newsletter), MongoDB models, frontend↔backend
  wiring, search/filtering, success/error states
- **Phase 4**: performance passes, SEO, accessibility, final polish,
  deployment guide

---

## Getting started

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Runs at `http://localhost:5173`.

### Backend

```bash
cd backend
cp .env.example .env   # point MONGO_URI at your MongoDB instance
npm install
npm run dev
```

Runs at `http://localhost:5000`. Verify with:

```bash
curl http://localhost:5000/api/health
```

## Project structure

```
techfest-2026/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/       # Navbar, Footer
│   │   │   ├── three/        # SpaceScene, Starfield, Nebula, ParticleLogo, CameraRig
│   │   │   └── ui/           # LoadingScreen, CustomCursor
│   │   ├── context/          # LoadingContext (boot sequence state)
│   │   ├── hooks/            # useLenis, useMousePosition
│   │   ├── lib/               # utils, siteConfig (nav + event data)
│   │   ├── pages/             # Home, HeroOverlay, ComingSoon, NotFound
│   │   ├── routes/            # AppRoutes
│   │   └── styles/            # globals.css (design tokens)
│   └── ...config files
└── backend/
    ├── config/                # db.js
    ├── controllers/           # health.controller.js (+ Phase 3 controllers)
    ├── middleware/             # errorHandler.js
    ├── models/                 # Phase 3 Mongoose schemas
    ├── routes/                 # index.js, health.routes.js (+ Phase 3 routers)
    ├── app.js
    └── server.js
```

## Tech stack

React · TypeScript · Vite · React Three Fiber · Three.js · Drei ·
`@react-three/postprocessing` · GSAP · Framer Motion · Lenis ·
TailwindCSS · React Router · Node.js · Express · MongoDB · Mongoose
