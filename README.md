# Eyus Portfolio Tactical SPA

My personal portfolio, built as a single-page Nuxt 3 app with Vue 3 (Composition API) and Tailwind CSS, and styled like an Air Force tactical HUD. It shows my projects, my contact details, and where to find me online.

## Features

- One page split into four sections (SCAN, INTEL, HANGAR, COMMS), with animated transitions as each section scrolls into view.
- A HUD look throughout: scanlines, a night-vision (NVG) mode, and a Three.js background that flies low over a wireframe contour map and climbs as you scroll.
- A side rail that tracks the active section with Intersection Observer and shows how far down the page you are.
- ACE, a chat assistant that answers questions about me. It runs through a Nuxt server route that calls Google's Gemini API.
- A small music player, a scroll-to-top button, and live GitHub stats served from cached server routes.
- A contact form that validates input, submits through Web3Forms, shows a loader while sending, and uses a honeypot field to catch spam.
- Responsive layout built mobile first with Tailwind CSS.

## Project structure

```
eyus-portfolio/
├── assets/              # Global CSS, audio, and other static assets.
├── components/          # Vue components (SideNav.vue, Navigator.vue, CoPilotMusicPlayer.vue, ...).
│   └── ui/              # Visual building blocks (e.g., FlightTerrainBg.vue).
├── composables/         # Shared state and helpers (theme, HUD boot, custom cursor, ...).
├── pages/               # Contains the single page-level Vue component (index.vue).
│   └── index.vue        # The main SPA with all sections (SCAN, INTEL, HANGAR, COMMS).
├── public/              # Publicly accessible files like favicon.
├── server/api/          # Nuxt server routes (chat, GitHub stats and languages).
├── README.md            # This file.
├── tailwind.config.js   # Tailwind CSS configuration, including custom colors and animations.
└── package.json         # Project dependencies and scripts.
```

Everything lives on one page, `pages/index.vue`. Files in `public/` are served as is.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EyuReaper/eyus-portfolio.git
   cd eyus-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   Then open `http://localhost:3000` (or whichever port the dev server prints).

To use the ACE chat locally, copy `.env.example` to `.env` and add a Google AI API key.

## Usage

Edit the Vue components in any editor; the dev server hot-reloads changes in the browser. Run `npm run build` to build for production.

## Security and accessibility

API keys stay on the server: the chat route reads the Gemini key from an environment variable, and the browser never sees it. Form submissions go over HTTPS, and the honeypot field helps filter out spam bots.

Every form input has a `<label>`, and the form uses `aria-invalid`, `aria-describedby`, and an `aria-live` region so screen readers announce errors and the send result. Project cards are keyboard accessible (`tabindex="0"`, `role="button"`) and open the image preview on `Enter`. The animated loader is hidden from assistive technology and has visually hidden text in its place.

## License

This project is licensed under the [MIT License](LICENSE).

For questions or feedback, reach me on [LinkedIn](https://www.linkedin.com/in/eyuel-getachew-37061513b) or [GitHub](https://github.com/EyuReaper).
