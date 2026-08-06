# TARUNYA SYSTEMS — EXPERT AI AGENT RULEBOOK

**[META: MANDATORY PROJECT-SCOPED RULES FOR ALL AI AGENTS OPERATING ON THIS REPOSITORY]**
**[PRIORITY: HIGHEST — OVERRIDES ANY GENERIC OR GLOBAL AGENT INSTRUCTIONS]**

---

## 0. FIRST-CONTACT PROTOCOL (ALWAYS RUN)

Before making **any** modification to this repo, an agent MUST:
1. Run `npm run build` and confirm zero errors.
2. Run `npm test` and confirm all tests pass.
3. Read `src/index.css`, `tailwind.config.js`, and this file in full.
4. Identify the component being changed and read its neighboring imports.

Do NOT skip this. A broken build or failing test is a deployment blocker.

---

## 1. TECH STACK — CANONICAL REFERENCE

| Layer | Technology | Version | Notes |
|---|---|---|---|
| UI Framework | React | 18.x | Functional components only. NO class components. |
| Build Tool | Vite | 5.x | All imports must be ESM. No CommonJS `require()`. |
| Styling | Tailwind CSS | 3.x | Utility-first. See palette below. NO inline `style=` for color/spacing. |
| Animation | Framer Motion | 10.x | Use `motion.*` variants. Never GSAP on React components. |
| Routing | React Router DOM | 6.x | `<Link>` for internal nav. NO `<a href>` for internal routes. |
| Testing | Vitest + RTL | latest | All tests in `src/__tests__/`. Run with `npm test`. |
| CI/CD | GitHub Actions | — | `.github/workflows/ci.yml` gates every push to `main`. |
| Deployment | Vercel | — | Auto-deploys on passing CI. Never manually push `dist/`. |

---

## 2. MANDATORY DESIGN SYSTEM — COLOR PALETTE

These are the ONLY authorised colours. Using `bg-white`, `bg-gray-*`, or any colour outside this set is a VIOLATION.

```
CANVAS (backgrounds):
  Main Background:    #0d0d0f   (Jet Obsidian)       → bg-[#0d0d0f]
  Card Surface:       #141417   (Dark Charcoal)       → bg-[#141417]
  Grid / Track BG:    #18181c   (Grid Black)          → bg-[#18181c]

ACCENTS (sparingly, hover states, active, highlights):
  Mario Red:          #ff2a2a   → text-[#ff2a2a] / bg-[#ff2a2a]
  Arcade Cyan:        #00e5ff   → text-[#00e5ff]
  Coin Gold:          #fbd000   → text-[#fbd000]
  Cyber Green:        #00ff66   → text-[#00ff66]

TYPOGRAPHY:
  Body / Sublines:    text-white/90  (never plain text-white for body paragraphs)
  Muted Labels:       text-white/60 or text-white/70
  Code / Telemetry:   font-mono
```

**Key Rules:**
- Zero pure-white backgrounds (`bg-white`) anywhere.
- Accent colours appear on **hover/active states only** in cards and borders. Never as ambient backgrounds.
- Shadows: `shadow-[4px_4px_0px_#000]` (neutral) or `shadow-[4px_4px_0px_#ff2a2a]` (active). Never neon glow by default.

---

## 3. TYPOGRAPHY SYSTEM

```
Pixel Titles (Hero H1):        font-pixelify  (Pixelify Sans, Google Fonts)
Retro Logo / Labels:           font-['Press_Start_2P']
Code / Telemetry / Metrics:    font-mono (JetBrains Mono)
Body Copy / Sublines:          font-sans (Inter)
```

- NO emoji in UI code. Use SVG icons only (Heroicons stroke-style, `w-5 h-5` minimum).
- Body copy lines: `leading-relaxed tracking-normal` — never `tracking-widest` on long text.

---

## 4. SPATIAL LAYOUT — FIXED CHROME POSITIONS

These positions are LOCKED. Do NOT change z-index, position type, or placement without explicit user instruction.

```
Top-Left:     TARUNYA Logo         fixed top-6 left-6 md:left-10   z-[10000]
Top-Right:    Book Call CTA        fixed top-6 right-6 md:right-10  z-[10000]
Left-Center:  Icon Nav Island      fixed left-4 md:left-6 top-1/2   z-[10000]  (Home/Projects/Blogs/Resume)
Bottom-Right: Sound Toggle         fixed bottom-6 right-6            z-[10000]
Bottom Bar:   Mario Race Track     fixed bottom-0 left-0 right-0     z-[9980]  (Home page only)
Mario Sprite: Scroll Scrubber      fixed bottom-12 left-0            z-[9990]  (Home page only)
```

