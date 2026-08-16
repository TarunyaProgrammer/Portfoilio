<div align="center">
  <h1>TARUNYA KESHARWANI &mdash; SYSTEMS ARCHITECT</h1>
  <p><strong>Minimalist Single-Page Engineering Portfolio &bull; GSoC &apos;26 Developer at C2SI</strong></p>

  <p>
    <a href="https://tarunyaportfolio.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/Status-Live%20Production-10B981?style=for-the-badge&logo=vercel" alt="Live Site" />
    </a>
    <img src="https://img.shields.io/badge/Engine-React%2018%20%2B%20Vite-3B82F6?style=for-the-badge&logo=react" alt="React 18" />
    <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Components-Magic%20UI-8B5CF6?style=for-the-badge" alt="Magic UI" />
    <img src="https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-red?style=for-the-badge" alt="License" />
  </p>
</div>

<br />

---

## ⚡ Overview

A high-performance, single-page minimalist portfolio engineered with **React, Vite, Tailwind CSS, Framer Motion, Lenis, and Magic UI**. Designed specifically for recruiters, engineering leaders, and clients to immediately understand Tarunya's core competencies, GSoC '26 leadership, and flagship product architectures.

[**🌐 VIEW LIVE PRODUCTION PORTFOLIO**](https://tarunyaportfolio.vercel.app/)

---

## ✨ Key Architectural Features

- 🎬 **Cinematic Video Hero**: High-contrast video backdrop (`hero_video.mp4`) with subtle dark vignettes and live telemetry status pill.
- 🚀 **Magic UI macOS Floating Dock**: Fixed bottom-center navigation with spring-physics magnification on mouse proximity and smooth inertial scrolling.
- 🌟 **Top 3 Flagship Products Spotlight**:
  1. **Vyay** &mdash; AI Infrastructure Cost Audit Platform *(React, TypeScript, Supabase, Gemini 2.5 Flash, Resend, Vitest)*.
  2. **GithubAnalyzer & Webiu** &mdash; GSoC 2026 Developer Telemetry *(Hono, Cloudflare Workers, Angular, NestJS, GraphQL, PostgreSQL)*.
  3. **Echo** &mdash; Real-Time Production Messaging Engine *(React, Node.js, Express, MongoDB, Socket.IO, JWT)*.
- 💫 **Magic UI Kinetic Primitives**:
  - `BorderBeam`: Animated laser perimeter highlighting flagship product cards.
  - `SpotlightCard`: Mouse-tracking radial gradient glow across skills and philosophy cards.
  - `ShimmerButton`: Top-right high-converting glowing `"Hire Me ↗"` CTA.
  - `Marquee`: Smooth continuous technology ticker.
  - `ShinyText`: Subtle typography shimmer.
- 📜 **Experience & Leadership Timeline**: Chronological milestones for Google Summer of Code (GSoC '26) @ C2SI, Open Source Mentorship (GSSoC & SSoC), CNCF contributions (Meshery, Jaeger), and B.Tech in CS & AI (8.83 CGPA).
- ✍️ **Publications & Articles**: Live syndicated technical articles from DEV.to (`@tarunya`) and Medium (`@tarunyakesh`).
- ✉️ **Frictionless Contact Sheet**: 1-Click "Copy Email" with celebratory confetti burst (`canvas-confetti`) and client-side pre-filled inquiry triggers.

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | `React 18` | Declarative UI component architecture |
| **Bundler & Tooling** | `Vite 6` | Sub-50ms HMR and optimized production bundling |
| **Styling** | `Tailwind CSS 3.4` | Custom dark palette (`#09090b` obsidian) and glassmorphism |
| **Component Suite** | `Magic UI` | Dock, BorderBeam, SpotlightCard, ShimmerButton, Marquee |
| **Animation Engine** | `Framer Motion 11` | Spring physics, layout transitions, and scroll reveals |
| **Smooth Scrolling** | `Lenis` | Inertial momentum-based smooth scroll across anchor sections |
| **Icons** | `Lucide React` | Clean, modern SVG iconography |
| **Delight & Interactivity** | `canvas-confetti` | Confetti bursts on 1-click email copy |

---

## 🛠️ How to Run the App Locally

### 1. Prerequisites
Ensure you have **Node.js (v18.0.0 or higher)** and **npm** installed on your system.

```bash
node -v
npm -v
```

### 2. Clone the Repository
```bash
git clone https://github.com/TarunyaProgrammer/Portfoilio.git
cd Portfoilio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Local Development Server
```bash
npm run dev
```
> The application will come online at: `http://localhost:5173/`

### 5. Build for Production
```bash
npm run build
```
> Outputs the optimized production bundle to the `dist/` directory (compiles in ~1.1s).

### 6. Preview Production Build Locally
```bash
npm run preview
```

---

## 📂 Project Structure

```bash
/
├── public/
│   ├── hero_video.mp4            # Hero cinematic background video
│   ├── Resume.pdf                # Downloadable Curriculum Vitae
│   └── favicon.svg               # Architectural minimalist monogram favicon
├── src/
│   ├── main.jsx                  # React DOM root entry point
│   ├── App.jsx                   # Single-page wrapper with Lenis & sections
│   ├── index.css                 # Custom dark scrollbars & Tailwind base directives
│   ├── lib/
│   │   └── utils.js              # Magic UI cn() class merging utility
│   ├── data/
│   │   └── portfolioData.js      # Single source of truth (profile, projects, skills, timeline)
│   └── components/
│       ├── ui/                   # Magic UI Reusable Primitives
│       │   ├── dock.jsx          # Spring-physics macOS floating dock
│       │   ├── shimmer-button.jsx# Glowing CTA button
│       │   ├── border-beam.jsx   # Laser perimeter beam for flagship cards
│       │   ├── spotlight-card.jsx# Mouse position radial gradient card
│       │   ├── marquee.jsx       # Infinite continuous skills ticker
│       │   ├── shiny-text.jsx    # Shimmering gradient typography
│       │   ├── blur-fade.jsx     # Viewport entrance animation
│       │   └── bento-grid.jsx    # Modern bento layout grids
│       ├── layout/
│       │   ├── Navbar.jsx        # Fixed top navigation (Brand + Hire Me CTA)
│       │   ├── FloatingDock.jsx  # Bottom center macOS dock navigation
│       │   └── Footer.jsx        # Live clock, copyright, and back-to-top
│       └── sections/
│           ├── HeroSection.jsx   # Video hero backdrop, headline, quick metrics (#hero)
│           ├── AboutSection.jsx  # Bio, credentials, and work principles (#about)
│           ├── TechStackSection.jsx # Spotlight Bento matrix + Marquee (#skills)
│           ├── FlagshipProjects.jsx # Top 3 products with Border Beams (#projects)
│           ├── ExperienceTimeline.jsx # GSoC '26 & CNCF leadership timeline (#experience)
│           ├── PublicationsSection.jsx # DEV.to & Medium syndicated articles (#writing)
│           └── ContactSection.jsx   # 1-Click email copy + inquiry sheet (#contact)
├── LICENSE                       # Restrictive CC BY-NC-ND 4.0 License
├── README.md                     # Documentation & setup guide
├── package.json                  # Dependencies & npm scripts
├── tailwind.config.js            # Magic UI keyframes and custom color tokens
└── vite.config.js                # Vite alias and plugin configurations
```

---

## 🔒 License & Permissions

**&copy; 2026 Tarunya Kesharwani. All Rights Reserved.**

This project is licensed under the **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International Public License (CC BY-NC-ND 4.0)**:
- **Non-Commercial**: You may **not** use this code, personal designs, or branding for commercial purposes.
- **No Derivatives**: You may **not** distribute modified versions or templates of this portfolio.
- **Proprietary Media**: All personal branding assets, name, resume, and video media remain the exclusive proprietary property of Tarunya Kesharwani.

For commercial permissions or inquiries, contact: [tarunyaprogrammer@gmail.com](mailto:tarunyaprogrammer@gmail.com).
