# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm install     # install dependencies
npm start       # dev server at localhost:3000, hot-reloads on save (CRA/webpack)
npm run build   # production build to build/
npm test        # runs react-scripts test (Jest + Testing Library) in watch mode
```

- No standalone lint command — ESLint runs through `react-scripts` (`eslintConfig` in `package.json` extends `react-app`), surfacing warnings in the terminal running `npm start` and in the browser overlay.
- There is no test suite beyond the CRA boilerplate: `src/App.test.js` still asserts on a "learn react" link that doesn't exist in this app, so `npm test` fails out of the box. Don't treat that failure as something you broke; either fix/replace that test or leave it as a known pre-existing issue when working elsewhere.
- `npm run eject` exists (CRA default) but is irreversible — don't run it.

## Architecture

This is a **Create React App (react-scripts 5, React 17)** single-page portfolio site, not a framework app — no server code, no API routes, no state management library. Everything is client-rendered.

**Single-page layout, not routed** (`src/App.js`): this used to be a five-route React Router app; it's now one long scrolling page. `App.js` stacks all five page components as sibling `<section id="...">` wrappers inside one `<div className="page-content">`:
- `<section id="home"><Home /></section>`
- `<section id="about"><About /></section>`
- `<section id="projects"><Projects /></section>`
- `<section id="resume"><ResumeNew /></section>`
- `<section id="contact"><Contact /></section>`

There is no router in the tree at all — `react-router-dom` is still in `package.json` but no longer imported anywhere; don't reintroduce `<Link>`/`useNavigate`/etc. without a reason, since nothing here has a real distinct URL to go to anymore. `src/components/ScrollToTop.js` is similarly dead (it only ever reset scroll on route change) — left on disk, not rendered.

`Navbar` and `Footer` are rendered outside `.page-content` in `App.js`, so they persist across the whole scroll. A `Preloader` gates page scroll for the first 1.2s on load by toggling the `#no-scroll` / `#scroll` id on the root `<div className="App">`.

**Nav = anchor scroll + scroll-spy, not navigation** (`src/components/Navbar.js`): each nav link is a plain `<Nav.Link href="#home">` etc. — the smooth-scroll animation is pure CSS (`html { scroll-behavior: smooth }` in `style.css`), no scroll library. `section[id] { scroll-margin-top: 80px }` keeps the fixed navbar from covering the section's top when a hash jump lands. Navbar.js also runs an `IntersectionObserver` (`rootMargin: "-45% 0px -45% 0px"`, i.e. a thin band at the vertical center of the viewport) to track which section is currently "in view" and toggle an `.active` class on the matching link, reusing the existing hover-underline CSS (`.navbar-nav .nav-item a.active::after`) rather than a separate visual treatment.

If you add a new section, give its wrapping `<section>` a unique `id` and add that id to both `SECTION_IDS` in `Navbar.js` and the `scroll-margin-top` selector list in `style.css` — and grep for the id first: `Home2.js` (rendered inside `Home.js`) used to own `id="about"` itself, a leftover from what looks like an even earlier single-page version of this template, and collided with the new `<section id="about">` before being renamed to `id="intro"`. `Home.js`'s own top-level container also used to duplicate `id="home"` for the same reason. Duplicate ids won't error, they'll just make the observer and anchor scrolling land on whichever element the browser happens to pick.

**Sticky-footer layout**: `.App` is a flex column (`display:flex; flex-direction:column; min-height:100vh` in `App.css`), and `.page-content` (`flex: 1 0 auto`) holds the five stacked sections — in practice the combined page is always taller than the viewport, so this mostly matters for very short viewports. `.contact-section` no longer carries special flex/min-height rules for this — those were a leftover from when Contact was routed in alone as the sole content of `.page-content`; nesting it inside `<section id="contact">` among four siblings made them inert, so they were removed. `.contact-section` still uses `display:flex; flex-direction:column; justify-content:center` for its own internal centering, which is unrelated and still active.

**Component layout**: `src/components/<PageName>/` holds one folder per section (`Home/`, `About/`, `Projects/`, `Resume/`, `Contact/`), each composed of a top-level component plus its sub-sections as siblings (e.g. `Home/Home.js` renders `Home/Home2.js` and `Home/Type.js`; `About/About.js` renders `AboutCard.js`, `Techstack.js`, `Toolstack.js`, `Github.js`). Shared components (`Navbar.js`, `Footer.js`, `Particle.js`, `ThemeToggle.js`, `Pre.js`) live directly under `src/components/`.

