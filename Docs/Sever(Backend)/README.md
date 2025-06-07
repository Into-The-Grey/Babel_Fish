# 🐟 Babel Fish Backend

## Universal Knowledge Platform · LAN-first · Modular & Extensible

**Babel Fish** is your hacker homebase: payload manager, docs library, personal cloud, and automation hub—running on your hardware, under your control.

---

## Table of Contents

- [🐟 Babel Fish Backend](#-babel-fish-backend)
  - [Universal Knowledge Platform · LAN-first · Modular \& Extensible](#universal-knowledge-platform--lan-first--modular--extensible)
  - [Table of Contents](#table-of-contents)
  - [API Overview](#api-overview)
  - [Authentication](#authentication)
  - [Resource Modules](#resource-modules)
    - [1. Payloads](#1-payloads)
      - [**Model(Payloads):**](#modelpayloads)
      - [**Endpoints(Payloads):**](#endpointspayloads)
        - [**Search \& Filter Parameters:**](#search--filter-parameters)
        - [**Example(Payloads):**](#examplepayloads)
    - [2. Docs](#2-docs)
      - [**Model:**](#model)
      - [**Endpoints:**](#endpoints)
        - [**Search Parameters:**](#search-parameters)
        - [**Upload:**](#upload)
        - [**Example:**](#example)
  - [Error Handling](#error-handling)
  - [File Storage](#file-storage)
  - [Future Modules (stubbed or coming soon)](#future-modules-stubbed-or-coming-soon)
  - [Developer Notes](#developer-notes)
  - [Roadmap](#roadmap)

Welcome to the Babel Fish backend API documentation.  
This backend powers all resource management, search, and persistence for your modular LAN-first knowledge platform.

**Tech Stack:**  

- Python 3.11+
- FastAPI
- SQLAlchemy (async)
- PostgreSQL
- All endpoints return JSON unless otherwise specified

---

## API Overview

- All endpoints are **versionless** (`/api/...`)
- All endpoints are **stateless** (no session memory). **Statelessness means every API call contains all the information needed for the request; nothing is stored in server memory between calls. This makes Babel Fish easy to scale horizontally and distribute across multiple servers, and also helps with reliability and deployment in containerized or cloud environments.**
- Endpoints requiring authentication are clearly marked in the API tables below (`Auth` column):
  - `✅` = Requires HTTP Basic Auth
  - `❌` = Public (no auth required)

---

## Authentication

All resource-changing endpoints require HTTP Basic Auth for security.

- **Credentials:**
  - Credentials are set via environment variables (`.env`) or backend config—never hard-coded or stored in the repo.
  - Example variables: `BFISH_USER`, `BFISH_PASS` (see `.env.example`)
  - Use a strong, unique password for any real deployment.
- **How to Authenticate:**
  - Include an `Authorization: Basic ...` header in your API requests. (Browsers and most REST clients support this.)
- **Frontend:**
  - The frontend will prompt for credentials automatically when a protected endpoint returns a 401/403.
- **Production Guidance:**
  - **Warning:** Basic Auth is *not secure for public or Internet-facing deployments.* For any public, production, or remote use, you **must** upgrade to JWT authentication or OAuth2 and enable HTTPS. Basic Auth is for development or LAN-restricted use only.
  - Support for admin/user roles and API key management is planned.
- **Warning:** Never commit any real usernames or passwords to version control. Always use secrets management.

---

## Resource Modules

### 1. Payloads

#### **Model(Payloads):**

```json
{
  "id": 123,
  "title": "Rubber Ducky Attack",
  "description": "Windows reverse shell payload.",
  "code": "REM Windows reverse shell...",
  "tags": ["windows", "reverse", "admin"],
  "platform": "windows",
  "author": "Cain",
  "created_at": "2024-06-07T10:43:00Z",
  "updated_at": "2024-06-07T10:45:01Z"
}
```

#### **Endpoints(Payloads):**

| Endpoint                          | Method | Auth | Description                                |
|------------------------------------|--------|------|--------------------------------------------|
| `/api/payloads`                   | GET    | ❌   | List/search/filter all payloads            |
| `/api/payloads`                   | POST   | ✅   | Create new payload                         |
| `/api/payloads/{id}`              | GET    | ❌   | Get single payload by ID                   |
| `/api/payloads/{id}`              | DELETE | ✅   | Soft-delete payload                        |
| `/api/payloads/export`            | GET    | ✅   | Bulk export payloads (JSON)                |
| `/api/payloads/import`            | POST   | ✅   | Bulk import payloads (JSON)                |
| `/api/payloads/{id}/download`     | GET    | ❌   | Download payload code (plain text)         |

##### **Search & Filter Parameters:**

- `q`: Full-text search (title, description, code)
- `tags`: Filter by tag(s)
- `platform`: Filter by platform
- `author`: Filter by author

##### **Example(Payloads):**

```http
GET /api/payloads?q=reverse+shell&platform=windows&tags=admin
```

---

### 2. Docs

#### **Model:**

```json
{
  "id": 55,
  "filename": "Linux-Cheatsheet.pdf",
  "url": "/api/docs/55/download",
  "uploaded_at": "2024-06-07T10:50:12Z"
}
```

#### **Endpoints:**

| Endpoint                        | Method | Auth | Description                              |
|----------------------------------|--------|------|------------------------------------------|
| `/api/docs`                     | GET    | ❌   | List/search all docs (PDFs)              |
| `/api/docs`                     | POST   | ✅   | Upload one or multiple PDF files         |
| `/api/docs/{id}`                | DELETE | ✅   | Delete doc and remove file from disk     |
| `/api/docs/{id}/download`       | GET    | ❌   | Download or stream PDF                   |

##### **Search Parameters:**

- `search`: Search by filename

##### **Upload:**

- **POST** `/api/docs`
- Content-Type: `multipart/form-data`
- Field: `files` (can upload multiple PDFs)

##### **Example:**

```http
GET /api/docs?search=cheatsheet
```

---

## Error Handling

- All errors return JSON with a `detail` field and appropriate HTTP status.
- Example:

  ```json
  {
    "detail": "Payload not found"
  }
  ```

---

## File Storage

- All docs (PDFs) are stored in a path configurable via the `DOCS_FOLDER` environment variable. Default: `/backend/data/docs/`.
- Payloads are database-only (no file storage).
- Download URLs provided in all list responses.

---

## Future Modules (stubbed or coming soon)

- **Media**: `/api/media`
- **Logs**: `/api/logs`
- **Trash/Recovery**: `/api/trash`
- **Backup/Snapshots**: `/api/backups`
- **Analytics**: `/api/analytics`
- **AI**: `/api/ai` (all endpoints return `501 Not Implemented`)
- **Settings**: `/api/settings`

---

## Developer Notes

- All endpoints follow REST best practices and use Pydantic models.
- All endpoints are under `/api` prefix.
- Frontend and backend field names must match exactly.
- All code is **async**—no blocking calls.

---

## Roadmap

- Expand docs/media to support metadata, tags, and preview.
- **Warning:** Basic Auth is *not secure for public deployments*. Strongly recommend implementing JWT and user roles (or OAuth2) before exposing beyond LAN.
- Add file deduplication, advanced search, and event/audit logs.
- See [project root README](/README.md) and frontend docs for more info.

---

> For questions or API bugs, open an Issue or contact the backend maintainer.
