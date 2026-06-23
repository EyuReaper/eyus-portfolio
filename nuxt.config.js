import { fileURLToPath } from "url";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  // Modules to be loaded before rendering page
  modules: [// Integrates Tailwind CSS with Nuxt
  "@nuxtjs/tailwindcss", // Optimizes images
  "@nuxt/image", "@nuxt/eslint"],

  // Plugins to load before mounting the App
  plugins: ["~/plugins/fontawesome.client.js", "~/plugins/floating-vue.client.js"],

  // Global CSS/SCSS files
  css: [
    "~/assets/css/main.css", // Path to your main Tailwind CSS file
  ],

  // App configuration (head, meta, etc.)
  app: {
    head: {
      title: "Eyu's Portfolio - Aviator of Code",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Eyu's personal portfolio showcasing projects and skills with an airforce theme.",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap",
        },
        { rel: "icon", type: "image/svg+xml", href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='%2310b981' font-family='sans-serif'>翔</text></svg>" },
        { rel: "alternate icon", type: "image/png", href: "/favicon-96x96.png" },
      ],
    },
  },

  // Tailwind CSS configuration
  tailwindcss: {
    // Reference the correct tailwind.config.js
    configPath: "~/tailwind.config.js",
  },

  // Static site generation
  ssr: true,
  // Nitro compression
  nitro: {
    compressPublicAssets: true,
  },
});
