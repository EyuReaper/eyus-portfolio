// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  // Specify files to scan for Tailwind classes to ensure PurgeCSS works correctly
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./lib/*",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"JetBrains Mono"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'background': '#020617',
        'safe': '#10b981',      // emerald-500
        'system': '#0ea5e9',     // sky-500
        'darkBackground': '#1a202c', // A dark gray for true dark mode
        'darkText': '#e2e8f0',     // Light gray for text
      },
      keyframes: {
        flyIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { 'box-shadow': '0 0 5px #10b981' },
          '50%': { 'box-shadow': '0 0 20px #10b981' },
        },
        scanline: {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '0 100%' },
        },
        grid: {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '50px 50px' },
        }
      },
      animation: {
        'fly-in': 'flyIn 1s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-in forwards',
        'glow': 'glow 1.5s ease-in-out infinite',
        'scanline': 'scanline 10s linear infinite',
        'grid': 'grid 2s linear infinite',
      },
    },
  },
  plugins: [],
}