---

## 5. COMPONENT ARCHITECTURE RULES

### DO:
- **Single Responsibility**: One component = one clear job. If a component exceeds 200 lines, extract sub-components.
- **Co-locate data**: Keep static data arrays (e.g., `navLinks`, `skillsList`) at the top of the file or in `src/data/`.
- **Ref vs State**: Use `useRef` for values that don't need to trigger re-renders (drag state, animation frames, scroll timers).
- **Cleanup effects**: Every `useEffect` that adds event listeners MUST return a cleanup function.
- **Lazy load pages**: All page-level components in `src/pages/` MUST be lazy-loaded via `React.lazy()` in `App.jsx`.

### DO NOT:
- Never use `document.querySelector` or `document.getElementById` inside React components — use `ref`.
- Never use `any` TypeScript or untyped props without default values.
- Never use `console.log` in production code. Use conditional `if (import.meta.env.DEV)` guards.
- Never import from `../../../` more than 2 levels deep — refactor to absolute alias.
- Never add new npm packages without checking bundle size impact (`npm run build` output).

---

## 6. TELEMETRY & METRICS INTEGRITY

The live data pipeline is: **GitHub REST API → `useGitHubSignals` hook → Hero + Signals components**.

- **Never hardcode** repo counts, star counts, or CP ratings. All metrics MUST flow from the hook.
- Fallback values are allowed ONLY for initial render (`fallback={45}`) — they must be real approximate values.
- Rounding rule: `Math.floor(value / 5) * 5` — always round DOWN to nearest 5.
- API error states must degrade gracefully (show fallback, never show `NaN`, `undefined`, or `null` to the user).

---

## 7. AUDIO SYSTEM

- All sound calls go through `audioSynth` utility (`src/utils/audioSynth.js`). NEVER use raw `new AudioContext()` in components.
- Available methods: `playClickSound()`, `playCoinSound()`, `playStageClearSound()`, `toggleMute()`, `isMuted()`, `stopAllSounds()`.
- Sound must ALWAYS respect the `isMuted()` state — never play sound unconditionally.
- The mute toggle is in the bottom-right fixed button. It must NOT be removed or relocated.

---

## 8. PERFORMANCE RULES

- **Images**: All images in `public/` must be WebP format. No PNG/JPG in the hero or card backgrounds.
- **Video**: Background video (`bg_video.mp4`) must have `autoPlay muted loop playsInline` — missing any attribute causes browser blocking.
- **Animations**: Use `will-change-transform` only on elements with continuous GPU animations (Mario sprite, cursor). Never apply it globally.
- **Bundle guard**: `npm run build` must succeed with **zero** chunk size warnings (limit: 1000KB). If a new dep causes a warning, use `manualChunks` in `vite.config.js`.
- **React.memo**: Wrap components that receive stable props and render frequently (e.g., `CountUpNumber`, `SystemCard`).

---

## 9. SECURITY RULES

- **XSS**: All externally-fetched HTML (blog feed content, API descriptions) MUST be sanitised through `DOMPurify.sanitize()` before rendering via `dangerouslySetInnerHTML`.
- **API Keys**: Zero secrets in client-side code. GitHub API calls use public unauthenticated endpoints only. Any private key goes in Vercel environment variables.
- **CSP**: Content-Security-Policy is set in `vercel.json`. Any new external CDN or iframe source MUST be added to the CSP header before merging.
- **`rel="noopener noreferrer"`**: All `<a target="_blank">` links MUST include this attribute. No exceptions.
- **Input sanitization**: The contact form in `ConnectTerminal.jsx` must validate and sanitise all fields client-side before submission.

---

## 10. ACCESSIBILITY (A11Y) REQUIREMENTS

- Every interactive element (buttons, links, inputs) MUST have an `aria-label` if it has no visible text.
- SVG icons used as buttons MUST have `aria-hidden="true"` on the SVG and a visible/sr-only label on the parent button.
- Focus states must be visible. Never use `outline-none` without a custom `focus-visible:ring-*` replacement.
- Colour contrast: All text on dark backgrounds must achieve WCAG AA (4.5:1 minimum ratio).
- The custom cursor (`CustomCursor.jsx`) applies `cursor: none` — ensure `cursor: pointer` is restored for keyboard navigation focus indicators.

---

## 11. TESTING PROTOCOL

All tests live in `src/__tests__/`. The test runner is **Vitest** (`npm test`).

