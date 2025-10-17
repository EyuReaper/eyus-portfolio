<template>
  <div class="flex flex-col min-h-screen bg-airforce-blue-dark">
    <Navbar class="z-10" />
    <FallingStarsBg />
    <main class="container z-10 flex flex-col items-center justify-center flex-grow px-4 py-16 mx-auto text-center">
      <!-- Hero Section -->
      <section class="max-w-4xl animate-fade-in">
        <img
          src="/assets/profile.jpg"
          alt="Eyu's Profile Picture"
          class="object-cover w-48 h-48 mx-auto mb-6 border-4 rounded-full shadow-lg border-airforce-gold"
        />
        <h1 class="mb-4 text-6xl font-extrabold leading-tight text-airforce-silver animate-fly-in">
          Eyu's Portfolio
        </h1>
        <p class="mb-8 text-3xl italic font-semibold text-airforce-gold">
          — Aviator of Code, Navigating Digital Frontiers —
        </p>
        <p class="max-w-2xl mx-auto mb-10 text-xl leading-relaxed text-airforce-silver">
          Welcome to my command center. I am a dedicated developer, constantly
          honing my skills to deliver precise, robust, and high-performance
          web solutions. My mission is to transform complex challenges into elegant
          digital experiences.
        </p>
        <div class="flex flex-wrap justify-center gap-6">
          <NuxtLink to="/projects" class="px-8 py-4 text-lg font-bold transition-all duration-300 transform rounded-full shadow-lg bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark hover:scale-105">
            <span class="mr-2">🚀</span> View My Missions
          </NuxtLink>
          <NuxtLink to="/contact" class="px-8 py-4 text-lg font-bold border-2 rounded-full border-airforce-silver hover:border-airforce-gold text-airforce-silver hover:text-airforce-gold">
            <span class="mr-2">📧</span> Establish Contact
          </NuxtLink>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import FallingStarsBg from '@/components/ui/FallingStarsBg.vue';
</script>

<style scoped>
/* Scoped styles for the index page if needed, but Tailwind is preferred. */
</style>