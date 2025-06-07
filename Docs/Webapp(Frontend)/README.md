# 🐟 Babel Fish Frontend

## Universal Knowledge Platform · LAN-first · Modular & Extensible

**Babel Fish** is your hacker homebase: payload manager, docs library, personal cloud, and automation hub—running on your hardware, under your control.

---

## Table of Contents

- [🐟 Babel Fish Frontend](#-babel-fish-frontend)
  - [Universal Knowledge Platform · LAN-first · Modular \& Extensible](#universal-knowledge-platform--lan-first--modular--extensible)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [UI/UX and Style Guide](#uiux-and-style-guide)
  - [Tab Structure \& Features](#tab-structure--features)
    - [Payloads](#payloads)
    - [Docs](#docs)
    - [Media](#media)
    - [Logs](#logs)
    - [Trash \& Recovery](#trash--recovery)
    - [Backup \& Snapshots](#backup--snapshots)
    - [Analytics](#analytics)
    - [AI Hub](#ai-hub)
    - [Settings](#settings)
  - [Component Structure](#component-structure)
  - [API/Backend](#apibackend)
  - [Roadmap \& Future Features](#roadmap--future-features)
  - [Contributing](#contributing)

---

## Overview

The Babel Fish frontend is a **React (TypeScript)** web UI built for speed, customization, and control. You get modern design (MUI, shadcn, Tailwind), persistent dark mode, and full local-first behavior. All major features are driven by API (see [Server(Backend)/README.md](/Docs/Sever(Backend)/README.md) for API details).

---

## UI/UX and Style Guide

- **Responsive:** 100% adaptive from phone to 4K/ultrawide. Layouts scale smoothly with grid/flex and container queries.
- **Dark Theme:** All views default to a muted dark palette, with accent colors for clarity. Fonts and headings use `var(--font-title)` and `var(--font-main)`, for a distinctive but legible look.
- **Consistent Navigation:** Persistent top NavBar (logo, app name, clock, stats). MainTabs for quick tab-switching; always visible and consistent on every screen.
- **Modular Components:** Every major feature is split into components under `/components/{tabname}/...` for max reusability.
- **Accessibility:** All controls are accessible (keyboard, screen reader). Color contrast and font sizing are checked.

---

## Tab Structure & Features

### Payloads

- **Current:**

  - *CRUD for BadUSB payloads* (and other scripts), with fast searching, platform filter, tag display.
  - Table with code preview, tags, meta, and author.
  - “Submit New” opens form for instant payload entry.
  - Per-row View button (links to detail page for future edit/delete).
- **Planned:**

  - Bulk import/export, rich search (regex/syntax-aware), audit logs, bulk tagging, favorite/starred payloads.
  - Integration with multiple device types.
  - API docs: [Server(Backend)/README.md](/Docs/Sever(Backend)/README.md)

### Docs

- **Current:**

  - *Personal docs/PDF library.* Upload, search, preview, and read any PDF/manual/cheatsheet.
  - Inline viewer with text-to-speech (“Read Aloud”).
- **Planned:**

  - Support for more formats (epub, markdown).
  - OCR/scan images, AI search.
  - Graph view of interlinked docs (planned, post-backend-finalization—see `/components/docs/DocsGraphView.tsx` placeholder).
  - Future: Smart doc recommendations (after AI integration).

### Media

- **Current:**

  - Upload, organize, and view images, audio, and video.
  - Inline player/editor (basic: rotate, tag, rename).
  - Metadata panel (edit tags, author, description, custom fields).
  - Duplicates manager (find/resolve similar media).
  - Download/export support (auto type-aware conversion coming soon).
- **Planned:**

  - Smart conversion and preview for any unsupported formats.
  - AI-based face/people/group detection and tagging.
  - Manual & automatic deduplication, with review queue.
  - Filtering, sorting, tagging, and download by device type (“Optimize for: Android, iOS, Windows, etc.”).
  - Full backend sync and media API (see [Server(Backend)/README.md](/Docs/Sever(Backend)/README.md)).

### Logs

- **Current:**

  - Stream/search all system, user, and app logs.
  - Timestamp format toggle (absolute/relative).
  - Filter/search bar.
  - Auto-scroll to newest log entry.
- **Planned:**

  - Live log tailing (websocket), log export, and multi-level log display.
  - Full audit/event logs when user management lands.

### Trash & Recovery

- **Current:**

  - “Recycle bin” for any deleted payloads, docs, or media.
  - Restore or permanently delete.
- **Planned:**

  - Time-based auto-cleanup, bulk restore, and retention policies.

### Backup & Snapshots

- **Current:**

  - Modular backup UI: Create manual backup, see backup history, and configure (placeholders in place for now).
  - Restore, delete, export/import, and scheduling planned.
- **Component Stubs:**

  - `BackupList`, `CreateBackupPanel`, `BackupHistoryTimeline`, `RecentBackupBanner`, `BackupLocationSetting`, `ScheduleBackupPanel`, `DownloadHandler`, `ExportImportPanel`, `RestoreDialog`, `DeleteDialog`, `BackupInfoCard`.
- **Planned:**

  - One-click full/partial backups, backup schedule, download/export, location config, timeline view, detailed info card, cloud/NAS integration (future).
  - See API/DB backup endpoints: [Server(Backend)/README.md](/Docs/Sever(Backend)/README.md).

### Analytics

- **Current:**

  - *Placeholder only:* Coming soon.
- **Planned:**

  - Usage graphs, trend charts, resource breakdowns, and real-time analytics dashboard.
  - Exportable charts and report generation.
  - Hook directly into backend stats API ([Server(Backend)/README.md](/Docs/Sever(Backend)/README.md)).

### AI Hub

- **Current:**

  - Placeholder for all future LLM integrations, Q\&A, and chatbot features.
- **Planned:**

  - Private LLM hosting (text generation, prompt completion), doc embedding search, and smart automation.
  - Full local-only AI pipeline (see backend plans).

### Settings

- **Current:**

  - Will house all app, user, and backend connection settings.
- **Planned:**

  - User/account profiles, theme controls, backup/restore, notifications, and API key management.

---

## Component Structure

- **All major tab logic**: In `/components/{tabname}/TabName.tsx`
- **Shared controls**: `/components/MainTabs.tsx`, `/components/NavBar.tsx`
- **Pages** (routing, detail views): `/pages/`
- **Global styles**: `/src/index.css` (custom variables, dark theme)
- **Each feature = isolated folder** for clarity and fast development.

---

## API/Backend

> The backend is 100% REST-driven (FastAPI).
> **See: [Server(Backend)/README.md](/Docs/Sever(Backend)/README.md)** for all endpoints, schemas, and backend-specific logic.

- All resources (payloads, docs, media, logs, etc.) are loaded via API.
- Local development: swap base API URL in `/src/api/`.
- Auth, user management, and plugin systems handled via backend.

---

## Roadmap & Future Features

- **Full-featured media editing, tagging, smart conversion**
- **Bulk import/export (all tabs)**
- **OSINT integrations (ProbeLink, external enrichment)**
- **Mobile/PWA support**
- **Plugin/extensions system for community modules**
- **Graph view for docs & payloads**
- **AI-powered search, suggestions, and auto-tagging**
- **Cloud/NAS backup targets (optional)**
- **Full access/log auditing, admin dashboards**

---

## Contributing

**Want to hack on Babel Fish?**
PRs, feature requests, and bug reports are *very* welcome.

- Fork & branch off main, submit clean PRs.
- Discuss ideas in Issues first, especially for new resource types or major UI tweaks.

---

> **Babel Fish Frontend:** Fast. Extensible. Yours.
> For the full backend API and data model, see:
> **[Server(Backend)/README.md](/Docs/Sever(Backend)/README.md)**

---

