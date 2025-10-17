<template>
  <nav class="p-4 rounded-b-lg shadow-lg bg-airforce-blue-medium">
    <div class="container flex items-center justify-between mx-auto">
      <NuxtLink to="/" class="px-3 py-1 text-2xl font-bold transition-colors duration-300 rounded-lg text-airforce-gold hover:text-airforce-silver">
        Eyu's Portfolio
      </NuxtLink>
      <!-- Desktop Navigation -->
      <div class="hidden space-x-6 md:flex">
        <NuxtLink to="/" class="font-semibold transition-colors duration-300 text-airforce-silver hover:text-airforce-gold">
          Home
        </NuxtLink>
        <NuxtLink to="/about" class="font-semibold transition-colors duration-300 text-airforce-silver hover:text-airforce-gold">
          About
        </NuxtLink>
        <NuxtLink to="/projects" class="font-semibold transition-colors duration-300 text-airforce-silver hover:text-airforce-gold">
          Projects
        </NuxtLink>
        <NuxtLink to="/contact" class="font-semibold transition-colors duration-300 text-airforce-silver hover:text-airforce-gold">
          Contact
        </NuxtLink>
      </div>
      <!-- Hamburger Button -->
      <button 
        class="rounded md:hidden text-airforce-silver hover:text-airforce-gold focus:outline-none focus:ring-2 focus:ring-airforce-gold"
        aria-label="Toggle navigation menu"
        @click="isMenuOpen = !isMenuOpen"
        :aria-expanded="isMenuOpen"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <!-- Mobile Navigation Menu -->
    <div v-if="isMenuOpen" class="mt-4 md:hidden">
      <div class="flex flex-col space-y-2">
        <NuxtLink 
          to="/" 
          class="px-3 py-2 font-semibold transition-colors duration-300 rounded-lg text-airforce-silver hover:text-airforce-gold hover:bg-airforce-blue-dark"
          @click="isMenuOpen = false"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/about" 
          class="px-3 py-2 font-semibold transition-colors duration-300 rounded-lg text-airforce-silver hover:text-airforce-gold hover:bg-airforce-blue-dark"
          @click="isMenuOpen = false"
        >
          About
        </NuxtLink>
        <NuxtLink 
          to="/projects" 
          class="px-3 py-2 font-semibold transition-colors duration-300 rounded-lg text-airforce-silver hover:text-airforce-gold hover:bg-airforce-blue-dark"
          @click="isMenuOpen = false"
        >
          Projects
        </NuxtLink>
        <NuxtLink 
          to="/contact" 
          class="px-3 py-2 font-semibold transition-colors duration-300 rounded-lg text-airforce-silver hover:text-airforce-gold hover:bg-airforce-blue-dark"
          @click="isMenuOpen = false"
        >
          Contact
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

// Reactive state to toggle mobile menu
const isMenuOpen = ref(false);
</script>

<style scoped>
/* Scoped styles for the Navbar component */
</style>