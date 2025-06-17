<template>
  <div>
    <!-- The NuxtLayout component will render your default layout (layouts/default.vue) -->
    <!-- if you have one, or you can explicitly name a layout here. -->
    <NuxtLayout>
      <!-- NuxtPage renders the content of the currently active page (from the pages directory) -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// This is a setup script using Vue 3's Composition API for app-wide logic.
// You might include global state management or utility functions here.
</script>

<style>
/* You can add global styles here, but Tailwind should handle most of it. */
</style>