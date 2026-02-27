## Game Website – Project TODO

### 1. Scope
- Define initial games:
  - Snake (single‑player, web).
  - Flappy Bird (single‑player, web) – later phase.
- Decide platforms (web only) and target devices.
- Choose multiplayer type per game (turn-based vs realtime).
- Decide if guests can play or login is required.

### 2. Tech Stack
- Choose frontend framework (e.g. React/Next.js).
- Choose backend framework (e.g. Node.js + Express/Nest).
- Choose realtime lib (Socket.IO / ws).
- Choose database + ORM (e.g. Postgres + Prisma).
- Choose hosting for frontend, backend, DB.

### 3. UX & UI
- Define core pages (Home, Catalog, Game Detail, Lobby, Play, Profile, Admin).
- Create wireframes for desktop and mobile.
- Define design system (colors, typography, buttons, cards).
- Design game cards/thumbnails and category layout.
- Design lobby flow (create/join room, ready, invite link).

### 4. Frontend Implementation
- Set up app shell (layout, header, nav, footer).
- Implement Home with featured games and categories.
- Implement Game Catalog grid with search/filter.
- Implement Game Detail page with info and Play button.
- Implement Lobby/Room page with player list and room code.
- Implement Play page container (canvas area, fullscreen, responsive).
- Implement basic Profile page (stats, avatar, username).
- Implement auth screens (login, signup, reset).

### 5. Backend & API
- Design REST/GraphQL API for users, games, lobbies, stats.
- Implement auth endpoints and middleware.
- Implement game metadata endpoints (list/get games).
- Implement lobby endpoints (create/join/list rooms, start match).
- Implement stats endpoints (submit result, get leaderboard).
- Implement basic admin endpoints (add/remove/feature game).

### 6. Realtime & Multiplayer
- Set up WebSocket server and room handling.
- Define common message format (join, state, input, chat, leave).
- Implement room lifecycle (create, join, leave, auto cleanup).
- Implement game state sync between server and clients.
- Add basic validation on server to prevent cheating.
- Implement heartbeats/timeouts for disconnected players.

### 7. Game Platform Integration
- Define standard game API (init, update, onMessage, destroy).
- Implement shared asset loader (sprites, sounds).
- Implement shared input handling (keyboard, mouse, touch).
- Implement generic state sync helpers (snapshot / interpolation).
- Externalize per-game config (speed, difficulty, max players).

### 8. Implement Initial Games
- Implement Game 1 – Snake (single‑player) as first MVP.
- Plan Game 2 – Flappy Bird (single‑player) for later phase.
- Integrate each finished game with lobby + Play page.
- Add basic pause/exit/return‑to‑lobby behavior.

### 9. Profiles, Stats, Leaderboards
- Store user profile data (username, avatar).
- Store per‑game stats (high score, wins/losses, time played).
- Implement global leaderboards per game.
- Implement simple personal stats view in Profile.

### 10. Infrastructure & DevOps
- Set up environments (dev/staging/prod configs).
- Configure CI/CD (build, test, deploy pipeline).
- Configure logging and error tracking.
- Configure DB backups.
- Plan basic WebSocket scaling (sticky sessions or state store).

### 11. Testing & Performance
- Add unit tests for core game logic and services.
- Add integration tests for key APIs and WebSocket flows.
- Perform basic load testing (simulated players/rooms).
- Optimize frontend performance (bundle size, image optimization).
- Test across major browsers and mobile devices.

### 12. Legal & Launch
- Add Privacy Policy, Terms of Service, and cookie notice.
- Enforce HTTPS and secure auth (hashed passwords, secure cookies).
- Define username/chat rules and simple reporting mechanism (or disable chat v1).
- Run closed beta, collect feedback, fix critical bugs.
- Set up domain, SEO basics, and social share images for public launch.

### 13. Phase 1 – Snake Game MVP
- Decide minimal stack for MVP (e.g. React + simple Node/Express API, no realtime yet).
- Scaffold project (frontend app + simple backend or static hosting).
- Implement basic landing page with list of planned games (Snake, Flappy Bird, Football).
- Implement simple "Play Snake" page with canvas/game area.
- Implement Snake game logic (movement, food, growth, collisions, scoring) in browser.
- Add basic UI around Snake (score display, start/restart, game over screen).
- Persist best score locally (localStorage) for the current device.
- Make Snake responsive on desktop and mobile.
- Deploy MVP to a public URL.