### Test Tiers:

**Tier 1 — Build Gate (MUST ALWAYS PASS):**
- `npm run build` — zero errors, zero warnings
- `npm test` — all unit tests pass

**Tier 2 — Component Tests (per feature):**
- New components MUST have a corresponding test file: `ComponentName.test.jsx`
- Test: renders without crash, key props render correct text, critical interactions fire

**Tier 3 — Smoke Tests:**
- `build.smoke.test.js` — verifies critical pages render without throwing
- `nav.test.jsx` — verifies all nav links exist and are correct

### Test Naming Convention:
```
src/__tests__/
├── components/
│   ├── Nav.test.jsx
│   ├── Hero.test.jsx
│   ├── MarioRunner.test.jsx
│   └── CountUpNumber.test.jsx
└── smoke/
    └── build.smoke.test.js
```

### Coverage Targets:
- Critical path components: **80%+** line coverage
- Utility functions (`audioSynth`, hooks): **90%+** line coverage

---

## 12. GIT & COMMIT DISCIPLINE

### Commit Message Format (Conventional Commits):
```
<type>(<scope>): <short description>

Types: feat | fix | style | refactor | perf | test | docs | chore
Scope: hero | nav | cursor | mario | signals | blogs | systems | audio | ci

Examples:
  feat(hero): add drag-to-scroll mario scrubber
  fix(nav): restore fixed positioning after relative override
  style(signals): replace ambient red borders with neutral 8-bit style
  test(nav): add unit tests for icon nav links
  docs(agents): upgrade AGENTS.md to expert rulebook v2
```

### Branch Rules:
- `main` is protected — CI must pass before merge
- Feature work: `feat/<description>` branches
- Hotfixes: `fix/<description>` branches

### Pre-Push Checklist (AGENTS MUST VERIFY):
- [ ] `npm run build` passes with zero errors
- [ ] `npm test` passes with zero failures
- [ ] No `console.log` added in production code
- [ ] No hardcoded colour values outside the authorised palette
- [ ] No new `bg-white` or `text-black` on main canvas elements
- [ ] All new `<a target="_blank">` have `rel="noopener noreferrer"`
- [ ] Any new external API source added to `vercel.json` CSP
- [ ] Commit message follows Conventional Commits format

---

## 13. KNOWN TECHNICAL DEBT (DO NOT ACCIDENTALLY FIX)

These are known issues that are intentionally deferred. Do NOT refactor these without explicit user instruction:

| Item | Location | Deferred Reason |
|---|---|---|
| `nodemailer` in dependencies | `package.json` | Used in Vercel API routes (`/api/`), not client bundle |
| `gsap` in dependencies | `package.json` | Bundled in vendor-animations chunk — not actively used in current components but kept for future use |
| `lenis` in dependencies | `package.json` | Listed but smooth scroll via Lenis not currently wired in App.jsx |
| ESLint config missing | root | Project predates ESLint v9 flat config. Do NOT add eslint v9 config without migrating all rules. |

---

## 14. FILES AGENTS MUST NEVER DELETE OR RENAME

```
src/utils/audioSynth.js          — Core audio engine
src/components/CustomCursor.jsx  — Pixel sword cursor
src/components/MarioRunner.jsx   — Mario scroll runner + drag scrubber
src/hooks/useGitHubSignals.js    — Live GitHub telemetry hook
public/bg_video.mp4              — Hero background video
public/webme1.webp               — Hero fallback image
vercel.json                      — CSP headers + routing config
.github/workflows/ci.yml         — CI pipeline
```

---

## 15. AGENT SELF-CHECK QUESTIONS (RUN BEFORE EVERY COMMIT)

Answer ALL 11 honestly. If any answer is "No" or "Maybe", fix before committing:

1. ✅ Does it solve the **right** problem?
2. ✅ Is it the **simplest** solution?
3. ✅ Are there **security** issues?
4. ✅ Does it **duplicate** existing logic?
5. ✅ Is **naming** consistent with the codebase?
6. ✅ Does it **violate architecture** (class components, inline styles, wrong fonts)?
7. ✅ Does it increase **coupling** between unrelated modules?
8. ✅ Does it increase **bundle size** past the 1000KB limit?
9. ✅ Does it introduce **hidden state** or uncleared side effects?
10. ✅ Are **tests** meaningful and passing?
11. ✅ Does it actually follow **repository conventions** (Conventional Commits, palette, no emojis)?

---

*End of AGENTS.md — Version 2.0 — Tarunya Systems 2026*
