# Interactive Multi-Page Portfolio — React

A multi-page personal portfolio full stack project built using react for frontend and express.js/node.js for backend


---

## Setup & Run Instructions
```bash
# Backend

cd server

npm install

npm run dev

# Frontend

npm install

npm run dev
```

> **Note:** - Backend must be running first for the frontend's projects/contact pages to work 
---

## Component Tree

```
main.jsx
└── BrowserRouter
    └── App.jsx                    (theme state lives here)
        └── Routes
            └── Layout.jsx          (route: "/", shared across all pages)
                │   receives: theme, toggleTheme (props from App)
                │
                ├── theme toggle <button>          (uses theme, toggleTheme directly)
                ├── Navbar.jsx                      (isMobile state — own responsive logic)
                ├── <Outlet /> → one of:
                │     ├── Home.jsx                  (isLoading state)
                │     ├── About.jsx                 (maps aboutCards.js)
                │     │     └── Skills.jsx           (props: title, description) 
                │     ├── Projects.jsx               (maps projects.js)
                │     │     └── ProjectCard.jsx       (props: id, number, title, description, techStack, link)
                │     │           │   own state: isOpening
                │     │           └── TechTags.jsx     (props: techStack)
                │     ├── ProjectDetail.jsx          (useParams -> projectId, looks up project from projects.js)
                │     │     └── TechTags.jsx          (props: techStack)
                │     ├── Contact.jsx
                │     │     └── ContactForm.jsx       (own state: formData, errors, submitted)
                │     └── NotFound.jsx                (catch-all route "*")
                └── Footer.jsx
```

### Prop drilling
`Projects.jsx` reads the `projects` array from `src/data/projects.js`, and for each project passes its fields as props to `ProjectCard`. `ProjectCard` then passes just the `techStack` field further down to `TechTags` , which renders the tag pills. The same `TechTags` component is reused independently from `ProjectDetail.jsx`.

### State-lifting decisions
- **`theme`** is lifted all the way up to `App.jsx` (the top of the component tree) rather than kept in `Layout` or `Navbar`, because it needs to persist across route changes and be readable/writable from a single source of truth. It's passed down to `Layout` via props, where the toggle `<button>` lives. The actual visual theming is applied globally by setting a `data-theme` attribute on `document.body` inside a `useEffect`, so CSS handles the styling — this avoids having to drill `theme` further down into `Navbar`, `Footer`, or every page component just to change colors.
- **`isMobile`** (in `Navbar.jsx`) is kept local to `Navbar` since no other component needs to know the viewport width — it only affects how the nav labels render ("Intro" vs "Introduction").
- **`isLoading`** (in `Home.jsx`) is local to `Home` since it only gates that page's own initial render.
- **`isOpening`** (in `ProjectCard.jsx`) is intentionally kept local to each card instance (not lifted to `Projects.jsx`), so that clicking "View Details" on one card doesn't affect the button text on any other card — each `ProjectCard` manages its own state independently.
- **`formData` / `errors` / `submitted`** (in `ContactForm.jsx`) are kept local to the form component since nothing outside the form needs that state.

---

## useEffect Hooks — what and why

| Location | Dependency | What it does | Why it's necessary |
|---|---|---|---|
| `App.jsx` | `[theme]` | Writes the current `theme` value to `localStorage`, and sets `data-theme` on `document.body` | Persists the user's theme choice across page reloads, and re-applies it whenever `theme` changes (not just once) |
| `Navbar.jsx` | `[]` | Adds a `resize` event listener to `window` to track `isMobile`; **returns a cleanup function** that removes the listener | Needed once on mount to make the nav responsive; the cleanup prevents a memory leak / duplicate listeners if `Navbar` ever unmounts and remounts |
| `Home.jsx` | `[]` | Starts a `setTimeout` to simulate a ~1s loading delay before showing the intro content; **returns a cleanup function** that clears the timeout | Runs once on mount to create the loading sequence; the cleanup prevents the timer from firing (and calling `setState` on an unmounted component) if the user navigates away from Home before the second elapses |

The initial theme value itself is read from `localStorage` inside `useState`'s initializer function in `App.jsx` (`useState(() => localStorage.getItem("theme") || "dark")`), so the saved preference is restored immediately on load, before the `useEffect` above even runs.

---

## Routing

- Configured with `react-router-dom` (`BrowserRouter` in `main.jsx`)
- Routes: `/`, `/Home`, `/about`, `/projects`, `/projects/:projectId` (dynamic, via `useParams`), `/contact`, and a catch-all `*` -> `NotFound`
- All routes share the `Layout` component (`Navbar` + `Footer` persist across navigation) via nested routes and `<Outlet />`
- Navigation uses `<NavLink>` (Navbar) and `<Link>` (buttons, back-links) exclusively — no plain `<a>` tags for internal navigation, so route changes don't trigger full page reloads

---

## Environment Variables

This project uses a single `.env` file at the project root, shared by both frontend and backend. 


| Variable              | Used by   | Description                                                                 | Default (example)              |
|------------------------|-----------|--------------------------------------------------------------------------------|---------------------------------|
| `PORT`                 | Backend   | Port the Express server listens on.                                            | `5000`                          |
| `DATA_FILE_PATH`       | Backend   | Path to the JSON file used as the project data store.                          | `./data/projects.json`          |
| `CORS_ORIGIN`          | Backend   | The single origin allowed to make cross-origin requests to this API — should match wherever the frontend dev server runs. | `http://localhost:5173`         |
| `VITE_API_BASE_URL`    | Frontend  | Base URL the frontend uses to reach the backend API. Must be prefixed with `VITE_` so Vite exposes it to client-side code. | `http://localhost:5000`         |

