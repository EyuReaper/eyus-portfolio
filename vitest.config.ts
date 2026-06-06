import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [
    {
      name: 'inject-nuxt-autoimports',
      enforce: 'pre',
      transform(code, id) {
        if (id.endsWith('.vue')) {
          const replacements = [
            [/(?<![.\w])useAsyncData\s*\(/g, 'globalThis.__useAsyncData('],
            [/(?<!\.)\bcomputed\s*\(/g, 'globalThis.__computed('],
            [/(?<!\.)\bonUnmounted\s*\(/g, 'globalThis.__onUnmounted('],
            [/(?<![.\w])\$fetch\s*\(/g, 'globalThis.__$fetch('],
          ];
          let result = code;
          for (const [pattern, replacement] of replacements) {
            result = result.replace(pattern, replacement);
          }
          return { code: result, map: null };
        }
      },
    },
    vue(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
      '~': fileURLToPath(new URL('.', import.meta.url)),
    }
  }
})
