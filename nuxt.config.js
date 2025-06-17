// nuxt.config.js
export default defineNuxtConfig({
  // Modules to be loaded before rendering page
  modules: [
    '@nuxtjs/tailwindcss' // Integrates Tailwind CSS with Nuxt
  ],

  // Global CSS/SCSS files
  css: [
    '~/assets/css/main.css' // Path to your main Tailwind CSS file
  ],

  // Build configuration
  build: {
    // You can add build-specific configurations here
  },

  // App configuration (head, meta, etc.)
  app: {
    head: {
      title: 'Eyu\'s Portfolio - Aviator of Code', // Custom title for your portfolio
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Eyu\'s personal portfolio showcasing projects and skills with an airforce theme.' }
      ],
      link: [
        // You can link external fonts here, e.g., Google Fonts for Inter
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' }
      ]
    }
  },

  // Tailwind CSS configuration (optional, can be done via tailwind.config.js)
  tailwindcss: {
    // Configuration options for @nuxtjs/tailwindcss module
    // See: https://tailwindcss.nuxtjs.org/options
  },

  // Target: 'static' is crucial for Vercel deployment as a static site
  ssr: true, // Set to true for SSR (default for Nuxt 3), but generation target will be static
  target: 'static', // This is deprecated in Nuxt 3. Use `npx nuxt generate` command to build a static site.
})