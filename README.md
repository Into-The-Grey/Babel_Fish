[![CodeQL](https://github.com/Into-The-Grey/Babel_Fish/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Into-The-Grey/Babel_Fish/actions/workflows/github-code-scanning/codeql)

# 🐟 Babel Fish

**Your Universal Data Platform, OSINT Arsenal, and Payload Forge**  
*A web-first, API-driven system for hackers, tinkerers, and chaos architects who want their entire technical life—scripts, notes, payloads, docs, media, and more—in one interface, on one box, under their control.*

---

> _“The Babel fish is small, yellow, and leech-like, and probably the oddest thing in the Universe. It feeds on brainwave energy, enabling you to understand anything.
>
> Babel Fish (the project) does something similar for your technical world: instant, seamless access and management for everything you need to get shit done.”_
> — Not Douglas Adams, but definitely inspired

---

## 🚀 What is Babel Fish?

**For Backend or Frontend related information please check, [Backend](./Docs/Sever(Backend)/README.md) or [Frontend](./Docs/Webapp(Frontend)/README.md)**

**Babel Fish** is your always-on, LAN-ready, fully extensible knowledge platform for technical resources.  
It’s what happens when you cross a private wiki, a payload dropbox, an automation hub, a searchable PDF/media library, and a REST API—all running quietly on a Raspberry Pi (or anything else), safe from the chaos of the cloud.

It started as a BadUSB payload manager. Now? It’s the nerve center of your technical universe.

**Designed for:**

- Hackers & builders who want local-first control, not SaaS headaches.
- Automation junkies, tinkerers, and ops nerds who love APIs.
- People who don’t just want to store things—they want to *do* things.

---

## 🧩 Key Features

- **Payload & Resource Management**
  - Store, search, tag, and retrieve BadUSB payloads (Rubber Ducky, Beetle, etc.) with instant code previews and metadata.
  - Bulk edit, syntax-aware search, and audit trails planned.

- **Searchable Docs Library**
  - Upload, tag, search, and read PDFs, manuals, cheatsheets, and guides—right in the browser.
  - Inline PDF viewer with “Read Aloud” (TTS) function.  
  - Roadmap: OCR support, folders/tags, metadata editing, cloud backup.

- **Media Management**
  - Placeholder for storing and browsing images, screenshots, diagrams, and more.
  - Roadmap: Inline viewer, batch upload, sorting/filtering.

- **Analytics Dashboard**
  - Placeholder for usage stats, charts, and system health.
  - Roadmap: Real-time charts, resource usage, activity history.

- **Logs & Activity**
  - Full log viewer with search/filter for system and user activity.

- **Settings Panel**
  - Placeholder for all global/user config (accounts, DB, API keys, etc.).

- **Trash/Recovery Bin**
  - Undo accidental deletes.  
  - Roadmap: Soft-delete, restore, and permanent wipe.

- **AI/Assistant Tab**
  - Placeholder for chat, Q&A, or in-app LLM integration.
  - Roadmap: Summarize docs, answer tech questions, AI-powered search.

- **Backup & Restore**
  - Placeholder for one-click snapshots, download/restore, and scheduled backup.

- **API-First, UI-Second (Both Kick Ass)**
  - All features exposed as RESTful endpoints for CLI/scripts/automation.
  - Modern, fast, responsive web UI (React, MUI, custom logo).
  - Built-in interactive docs: try any endpoint live.

- **Secure & Local by Default**
  - Meant to run inside your home or lab (LAN, VLAN, or VPN).
  - Full local DB—*your* data, *your* rules, no telemetry, ever.

- **Modular & Hackable**
  - Add new resource types, automations, and integrations as your needs grow.
  - Clean backend (FastAPI + SQLAlchemy), pluggable frontend.

- **Portable & Light**
  - Runs great on a Pi, NUC, VM, or old laptop.
  - Minimal RAM/CPU footprint—built to *last*.

---

## 🗺️ Current Tabs (as of June 2025)

- **Payloads** (BadUSB, scripts, code—CRUD, search, preview)
- **Docs** (PDF/manual library, search/upload, PDF viewer with TTS)
- **Media** (placeholder)
- **Logs** (searchable log/history view)
- **Settings** (placeholder)
- **Analytics** (placeholder)
- **Trash/Recovery** (placeholder)
- **AI** (placeholder)
- **Backup** (placeholder)

---

## 🏗️ Project Structure

```bash
/Babel_Fish/
│
├── app/                  # FastAPI backend
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── db.py
│   ├── crud.py
│   ├── payloads.py
│   └── ... (future: docs.py, media.py, etc.)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MainTabs.tsx
│   │   │   ├── NavBar.tsx
│   │   │   └── docs/
│   │   │        ├── DocsTab.tsx
│   │   │        └── DocViewer.tsx
│   │   ├── pages/
│   │   │   └── HomePage.tsx
│   │   └── ... (rest of UI, assets, etc.)
│   └── public/
│        └── babel_fish_logo192.png
│
├── requirements.txt      # Backend deps
├── README.md             # This beauty
└── ... (env files, Docker, etc.)
```

---

## ⚡ Quickstart: Rule Your Own Stack

1. **Clone the repo**

   ```bash
   git clone https://github.com/youruser/Babel_Fish.git
   cd Babel_Fish
   ```

2. **Set up your backend Python environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Configure PostgreSQL**

   - Edit `app/db.py` or `.env` for your `DATABASE_URL`
   - Example: `postgresql://user:password@localhost/babel_fish`

4. **Run the backend server**

   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Frontend: Build & launch the UI**

   ```bash
   cd frontend
   npm install
   npm run dev
   # Access UI: http://localhost:5173
   ```

6. **API & UI Docs**

   - API: [http://YOUR_PI_IP:8000/docs](http://YOUR_PI_IP:8000/docs)
   - UI:  [http://YOUR_PI_IP:5173](http://YOUR_PI_IP:5173)

---

## 🔧 Requirements

- **Python 3.11+**
- **PostgreSQL** (local or LAN)
- **Node.js 20+** (for the web frontend)
- See `requirements.txt` and `frontend/package.json`

---

## 🧠 Philosophy & Expansion

Babel Fish is about *ownership* and *future-proofing*:

- All your stuff, local and private by default.
- Extensible: add new modules, automations, resource types as you grow.
- Everything is scriptable, automatable, and API-accessible.
- Future-proof by design: run it for a week, a year, or until Earth is demolished for a hyperspace bypass.

---

## 📡 Coming Soon

- Folders, tags, and metadata editing for docs/media
- OSINT suite integration (ProbeLink, passive recon, dark web scanning)
- Full plugin/extension system (webhooks, bots, agents)
- AI-powered search and auto-tagging
- Community modules & registry

---

## 📝 License

MIT (or weaponized copyleft, if you prefer)

---

## 🤝 Contact / Contribute

- **Issues & feedback:** [GitHub Issues](https://github.com/youruser/Babel_Fish/issues)
- **Email:** [ncacord@protonmail.com](mailto:ncacord@protonmail.com)
- **No corporate overlords. No cloud lock-in. Just you, your Pi, and the galaxy.**

---

## 💬 Final Words

> *“Don’t Panic.”*  
> — Still the best README advice you’ll ever get.

---

**You know you want it. Feed your inner geek and install it already.**
