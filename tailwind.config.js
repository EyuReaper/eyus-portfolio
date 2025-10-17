// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
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
        // Define a custom font family, using 'Inter' as default for a clean look
        // You can add other thematic fonts here, e.g., 'Oswald' or 'Rajdhani' from Google Fonts
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Define your custom airforce themed colors
        'airforce-blue-dark': '#01051A',      // Deep, almost black blue
        'airforce-blue-medium': '#0F1A3A',    // Classic navy blue
        'airforce-gray': '#6B7280',           // Cool, metallic gray
        'airforce-silver': '#B3B6B9',         // Lighter silver for accents
        'airforce-gold': '#FFD700',           // Subtle gold for highlights (e.g., insignia)
        'airforce-red': '#B22222',            // A military red, for warnings or accents
      },
      backgroundImage: {
        // Example for a subtle background image, replace with an actual path/URL
        // 'sky-pattern': "url('/img/sky-pattern.png')",
      },
      keyframes: {
        // Define custom keyframes for animations
        flyIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        },
      },
      animation: {
        // Apply keyframes to custom animation utilities
        'fly-in': 'flyIn 1s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-in forwards',
      },
    },
  },
  plugins: [],
}