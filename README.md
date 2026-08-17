# Interactive Multi-Page Portfolio — React

A multi-page personal portfolio built with React, converted from a static HTML/CSS site  into a component-based, client-side-routed application.


---

## Setup & Run Instructions

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
# opens at http://localhost:5173 by default

# 3. Build for production
npm run build
```

**Requirements:** Node.js and npm installed.

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

## AI Assistance Disclosure

AI tools were used as a supporting resource during development for:

- Debugging individual code snippets and understanding errors.
- Discussing website design, layout, and component structure.
- Helping organize and format this `README.md` correctly.

The project implementation and final design decisions were done by the author.

---

## Folder Structure

```
src/
├── assets/          # images
├── components/       # Navbar, Footer, Layout, ProjectCard, TechTags, Skills, ContactForm
├── data/              # projects.js, aboutCards.js
├── pages/             # Home, About, Projects, ProjectDetail, Contact, NotFound
├── App.jsx
└── main.jsx
```