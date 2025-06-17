<!-- pages/projects.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-airforce-blue-dark">
    <Navbar />
    <main class="flex-grow container mx-auto px-4 py-16 text-airforce-silver">
      <h2 class="text-5xl font-bold text-center text-airforce-gold mb-12">My Missions (Projects)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <!-- Project Card 1 -->
        <div class="bg-airforce-blue-medium p-6 rounded-xl shadow-xl border border-airforce-gray hover:border-airforce-gold transform hover:scale-105 transition-transform duration-300">
          <img src="https://placehold.co/400x250/01051A/B3B6B9?text=Project+Alpha" alt="Project Alpha Thumbnail" class="rounded-lg mb-4 w-full h-48 object-cover" />
          <h3 class="text-3xl font-semibold text-airforce-silver mb-3">Project Alpha: Flight Tracker</h3>
          <p class="text-airforce-silver text-md mb-4">
            A real-time flight tracking application built to monitor air traffic
            with high precision. Utilized Vue.js for interactive maps and a
            serverless backend for data processing.
          </p>
          <div class="flex flex-wrap gap-2 text-sm mb-4">
            <span class="bg-airforce-gray text-airforce-blue-dark px-3 py-1 rounded-full">Vue.js</span>
            <span class="bg-airforce-gray text-airforce-blue-dark px-3 py-1 rounded-full">Tailwind CSS</span>
            <span class="bg-airforce-gray text-airforce-blue-dark px-3 py-1 rounded-full">Node.js</span>
          </div>
          <div class="flex justify-between">
            <a href="#" class="bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark font-bold py-2 px-4 rounded-full text-sm">
              View Live <span class="ml-1">↗</span>
            </a>
            <a href="#" class="border border-airforce-silver hover:border-airforce-gold text-airforce-silver hover:text-airforce-gold font-bold py-2 px-4 rounded-full text-sm">
              GitHub <span class="ml-1">↗</span>
            </a>
          </div>
        </div>

        <!-- Project Card 2 -->
        <div class="bg-airforce-blue-medium p-6 rounded-xl shadow-xl border border-airforce-gray hover:border-airforce-gold transform hover:scale-105 transition-transform duration-300">
          <img src="https://placehold.co/400x250/01051A/B3B6B9?text=Project+Bravo" alt="Project Bravo Thumbnail" class="rounded-lg mb-4 w-full h-48 object-cover" />
          <h3 class="text-3xl font-semibold text-airforce-silver mb-3">Project Bravo: Mission Control Dashboard</h3>
          <p class="text-airforce-silver text-md mb-4">
            An intuitive dashboard for managing complex operational workflows,
            featuring data visualization and secure user authentication.
          </p>
          <div class="flex flex-wrap gap-2 text-sm mb-4">
            <span class="bg-airforce-gray text-airforce-blue-dark px-3 py-1 rounded-full">Nuxt.js</span>
            <span class="bg-airforce-gray text-airforce-blue-dark px-3 py-1 rounded-full">SCSS</span>
            <span class="bg-airforce-gray text-airforce-blue-dark px-3 py-1 rounded-full">Firebase</span>
          </div>
          <div class="flex justify-between">
            <a href="#" class="bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark font-bold py-2 px-4 rounded-full text-sm">
              View Live <span class="ml-1">↗</span>
            </a>
            <a href="#" class="border border-airforce-silver hover:border-airforce-gold text-airforce-silver hover:text-airforce-gold font-bold py-2 px-4 rounded-full text-sm">
              GitHub <span class="ml-1">↗</span>
            </a>
          </div>
        </div>

        <!-- Project Card 3 -->
        <div class="bg-airforce-blue-medium p-6 rounded-xl shadow-xl border border-airforce-gray hover:border-airforce-gold transform hover:scale-105 transition-transform duration-300">
          <img src="https://placehold.co/400x250/01051A/B3B6B9?text=Project+Charlie" alt="Project Charlie Thumbnail" class="rounded-lg mb-4 w-full h-48 object-cover" />
          <h3 class="text-3xl font-semibold text-airforce-silver mb-3">Project Charlie: Tactical Planner</h3>
          <p class="text-airforce-silver text-md mb-4">
            A web-based tool for strategizing and planning complex tasks,
            offering collaborative features and robust data persistence.
          </p>
          <div class="flex flex-wrap gap-2 text-sm mb-4">
            <span class="bg-airforce-gray text-airforce-blue-dark px-3 py-1 rounded-full">Vuex</span>
            <span class="bg-airforce-gray text-airforce-blue-dark px-3 py-1 rounded-full">REST API</span>
            <span class="bg-airforce-gray text-airforce-blue-dark px-3 py-1 rounded-full">PostgreSQL</span>
          </div>
          <div class="flex justify-between">
            <a href="#" class="bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark font-bold py-2 px-4 rounded-full text-sm">
              View Live <span class="ml-1">↗</span>
            </a>
            <a href="#" class="border border-airforce-silver hover:border-airforce-gold text-airforce-silver hover:text-airforce-gold font-bold py-2 px-4 rounded-full text-sm">
              GitHub <span class="ml-1">↗</span>
            </a>
          </div>
        </div>

      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
// No specific script logic for the projects page.
</script>

<style scoped>
/* Scoped styles for the projects page */
</style>