> **Note:** `PORT` and `VITE_API_BASE_URL` must stay in sync — if you change the backend's port, update `VITE_API_BASE_URL` to match, or the frontend won't be able to reach the backend.

## API Reference

Base URL: `http://localhost:5000` (or whatever `VITE_API_BASE_URL` / `PORT` are set to).

---

### GET / (B1)

Health check confirming the API is running.

**Request:** no body.

**Success- 200:**
```json
{"status" : ok}
```

---

### GET /api/projects (B2)
Returns the full list of projects.

**Request:** no body.

**Success - 200:**
```json
[
    {
        "id": "multithread-task-scheduler",
        "title": "Multithread Task Scheduler",
        "description": "This project implements a ThreadPool...",
        "techStack": ["C++ 17", "Multithreading", "Priority Based Scheduling", "Threads"],
        "image": null,
        "link": "https://github.com/Cherishsaigopal/multithread-task-scheduler#overview"
    }
]
```
There is no triggerable failure case for this endpoint(it always returns the full list).

---

### GET /api/projects/:id (B3)
Returns a single project matching the given id.

**Request:** no body. Example: `GET /api/projects/multithread-task-scheduler` 

**Success - 200:**
```json
{
    "id": "multithread-task-scheduler",
    "title": "Multithread Task Scheduler",
    "description": "This project implements a ThreadPool...",
    "techStack": ["C++ 17", "Multithreading", "Priority Based Scheduling", "Threads"],
    "image": null,
    "link": "https://github.com/Cherishsaigopal/multithread-task-scheduler#overview"
}
```

**Failure - 404 (id does not exist):** Example: `GET /api/projects/does-not-exist`
```json
{"error" : "Project not found"}
```

---

### POST /api/contact (B4)
Validates and stores a contact form submission.

**Request Body:**
```json
{"name" : "John","email" : "abc@email.com","message" : "Hello!"}
```

**Success - 201:**
```json
{
    "message": "Thanks! Your message has been received.",
    "submission": {
        "id": 1,
        "name": "John",
        "email": "abc@example.com",
        "message": "Hello!",
        "receivedAt": "2026-09-09T10:15:00.000Z"
    }
}
```
**Failure - 400 (missing name):**
```json
{"error" : "Name is required"}
```

**Failure - 400 (missing email):**
```json
{"error" : "Email is requires"}
```

**Failure — 400 (invalid email format):**
```json
{ "error": "Enter a valid email" }
```

**Failure — 400 (missing message):**
```json
{ "error": "Message is required" }
```

**Failure — 400 (malformed JSON body):** e.g. sending a broken/truncated JSON payload
```json
{ "error": "Malformed JSON in request body" }
```

---

### GET /api/contact (B5)
Returns all stored contact submissions, for verification purposes.
>** No authentication:** This endpoint is intentionally open with no auth for the purpose of this assingment, so submitted data can be veirfied during evaluation.

**Request:** no body.

**Success — 200:**
```json
[
  {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello!",
    "receivedAt": "2026-09-14T10:15:00.000Z"
  }
]
```

---

### 404 Catch-All & Error Handling (B6)
Any request to an undefined route returns a JSON 404 instead of a raw HTML/stack trace.

**Request:** `GET /api/doesnotexist`

**Failure — 404:**
```json
{ "error": "Route GET /api/doesnotexist not found" }
```

Any unhandled server-side error (ex: a thrown exception in a route) is caught by a global express error-handling middleware,logged, and returned as a JSON error with an appropriate status code- the server keeps running afterwards without crashing.

---

### CORS & Environment Configuration (B7)
CORS is enabled via the `cors` package, restricted to a single allowed origin read from the `CORS_ORIGIN` environment variable. All other configuration — port, data file path, allowed origin, and the frontend's API base URL — is loaded from environment variables via `.env`

---

## Postman

A postman collection covering all 7 required endpoints (B1-B7), organized into folders (`Health`,`Projects`,`Contact`,`Errors`), including one failure case for each validated endpoint, is exported at: `/postman_collection.json`

**To run it:**
1. Open Postman → **Import** → select `postman_collection.json` from the repo.
2. Make sure the backend is running first (`cd server && npm run dev`).
3. Run requests individually, or use **Runner** to execute the whole collection in sequence.
4. The collection uses a `base_url` variable (default `http://localhost:5000`)

**Collection contents (11 requests):**
- **Health** — `GET /`
- **Projects** — `GET /api/projects`, `GET /api/projects/:id` (success + not-found)
- **Contact** — `POST /api/contact` (success + 5 failure cases: missing name/email/message, invalid email, malformed JSON), `GET /api/contact`
- **Errors** — `GET` to an undefined route (404 catch-all)

## AI Assistance Disclosure

AI tools were used as a supporting resource during development for:

- Debugging individual code snippets and understanding errors.
- Discussing website design, layout, and component structure.
- Helping organize and format this `README.md` correctly.

The project implementation and final design decisions were done by the author.

---

## Folder Structure

```
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/                
│   ├── components/             
│   ├── data/
│   │   └── aboutCards.js        
│   ├── pages/                    
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── server/                        
│   ├── data/
│   │   ├── projects.json           
│   │   ├── projectsStore.js         
│   │   └── contactsStore.js          
│   ├── middleware/
│   │   └── errorHandler.js            
│   ├── routes/
│   │   ├── projects.js                 # GET /api/projects, GET /api/projects/:id
│   │   └── contact.js                   # POST /api/contact, GET /api/contact
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .env                                
├── postman_collection.json    # exported Postman collection — see Postman
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```
