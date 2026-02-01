# Eyus Portfolio Tactical SPA

Eyus Portfolio is now a Single Page Application (SPA) reimagined with an Air Force Tactical HUD theme, built using Vue 3 (Composition API) and Tailwind CSS. It showcases projects, contact information, and professional connections through a unified, immersive experience. The project demonstrates modern web development techniques including form validation, secure API integration, accessible UI components, and smooth animated transitions.

## Table of Contents

- [Eyus Portfolio](#eyus-portfolio)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contact Form](#contact-form)
  - [Security \& Accessibility](#security--accessibility)
  - [License](#license)

## Features

- **Single Page Application (SPA):** Delivers a fluid, app-like experience with smooth transitions between sections.
- **Tactical HUD Theme:** Immersive Air Force HUD styling with dark mode, scanline effects, and a fixed grid pattern.
- **Responsive Design:** Built using Tailwind CSS for mobile-first responsiveness, with a cockpit-like aesthetic.
- **Bottom-Docked Navigation:** Innovative floating, pill-shaped navigation with Intersection Observer to highlight the active section.
- **Contact Form:** Integrated contact form with validation, secure API submission using Web3Forms, custom animated loader, and spam prevention (honeypot field).
- **Smooth Transitions:** Uses Vue's `<Transition>` component and Intersection Observer for elegant UI state changes.
- **Accessibility:** Semantic HTML, proper ARIA attributes, live region updates for user feedback, and keyboard-friendly navigation, including project cards.
- **Modular Components:** Structured for maintainability and extensibility.

## Project Structure

Below is a brief explanation of the main project folders and files:

```
eyus-portfolio/
├── assets/              # Images, fonts, and other static files (e.g., CSS for global styles).
├── components/          # Reusable Vue components (e.g., BottomNav.vue for navigation).
│   └── ui/              # UI-specific components (e.g., FallingStarsBg.vue).
├── pages/               # Contains the single page-level Vue component (index.vue).
│   └── index.vue        # The main SPA with all sections (SCAN, INTEL, HANGAR, COMMS).
├── public/              # Publicly accessible files like favicon.
├── README.md            # This file.
├── tailwind.config.js   # Tailwind CSS configuration, including custom colors and animations.
└── package.json         # Project dependencies and scripts.
```

- **assets/**: Contains all static assets used throughout the website.
- **components/**: Contains reusable UI components, including the new `BottomNav.vue` and `FallingStarsBg.vue`.
- **pages/**: Houses the single `index.vue` file, which now serves as the entire application.
- **public/**: Files in this folder are served directly.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/EyuReaper/eyus-portfolio.git
   cd eyus-portfolio
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:3000` (or the port specified) to view the project.

## Usage

- **Development:** Use your favorite IDE (e.g., Visual Studio Code) to edit Vue components. Changes will be hot-reloaded in the browser.
- **Building:** Run `npm run build` to compile the project for production.

## Security & Accessibility

- **Security:**
  - Sensitive data such as API keys are ideally managed via environment variables or backend functions.
  - The honeypot field helps filter spam submissions.
  - API submissions use HTTPS.
- **Accessibility:**
  - All form inputs include associated `<label>` elements.
  - ARIA attributes such as `aria-invalid`, `aria-describedby`, `aria-live`, and `role` are added for better screen reader support.
  - Project cards are now keyboard-navigable (`tabindex="0"`, `role="button"`) and trigger the image modal on `Enter` key press.
  - The animated loader is hidden from assistive technologies, with a visually hidden alternative text provided.

## License

This project is licensed under the [MIT License](LICENSE).

---

For any questions or feedback, you can connect through my [LinkedIn](https://www.linkedin.com/in/eyuel-getachew-37061513b) or [GitHub](https://github.com/EyuReaper).