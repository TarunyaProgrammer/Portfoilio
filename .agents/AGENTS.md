# PROJECT RULES & GUIDELINES

[META: PROJECT-SCOPED RULES FOR TARUNYA SYSTEMS PORTFOLIO]

---

## 1. THEME & COLOR PALETTE CONSTRAINTS

- **CRITICAL**: Do NOT alter, convert, or overwrite the app's established theme (light theme / dark theme) or color palette unless EXPLICITLY instructed by the user in the prompt.
- Preserve explicit design tokens defined in `tailwind.config.js` and component styles.

---

## 2. DESIGN & AESTHETIC INTEGRITY (NO "CHEAP AI VIBE" DESIGNS)

- **STRICT**: Do NOT build generic, cheap-looking "AI vibe coded" interfaces.
- Avoid random text gradients, artificial rainbow/multi-color gradients, neon bloat, or excessive decorative noise that makes the UI look cheap or templated.
- Prioritize high-craft, professional typography (solid high-contrast text), clean structural borders, precise spatial grid alignment, and intentional micro-interactions.

---

## 3. COMPONENT & REPOSITORY INTEGRITY

- Inspect neighboring components and global styles before modifying layouts.
- Always verify production builds (`npm run build`) after making visual or layout edits.