**Styling & theming**: one global stylesheet (`src/style.css`, ~940 lines) plus a small `App.css`, loaded once in `App.js` alongside Bootstrap's CSS. No CSS modules or styled-components — components use plain class names and inline `style={{}}` objects. `react-bootstrap` supplies layout primitives (`Container`/`Row`/`Col`); look up matching classes in `style.css` before adding new ones.

The site has a dark/light theme system driven by CSS custom properties defined in `html {}` at the top of `style.css`, redefined under `html[data-theme="light"]`:
- `--imp-text-color` — the accent color (`.purple` utility class). `#c770f0` in dark, a deeper `#7c3aed` in light (the vibrant dark-mode value fails contrast on a light background).
- `--text-color`, `--body-gradient`, `--section-background-color`, `--quote-footer-color` — repaint page content between themes.
- **Navbar/Footer/buttons are a fixed dark "chrome" in both themes and are deliberately NOT tied to these tokens** — only page content repaints. `.navbar-nav .nav-link`, `.footer h3`, and `.btn-primary` keep their hardcoded white text on purpose. If you add new chrome-level UI, follow that pattern rather than wiring it to `--text-color`.
- `ThemeToggle.js` (rendered in `Navbar.js`) toggles the `data-theme` attribute on `<html>`, persists the choice to `localStorage` (`portfolio-theme`), and broadcasts a `THEME_CHANGE_EVENT` (`window` CustomEvent) on every change.
- `Particle.js` can't read CSS variables (it paints particle dots to a `<canvas>` via `react-tsparticles`), so it listens for that broadcast event directly and re-keys itself to pick a visible dot color in light mode. It's mounted exactly once, in `App.js`, but `ThemeToggle.js` lives several levels away inside `Navbar.js` with no shared state — the event bridge is what connects them instead of prop-drilling through App.js. Follow the same pattern (import `THEME_CHANGE_EVENT` from `ThemeToggle.js`) for any other canvas/WebGL element that needs to react to the theme.

**Icons/assets**: `react-icons` (multiple sub-packages: `ai`, `fa`, `bs`, `si`, `cg`, `vsc`, etc.) for most iconography; a handful of hand-authored SVGs live in `src/Assets/` (including `TechIcons/` for skill logos not covered by `react-icons`, and `Projects/` for the project-card thumbnails) and are imported directly as modules — CRA's webpack config inlines/hashes them automatically, no manual asset pipeline needed.

**Projects section** (`components/Projects/Projects.js`): data-driven, not hardcoded JSX. A `PROJECTS` array (each with `id`, `imgPath`, `title`, `description`, `tag`, `categories: []`) is filtered client-side by a search box (matches title/description) and category chips (`CATEGORIES` array); add a new project by pushing an entry onto `PROJECTS`; add a new category by adding it to both `CATEGORIES` and the relevant project's `categories`. `ProjectCards.js` only renders the GitHub button when `ghLink` is passed and the Demo button when `demoLink` is passed (both optional) — when a project has no public repo, pass `tag` instead (e.g. `"Confidential — Client Name"`) to show a context pill rather than a dead link.

**Résumé rendering** (`components/Resume/ResumeNew.js`): uses `react-pdf` to render a bundled PDF (`src/Assets/*.pdf`, imported as a module) inline as a canvas, plus two "Download CV" buttons carrying a `download="Arunkumar_Resume.pdf"` attribute (without it, saves would get the webpack content-hashed filename instead of a clean one). Only page 1 is rendered (`<Page pageNumber={1} />`) — if the résumé PDF ever becomes multi-page, that component needs updating to render/paginate the rest.

**Live external data**: the "Days I Code" section (`About/Github.js`) uses `react-github-calendar`, which fetches a GitHub user's contribution graph at runtime from `github-contributions-api.jogruber.de` (third-party proxy, not the GitHub API directly) — this section requires network access and shows nothing if that endpoint is unreachable.

**Background effect**: `Particle.js` (tsparticles-based) mounts once in `App.js`, behind the Navbar and `.page-content`, as one continuous full-page background rather than a separate instance per section (it used to be mounted inside each page component — that duplicated the tsparticles engine five times and made section backgrounds visually inconsistent; both were fixed together). See the theming note above for its event-driven color handling.

## Repo notes

`git remote origin` still points to the upstream template repo (`github.com/soumyajit4419/Portfolio`), not a fork under this project owner's account — confirm before pushing.
