<template>
  <div>
    <NuxtPage />
    <CoPilotMusicPlayer />
  </div>
</template>

<script setup>
import { useHead } from '#app'; // Import useHead from #app for Nuxt 3

useHead({
  script: [
    {
      innerHTML: `
        (function() {
          const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const savedTheme = localStorage.getItem('darkMode');
          if (savedTheme === 'true' || (savedTheme === null && preferDark)) {
            document.documentElement.classList.add('dark');
          } else if (savedTheme === 'false') {
            document.documentElement.classList.remove('dark');
          }
        })();
      `,
      type: 'text/javascript',
      body: true, // Place script in body for slightly later execution to ensure documentElement is available, but still early.
    }
  ]
});
</script>

<style>
</style>