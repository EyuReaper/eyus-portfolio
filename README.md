# Eyus Portfolio

Eyus Portfolio is a responsive and accessible portfolio website built with Vue.js and Tailwind CSS. It showcases projects, contact information, and connections through various social platforms. The project demonstrates modern web development techniques including form validation, secure API integration, and accessible UI components.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contact Form](#contact-form)
- [Security & Accessibility](#security--accessibility)
- [License](#license)

## Features

- **Responsive Design:** Built using Tailwind CSS for mobile-first responsiveness.
- **Contact Form:** Integrated contact form with validation, secure API submission using Web3Forms, custom animated loader, and spam prevention (honeypot field).
- **Accessibility:** Semantic HTML, proper ARIA attributes, live region updates for user feedback, and keyboard-friendly navigation.
- **Modular Components:** Structured to easily extend with additional pages or components such as Navbar and Footer.

## Project Structure

Below is a brief explanation of the main project folders and files:

```
eyus-portfolio/
├── assets/              # Images, fonts, and other static files.
├── components/          # Reusable Vue components (e.g., Navbar.vue, Footer.vue).
├── pages/               # Page-level Vue components (e.g., home.vue, contact.vue).
│   └── contact.vue      # The contact page with a form to send messages.
├── public/              # Publicly accessible files like favicon or index.html.
├── styles/              # Custom CSS or Tailwind CSS configuration files.
├── README.md            # This file.
└── package.json         # Project dependencies and scripts.
```

- **assets/**: Contains all static assets used throughout the website.
- **components/**: Contains reusable UI components. For example, the `Navbar` and `Footer` components are imported in the `contact.vue` page.
- **pages/**: Houses page-specific Vue files; each file represents a separate page in the application.
- **public/**: Files in this folder are served directly and might include global HTML templates.
- **styles/**: Holds any custom styling files and Tailwind CSS configurations.

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

## Contact Form

The contact form is implemented in `pages/contact.vue`. It features:

- **Validation:** Client-side input validation for name, email, and message fields.
- **Submission:** Uses Web3Forms API to submit form data. Replace the access key in the code with your actual key.
- **Loader:** A custom animated loader SVG is displayed during form submission.
- **Feedback:** Success or error messages are displayed and are accessible. Users can dismiss the feedback manually.
- **Spam Prevention:** A hidden (honeypot) field is used to help prevent spam submissions.

## Security & Accessibility

- **Security:**
  - Sensitive data such as API keys are ideally managed via environment variables or backend functions.
  - The honeypot field helps filter spam submissions.
  - API submissions use HTTPS.
- **Accessibility:**
  - All form inputs include associated `<label>` elements.
  - ARIA attributes such as `aria-invalid`, `aria-describedby`, `aria-live`, and `role` are added for better screen reader support.
  - The animated loader is hidden from assistive technologies, with a visually hidden alternative text provided.

## License

This project is licensed under the [MIT License](LICENSE).

---

For any questions or feedback, you can connect through my [LinkedIn](https://www.linkedin.com/in/eyuel-getachew-37061513b) or [GitHub](https://github.com/EyuReaper).