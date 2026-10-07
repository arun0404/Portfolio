<h2 align="center">
  Arun Kumar — Portfolio
</h2>

<p align="center">
  AI/ML Engineer portfolio showcasing computer vision & generative AI work, skills, and résumé.
</p>

## Built With

- React.js (Create React App / react-scripts)
- React-Bootstrap
- CSS3, with a dark/light theme toggle
- react-tsparticles (animated background, dark theme only)
- react-github-calendar (live "Days I Code" contribution graph)

## Features

**📜 Single-page scrolling layout** — Hero, Skills, Projects, Timeline, and Contact, navigated via smooth-scroll anchor links and a full-screen menu overlay

**🌓 Dark/light theme toggle**, persisted across visits

**🔍 Searchable, filterable projects grid** by category

**📄 Downloadable résumé** (PDF) from the hero section

**📊 Live GitHub contribution graph**

**📱 Fully responsive**

## Getting Started

Clone down this repository. You will need `node.js` and `git` installed globally on your machine.

## 🛠 Installation and Setup Instructions

1. Installation: `npm install`

2. In the project directory, you can run: `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.

Other available scripts:

- `npm run build` — production build to `build/`
- `npm test` — runs the Jest/Testing Library test suite

## Project Structure

All components live under `/src/components/`, one folder per page section — `Home/`, `Skills/`, `Projects/`, `Journey/` (the timeline), `Contact/` — plus shared UI rendered across the whole page: `Navbar.js`, `Footer.js`, `Particle.js`, `ThemeToggle.js`.
