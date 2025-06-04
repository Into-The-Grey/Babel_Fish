# Babel Fish

**Personal Universal Database & API Platform**  
Built for extensibility and rapid development on Raspberry Pi.

---

## What is Babel Fish?

*Babel Fish* is a personal, extensible web interface and API platform designed to let you manage, organize, and interact with all sorts of structured data—including but not limited to BadUSB payloads. Inspired by the legendary "Babel fish" from Douglas Adams’ *The Hitchhiker’s Guide to the Galaxy*, which instantly translates any language for its wearer, this project aims to make all your technical “languages”—scripts, payloads, configs, notes, code snippets—universally accessible and easy to manage.

> **The Babel fish is a small, yellow, leech-like creature that, when inserted into one’s ear, allows its wearer to instantly understand anything spoken in any language. In *The Hitchhiker’s Guide to the Galaxy*, it’s described as “probably the oddest thing in the Universe” and the ultimate communication tool. This project draws inspiration from that idea: a single tool to unify and translate all your technical resources, just for you.**

---

## Current Features

- **BadUSB Payload Management**  
  - List, search, and view details for all payloads
  - Add new payloads (with metadata and code)
- **API-first Design**  
  - RESTful endpoints for front-end and automation
  - Live interactive documentation (`/docs`)
- **Secure & Local**  
  - Runs on Raspberry Pi (local-first, but accessible over LAN)
- **Extensible**  
  - Designed from the ground up to support new resource types (notes, configs, code snippets, and more) as the project evolves

---

## Roadmap

- [x] Initial payload management (launch point)
- [ ] Payload edit/delete and advanced search/filter
- [ ] Support for other data types (code snippets, device configs, notes, etc.)
- [ ] User authentication & roles
- [ ] Admin dashboard & system health
- [ ] Easy import/export, backup, and migration tools
- [ ] User-facing customization (future: support for multiple users)
- [ ] Mobile-friendly UI

---

## Directory Layout

```Bash

/home/ncacord/Babel\_Fish/
│
├── app/
│   ├── **init**.py
│   ├── main.py
│   ├── models.py
│   ├── db.py
│   ├── crud.py
│   └── payloads.py
│
├── requirements.txt
└── README.md

```

---

## Quickstart

1. **Clone or set up this repository:**

    ```sh
    cd /home/ncacord/Babel_Fish
    ```

2. **Set up a Python virtual environment and install dependencies:**

    ```sh
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3. **Configure your PostgreSQL database connection:**
    - Edit `app/db.py`
    - Update `DATABASE_URL` with your actual PostgreSQL username, password, and database name

4. **Run the backend server:**

    ```sh
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```

5. **Open the interactive API docs:**
    - Visit: [http://192.168.1.109:8000/docs](http://192.168.1.109:8000/docs) in your browser

---

## Requirements

- Python 3.11+
- PostgreSQL (running locally on the Pi or accessible on your network)
- All dependencies in `requirements.txt`

---

## Extending Babel Fish

Babel Fish is built to grow:  

- Want to manage another type of data (like WiFi configs, CLI notes, scripts, or hardware profiles)?  
  Add a new table, schema, and API route—no need to start over.  
- Want to build a custom workflow, export/import tools, or integrations?  
  The platform is modular and designed for easy expansion.

---

## License

MIT (or specify your preferred license)

---

## Contact

Questions, ideas, or want to contribute?  
Contact: [Email](mailto:ncacord@protonmail.com)

---

*Don’t Panic!*

