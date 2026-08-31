# Yup Validator Game

A demo project for learning **frontend validation with Yup** and **backend validation with Joi**. The React app lets you test validation patterns in separate tabs. On submit, data is sent to an Express backend where Joi validates the payload and returns field-level errors.

---

## What This Project Does

| Layer | Library | Purpose |
|-------|---------|---------|
| Frontend | Yup + React Hook Form | Client-side validation (can be toggled off) |
| Backend | Joi + Express | Server-side validation on every submit |
| UI | React Bootstrap | Forms, tabs, alerts, and layout |

### Validation demos included

1. **Basic Fields** — string, email, number (age 18–60)
2. **Password** — regex strength + confirm password match
3. **Conditional** — car ID controls which field is required (`.when()` / `Joi.when()`)
4. **Custom Validation** — amount with max 2 decimal places
5. **All Combined** — every rule in one form

---

## Prerequisites

Install these before running the project:

- **Node.js** — version **16.x or higher** (18+ recommended)
- **npm** — comes with Node.js

Check your versions:

```bash
node -v
npm -v
```

---

## Project Structure

```
yup-validator-game/
├── backend/                    # Express + Joi API
│   ├── package.json
│   └── src/
│       ├── index.js            # Server entry (port 5000)
│       ├── middlewares/
│       │   └── validate.js     # Joi validation middleware
│       ├── routes/
│       │   └── form.routes.js  # POST /api/forms/*
│       └── validations/        # Joi schemas (mirror frontend Yup)
│           ├── basicFields.validation.js
│           ├── password.validation.js
│           ├── conditional.validation.js
│           ├── customValidation.validation.js
│           ├── form.validation.js
│           └── custom.validation.js
├── public/
├── src/                        # React frontend
│   ├── components/
│   │   ├── Form.js             # Tab switcher
│   │   ├── forms/              # One form per validation type
│   │   └── form-sections/      # Reusable field groups
│   ├── constants/
│   ├── hooks/
│   ├── services/
│   │   └── formApi.js          # Calls backend API
│   └── validations/            # Yup schemas
│       └── schemas/
├── package.json
└── README.md
```

---

## Installation

### 1. Clone or download the project

```bash
cd yup-validator-game
```

### 2. Install frontend dependencies

From the **project root**:

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
cd ..
```

Or from the root in one step:

```bash
npm install --prefix backend
```

---

## Running the Application

You need **two terminals** — one for the backend, one for the frontend.

### Terminal 1 — Start the backend (Joi API)

From the project root:

```bash
npm run server
```

Or from the `backend` folder:

```bash
cd backend
npm start
```

Expected output:

```
Backend Joi server running on http://localhost:5000
```

**Backend dev mode** (auto-restart on file changes, Node 18+):

```bash
cd backend
npm run dev
```

Verify the backend is up:

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{ "success": true, "message": "Joi validation backend is running" }
```

### Terminal 2 — Start the frontend (React app)

From the project root:

```bash
npm start
```

The app opens at:

**http://localhost:3000**

The frontend proxies API requests to `http://localhost:5000` (configured in root `package.json`).

---

## How to Use the App

1. Open **http://localhost:3000** in your browser.
2. Use the **tabs** at the top to switch between validation demos.
3. **Yup validation toggle** (top of each form):
   - **ON** — Yup runs in the browser before submit.
   - **OFF** — skips frontend Yup; submit goes straight to the backend.
4. Click **Submit**:
   - If Yup is on and fails → errors show under fields (frontend).
   - If Yup passes (or is off) → data is POSTed to the backend.
   - If Joi fails → red alert + errors under fields (backend).
   - If Joi passes → green success alert.

### Conditional validation tab

Each car ID maps to one required field:

| Car ID | Car | Required field |
|--------|-----|----------------|
| 1 | Volvo | `first_field` |
| 2 | Audi | `second_field` |
| 3 | Toyota | `third_field` |
| 4 | Ferrari | `fourth_field` |

---

## API Endpoints (Backend)

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/forms/basic` | Basic fields validation |
| POST | `/api/forms/password` | Password validation |
| POST | `/api/forms/conditional` | Conditional validation |
| POST | `/api/forms/custom` | Custom amount validation |
| POST | `/api/forms/combined` | All validations combined |

### Example: submit with invalid data

```bash
curl -X POST http://localhost:5000/api/forms/basic \
  -H "Content-Type: application/json" \
  -d "{}"
```

Example error response (400):

```json
{
  "success": false,
  "message": "Backend Joi validation failed",
  "source": "joi",
  "errors": {
    "full_name": "Full Name is Required!",
    "email": "Email is Required!",
    "age": "Age is Required!"
  }
}
```

### Example: submit with valid data

```bash
curl -X POST http://localhost:5000/api/forms/basic \
  -H "Content-Type: application/json" \
  -d "{\"full_name\":\"John Doe\",\"email\":\"john@example.com\",\"age\":25}"
```

Example success response (200):

```json
{
  "success": true,
  "message": "Basic fields passed backend Joi validation",
  "source": "joi",
  "data": {
    "full_name": "John Doe",
    "email": "john@example.com",
    "age": 25
  }
}
```

---

## Available Scripts

### Root (frontend)

| Command | Description |
|---------|-------------|
| `npm start` | Start React dev server (port 3000) |
| `npm run server` | Start backend from root |
| `npm run build` | Production build to `build/` |
| `npm test` | Run frontend tests |

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `npm start` | Start Express server (port 5000) |
| `npm run dev` | Start with auto-reload (Node 18+) |

---

## Environment Variables

### Backend

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Backend server port |

Example:

```bash
# Windows PowerShell
$env:PORT=5001; npm start

# macOS / Linux
PORT=5001 npm start
```

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `""` (uses proxy) | Override API base URL |

Use `REACT_APP_API_URL` only if the backend runs on a different host/port without the CRA proxy.

---

## Troubleshooting

### Port 3000 already in use

React will ask to use another port (e.g. 3001). Press **Y** to confirm.

To free port 3000 on Windows PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### Port 5000 already in use

Change the backend port:

```powershell
$env:PORT=5001; npm start
```

Then set in root `.env`:

```
REACT_APP_API_URL=http://localhost:5001
```

Restart the React app after changing `.env`.

### Backend errors not showing on submit

1. Confirm the backend is running (`http://localhost:5000/api/health`).
2. Start the **backend before** or **with** the frontend.
3. Check the browser **Network** tab for failed `POST /api/forms/...` requests.

### `npm install` fails or build errors

Try a clean reinstall:

```bash
# From project root
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install

cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
cd ..
```

### Proxy not working

Ensure root `package.json` contains:

```json
"proxy": "http://localhost:5000"
```

Restart `npm start` after changing the proxy.

---

## Validation Flow (Summary)

```
User fills form
      ↓
[Optional] Yup validation (frontend toggle)
      ↓
POST /api/forms/{type}
      ↓
Joi validate middleware (backend)
      ↓
   ┌──────┴──────┐
   ↓             ↓
 400 errors    200 success
 (show on UI)  (green alert)
```

---

## Tech Stack

- **React 18** — UI
- **React Hook Form** — form state
- **Yup** — frontend schemas
- **React Bootstrap 2** + **Bootstrap 5** — styling
- **Express 4** — backend API
- **Joi 17** — backend schemas

---

## License

Private demo project for learning Yup and Joi validation patterns.
