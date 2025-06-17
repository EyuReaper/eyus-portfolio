<!-- components/Navbar.vue -->
<template>
  <nav class="bg-airforce-blue-medium p-4 shadow-lg rounded-b-lg">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-airforce-gold text-2xl font-bold rounded-lg px-3 py-1 hover:text-airforce-silver transition-colors duration-300">
        Eyu's Portfolio
      </NuxtLink>
      <div class="space-x-6">
        <NuxtLink to="/" class="text-airforce-silver hover:text-airforce-gold font-semibold transition-colors duration-300">
          Home
        </NuxtLink>
        <NuxtLink to="/about" class="text-airforce-silver hover:text-airforce-gold font-semibold transition-colors duration-300">
          About
        </NuxtLink>
        <NuxtLink to="/projects" class="text-airforce-silver hover:text-airforce-gold font-semibold transition-colors duration-300">
          Projects
        </NuxtLink>
        <NuxtLink to="/contact" class="text-airforce-silver hover:text-airforce-gold font-semibold transition-colors duration-300">
          Contact
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
// No specific script logic needed for a simple static navbar
</script>

<style scoped>
/* Scoped styles for the Navbar component */
</style>