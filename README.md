<div align="center">

# Vantage Virality OS V2 — Creator Onboarding & Continuous Trend Intelligence

**An ultra-modern, high-converting creator operating system engineered for top-tier creators to calibrate, reverse-engineer, and optimize viral hooks.**

[![License](https://img.shields.io/badge/license-MIT-8B7CF6?style=for-the-badge)](LICENSE)
[![Backend](https://img.shields.io/badge/backend-Node.js%20%7C%20PowerShell-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Icons](https://img.shields.io/badge/icons-Lucide-FFB454?style=for-the-badge&logo=lucide&logoColor=black)](https://lucide.dev)

[Explore Features](#-features) &bull; [Project Architecture](#-project-architecture) &bull; [Backend API](#-backend-rest-api) &bull; [Getting Started](#-getting-started-locally)

---

</div>

## Overview

**Vantage Virality OS** is an elite creator intelligence suite designed to eliminate guesswork in video production and social storytelling. Built with a luxury light SaaS aesthetic, tactile glassmorphism, and bold typographic hierarchy, Vantage helps creators reverse-engineer viral momentum across **YouTube Long-form, Shorts, Instagram Reels, TikTok, Podcasts, and X**.

---

## Project Architecture

```
Virality/
├── package.json                     # NPM project config & launch scripts
├── README.md                        # Documentation & setup guide
├── .env.example                     # Environment variable template
├── server.js                        # Root entry point delegating to server/
├── server.ps1                       # Native PowerShell fallback server
│
├── server/                          # Node.js Backend Service
│   ├── server.js                    # HTTP server & static file dispatcher
│   ├── routes/                      # Modular REST API route handlers
│   │   ├── health.js                # GET /api/health (telemetry & system status)
│   │   ├── profile.js               # GET/POST /api/profile (creator profile)
│   │   ├── library.js               # GET/POST /api/library (production library CRUD)
│   │   └── trends.js                # POST /api/score (virality diagnostic scoring)
│   └── data/                        # Persistent JSON Storage
│       ├── creator_profile.json     # Saved creator preferences
│       └── content_library.json     # Saved production library
│
├── css/                             # Stylesheets
│   └── style.css                    # Luxury light SaaS design system & components
│
├── js/                              # Modular Frontend Logic
│   ├── config.js                    # Storage keys, schemas & default state
│   ├── trends-data.js               # Multi-niche seed trend dataset & 12 creative angles
│   ├── scorer.js                    # 7-signal formula & real-time hook diagnostic
│   ├── api-client.js                # Client REST API handler with offline fallback
│   └── app.js                       # Main application lifecycle & UI controller
│
└── index.html                       # Main Creator Dashboard UI
```

---

## Features

- **5-Step Creator Calibration Wizard**: Personas tailored by platform, niche, age group, geography, language, and monetization goals.
- **7-Signal Opportunity Engine**: Algorithmic scoring evaluating momentum, engagement, search demand, outlier performance, freshness, competition supply, and audience relevance.
- **12-Angle Creative Studio**: Instant generation across Educational, Controversial, Storytelling, Beginner, Expert, Myth-Busting, Listicle, Case Study, Personal Story, Hot Take, Step-by-Step Tutorial, and News Reaction.
- **6-Stage Production Kanban & List System**: Manage workflow through Ideas, Researching, Scripted, Filming, Editing, and Published stages with instant persistence and JSON export/import.
- **Real-Time Virality Diagnostic Scorer**: Live hook analysis calculating Curiosity Gap, Stakes/Conflict, and Algorithmic Velocity with loss-aversion word and pacing detection.
- **Zero-Dependency Backend**: Pure Node.js (`http`, `fs`, `path`) REST API service with automated `localStorage` offline fallback.
- **PowerShell Server Alternative**: Native `.NET HttpListener` server (`server.ps1`) for Windows environments without Node.js installed.

---

## Backend REST API

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service telemetry, server uptime, and timestamp |
| `GET` | `/api/profile` | Retrieve saved creator profile configuration |
| `POST` | `/api/profile` | Save or update creator profile configuration |
| `GET` | `/api/library` | Retrieve saved content production library ideas |
| `POST` | `/api/library` | Upsert single idea or sync entire library array |
| `POST` | `/api/score` | Run algorithmic diagnostic scoring on a hook text |

---

## Getting Started Locally

### Option 1: Node.js Backend Server (Recommended)
```bash
# Start backend server on http://localhost:3000
npm start
# or
node server/server.js
```

### Option 2: PowerShell Native Server (Windows without Node)
```powershell
# Run native PowerShell server on http://localhost:3000
.\server.ps1
```

### Option 3: Direct Static File Execution
Open `index.html` directly in any web browser (`file:///.../index.html`). The app operates with 100% full feature parity using client-side `localStorage`.

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>⌘</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> | Focus global search & filters |
| <kbd>N</kbd> | Open AI Virality Scorer modal |
| <kbd>S</kbd> | Trigger Live 24/7 Trend Radar Sync |
| <kbd>Esc</kbd> | Close active modal, drawer, or dropdown |

---

## License

This project is licensed under the [MIT License](LICENSE).
