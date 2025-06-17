<!-- pages/index.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-airforce-blue-dark">
    <Navbar />
    <main class="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <!-- Hero Section -->
      <section class="max-w-4xl animate-fade-in">
        <img
          src="https://placehold.co/200x200/6B7280/B3B6B9?text=Eyu"
          alt="Eyu's Profile Picture"
          class="rounded-full border-4 border-airforce-gold shadow-lg mx-auto mb-6 w-48 h-48 object-cover"
        />
        <h1 class="text-6xl font-extrabold text-airforce-silver leading-tight mb-4 animate-fly-in">
          Eyu's Portfolio
        </h1>
        <p class="text-3xl font-semibold text-airforce-gold mb-8 italic">
          — Aviator of Code, Navigating Digital Frontiers —
        </p>
        <p class="text-xl text-airforce-silver leading-relaxed mb-10 max-w-2xl mx-auto">
          Welcome to my command center. I am a dedicated developer, constantly
          honing my skills to deliver precise, robust, and high-performance
          web solutions. My mission is to transform complex challenges into elegant
          digital experiences.
        </p>
        <div class="flex flex-wrap justify-center gap-6">
          <NuxtLink to="/projects" class="bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 text-lg">
            <span class="mr-2">🚀</span> View My Missions
          </NuxtLink>
          <NuxtLink to="/contact" class="border-2 border-airforce-silver hover:border-airforce-gold text-airforce-silver hover:text-airforce-gold font-bold py-4 px-8 rounded-full text-lg">
            <span class="mr-2">📧</span> Establish Contact
          </NuxtLink>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup>
// No specific script logic needed for the index page.
// The content is primarily static and styled with Tailwind.
</script>

<style scoped>
/* Scoped styles for the index page if needed, but Tailwind is preferred. */
</style>