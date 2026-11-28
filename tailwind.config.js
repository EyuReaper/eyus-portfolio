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
        sans: ['"JetBrains Mono Variable"', 'monospace'],
        mono: ['"JetBrains Mono Variable"', 'monospace'],
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
        scanline: {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '0 100%' },
        },
        grid: {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '50px 50px' },
        },
        soar: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
      animation: {
        'fly-in': 'flyIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scanline': 'scanline 10s linear infinite',
        'grid': 'grid 2s linear infinite',
        'soar': 'soar 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    // Compositor-only glow: the 20px shadow is painted once on a ::after layer
    // and only its opacity animates, instead of repainting box-shadow per frame.
    function ({ addBase, addComponents }) {
      addBase({
        '@keyframes glow-pulse': {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '1' },
        },
        // Zero specificity so .fixed / .absolute / .sticky still win.
        ':where(.animate-glow)': { position: 'relative' },
      })
      addComponents({
        '.animate-glow::after': {
          content: '""',
          position: 'absolute',
          inset: '0',
          'border-radius': 'inherit',
          'box-shadow': '0 0 20px #10b981',
          'pointer-events': 'none',
          opacity: '0.25',
          'will-change': 'opacity',
          animation: 'glow-pulse 1.5s ease-in-out infinite',
        },
        '@media (prefers-reduced-motion: reduce)': {
          '.animate-glow::after': { animation: 'none', opacity: '0.6' },
        },
      })
    },
  ],
}