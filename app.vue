<template>
  <div :class="{ 'nvg-active': isDarkMode }">
    <NuxtPage />
    <CoPilotMusicPlayer />
    <div v-if="isDarkMode" class="nvg-overlay"></div>
  </div>
</template>

<script setup>
import { useThemeStore } from './composables/useThemeStore';

const { isDarkMode } = useThemeStore();
</script>

<style>
.nvg-overlay {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  /* Very subtle scanlines */
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(16, 185, 129, 0.05) 50%
  );
  background-size: 100% 4px;
  opacity: 0.3;
}

/* Add a slight green vignette to the corners */
.nvg-active::after {
  content: "";
  pointer-events: none;
  position: fixed;
  inset: 0;
  box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.9), 
              inset 0 0 50px rgba(16, 185, 129, 0.2);
  z-index: 9998;
}
</style>