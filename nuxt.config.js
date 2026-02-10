import { fileURLToPath } from 'url';

export default defineNuxtConfig({
  compatibilityDate: '2026-02-05',
  // Modules to be loaded before rendering page
  modules: [
    '@nuxtjs/tailwindcss' // Integrates Tailwind CSS with Nuxt
  ],

  // Plugins to load before mounting the App
  plugins: [
    '~/plugins/fontawesome.client.js',
  ],

  // Global CSS/SCSS files
  css: [
    '~/assets/css/main.css' // Path to your main Tailwind CSS file
  ],

  // Path aliases for consistent imports
  alias: {
    '@': fileURLToPath(new URL('.', import.meta.url)),
    '@/components': fileURLToPath(new URL('./components', import.meta.url)),
    '@/lib': fileURLToPath(new URL('./lib', import.meta.url)),
  },

  // Build configuration
  build: {
    // Ensure PostCSS plugins for Tailwind
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  // App configuration (head, meta, etc.)
  app: {
    head: {
      title: 'Eyu\'s Portfolio - Aviator of Code',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Eyu\'s personal portfolio showcasing projects and skills with an airforce theme.' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap' },
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png' },
      ]
    }
  },

  // Tailwind CSS configuration
  tailwindcss: {
    // Reference the correct tailwind.config.js
    configPath: '~/tailwind.config.js',
  },

  // Runtime configuration
  runtimeConfig: {
    githubPat: process.env.NUXT_GITHUB_PAT, // Now a server-only variable
    public: {
      // Any public runtime config variables can go here
    }
  },

  // Static site generation
  ssr: false,
})