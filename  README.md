# PolarLearn

PolarLearn is an educational web application for exploring **polar codes** interactively. It combines a FastAPI backend with a React frontend so students can generate masks, run encoding/decoding, inspect intermediate stages, and compare BER performance.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start (Recommended)](#quick-start-recommended)
- [Step-by-Step Manual Setup](#step-by-step-manual-setup)
  - [1) Clone the repository](#1-clone-the-repository)
  - [2) Backend setup (FastAPI)](#2-backend-setup-fastapi)
  - [3) Frontend setup (React + Vite)](#3-frontend-setup-react--vite)
  - [4) Run both services](#4-run-both-services)
- [How to Use the Application](#how-to-use-the-application)
- [Backend API Overview](#backend-api-overview)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Configuration Notes](#configuration-notes)
- [Common Development Commands](#common-development-commands)
- [FAQ](#faq)

---

## Features

- Interactive polarization analysis.
- Mask generation and visualization helpers.
- Polar encoder flow with stage-by-stage outputs.
- Successive Cancellation decoder tracing.
- BER simulation and comparison endpoints.
- Browser-based UI for running and understanding all modules.

---

## Technology Stack

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic
- Pytest

### Frontend
- React
- Vite
- React Router
- Recharts

---

## Project Structure

```text
PolarLearn/
├── backend/
│   ├── app/
│   │   ├── api/           # FastAPI routes and schemas
│   │   ├── core/          # Config, logging, exceptions
│   │   ├── domain/        # Polar code logic and services
│   │   ├── tests/         # Backend tests (pytest)
│   │   └── main.py        # FastAPI app entrypoint
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── api/           # HTTP client and API wrappers
│   │   ├── app/           # Router and app shell
│   │   ├── components/    # UI components
│   │   ├── hooks/         # Page/module hooks
│   │   ├── pages/         # Route-level pages
│   │   └── styles/        # CSS files
│   ├── index.html
│   └── package.json
├── docs/
├── docker-compose.yml
└── README.md
```

---

## Prerequisites

Install the following before you start:

- **Git** (for cloning)
- **Python 3.10+** (3.11 recommended)
- **Node.js 18+** (LTS recommended)
- **npm 9+** (usually comes with Node)

To verify:

```bash
git --version
python3 --version
node --version
npm --version
```

---

## Quick Start (Recommended)

If you want the fastest route:

```bash
# 1) Clone
git clone <YOUR_REPO_URL>
cd PolarLearn

# 2) Backend
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Linux/macOS
pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Open a **second terminal**:

```bash
cd PolarLearn/frontend
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Then open: **http://127.0.0.1:5173**

Backend API docs: **http://127.0.0.1:8000/docs**

---

## Step-by-Step Manual Setup

### 1) Clone the repository

```bash
git clone <YOUR_REPO_URL>
cd PolarLearn
```

If your default branch is not checked out automatically:

```bash
git branch -a
git checkout <branch_name>
```

---

### 2) Backend setup (FastAPI)

From project root:

```bash
cd backend
```

Create virtual environment:

```bash
python3 -m venv .venv
```

Activate it:

- Linux/macOS:
  ```bash
  source .venv/bin/activate
  ```
- Windows (PowerShell):
  ```powershell
  .\.venv\Scripts\Activate.ps1
  ```
- Windows (CMD):
  ```cmd
  .venv\Scripts\activate.bat
  ```

Install dependencies:

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

Run backend server:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Check health quickly:

```bash
curl http://127.0.0.1:8000/
```

Expected behavior:
- Server starts without import errors.
- Swagger UI is available at `/docs`.

---

### 3) Frontend setup (React + Vite)

Open a new terminal and go to frontend directory:

```bash
cd PolarLearn/frontend
```

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

Open in browser:

- App: `http://127.0.0.1:5173`

---

### 4) Run both services

The app expects:

- Frontend at `http://127.0.0.1:5173`
- Backend at `http://127.0.0.1:8000`

Keep both terminals running while using the app.

---

## How to Use the Application

1. Start backend and frontend.
2. Open frontend in browser.
3. Navigate through modules in the sidebar.
4. Enter polar-code parameters (`N`, `K`, SNR/design values, vectors).
5. Submit forms to call backend endpoints.
6. Inspect:
   - generated masks,
   - encoder stages,
   - decoder steps,
   - BER curves/tables,
   - polarization visuals.

Tip: begin with smaller block lengths (e.g., `N=8` or `N=16`) to understand transformations before larger configurations.

---

## Backend API Overview

The backend registers the following route groups:

- `/` (home)
- `/api/theory`
- `/api/mask`
- `/api/encoder`
- `/api/decoder`
- `/api/ber`
- `/api/polarization`

Use Swagger UI for interactive requests:

- `http://127.0.0.1:8000/docs`

Use ReDoc:

- `http://127.0.0.1:8000/redoc`

---

## Testing

Run backend tests:

```bash
cd backend
pytest -q
```

Useful options:

```bash
pytest -q -k encoder
pytest -q -k decoder
pytest -q -k ber
```

---

## Troubleshooting

### 1) `ModuleNotFoundError` on backend start
Cause: missing dependencies or wrong venv.

Fix:
```bash
cd backend
source .venv/bin/activate   # or Windows equivalent
pip install -r requirements.txt
```

### 2) Frontend cannot reach backend (CORS/network)
- Verify backend is running on port `8000`.
- Verify frontend uses `http://127.0.0.1:8000` as API base.
- Check browser devtools Network tab for failed requests.

### 3) Port already in use
Use different ports:

```bash
uvicorn app.main:app --reload --port 8001
npm run dev -- --port 5174
```

If you change backend port, also update frontend API base URL accordingly.

### 4) npm install fails
- Ensure Node.js LTS is installed.
- Remove lockfile/modules and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### 5) pytest not found
Run with module form:

```bash
python -m pytest -q
```

---

## Configuration Notes

- Frontend API base URL is currently hardcoded in `frontend/src/api/client.js`.
- Backend CORS is configured to allow all origins for development convenience.
- `docker-compose.yml` currently exists as a placeholder and is not configured for full one-command startup.

---

## Common Development Commands

### Backend

```bash
# start server with reload
uvicorn app.main:app --reload

# run tests
pytest -q

# install/update deps
pip install -r requirements.txt
```

### Frontend

```bash
# development
npm run dev

# production build
npm run build

# preview production build
npm run preview
```

---

