export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  // Modules to be loaded before rendering page
  modules: [// Integrates Tailwind CSS with Nuxt
  "@nuxtjs/tailwindcss", "@nuxt/eslint"],

  // Plugins to load before mounting the App
  plugins: ["~/plugins/fontawesome.js", "~/plugins/floating-vue.client.js"],

  // Global CSS/SCSS files
  css: [
    "@fontsource-variable/jetbrains-mono/wght.css", // Self-hosted font
    "~/assets/css/main.css", // Path to your main Tailwind CSS file
    "~/assets/css/light.css", // Light mode overrides (html.light)
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

  hooks: {
    // Nuxt adds <link rel="prefetch"> for imported assets; audio is large and
    // only needed after the visitor interacts, so leave it out of the manifest.
    "build:manifest": (manifest) => {
      for (const entry of Object.values(manifest)) {
        entry.assets = entry.assets?.filter((file) => !/\.(mp3|wav)$/.test(file));
      }
    },
  },

  // Static site generation
  ssr: true,

  // Public runtime settings; each can be overridden with an env var at runtime.
  runtimeConfig: {
    public: {
      // 'open' | 'on-mission' — override with NUXT_PUBLIC_AVAILABILITY
      availability: "open",
    },
  },
  // Nitro compression
  nitro: {
    compressPublicAssets: true,
  },
});
