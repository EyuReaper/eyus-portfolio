<!-- pages/projects.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-airforce-blue-dark">
    <Navbar />
    <main class="container flex-grow px-4 py-16 mx-auto text-airforce-silver">
      <h2 class="mb-12 text-5xl font-bold text-center text-airforce-gold">My Missions (Projects)</h2>
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        <!-- Project Card 1 -->
        <div class="p-6 transition-transform duration-300 transform border shadow-xl bg-airforce-blue-medium rounded-xl border-airforce-gray hover:border-airforce-gold hover:scale-105">
          <img
            src="https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-landingpage-siraqemir.png"
            alt="Project Alpha Thumbnail"
            class="object-cover w-full mb-4 rounded-lg cursor-pointer h-38"
            @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-landingpage-siraqemir.png')"
          />
          <h3 class="mb-3 text-3xl font-semibold text-airforce-silver">Project Alpha: Sira-qemir</h3>
          <p class="mb-4 text-airforce-silver text-md">
            Sira Qemir (ሥራ ቀምር) is a modern task management web application built with React, Supabase, and Tailwind CSS and built for Ethiopians firs
          </p>
          <div class="flex flex-wrap gap-2 mb-4 text-sm">
            <span class="px-3 py-1 rounded-full bg-airforce-gray text-airforce-blue-dark">React</span>
            <span class="px-3 py-1 rounded-full bg-airforce-gray text-airforce-blue-dark">Tailwind CSS</span>
            <span class="px-3 py-1 rounded-full bg-airforce-gray text-airforce-blue-dark">PostgreSQL</span>
          </div>
          <div class="flex justify-between">
            <a href="#" class="px-4 py-2 text-sm font-bold rounded-full bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark">
              View Live <span class="ml-1">↗</span>
            </a>
            <a href="https://github.com/EyuReaper/sira-qemir" class="px-4 py-2 text-sm font-bold border rounded-full border-airforce-silver hover:border-airforce-gold text-airforce-silver hover:text-airforce-gold">
              GitHub <span class="ml-1">↗</span>
            </a>
          </div>
        </div>

        <!-- Project Card 2 -->
        <div class="p-6 transition-transform duration-300 transform border shadow-xl bg-airforce-blue-medium rounded-xl border-airforce-gray hover:border-airforce-gold hover:scale-105">
          <img
            src="https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-luxurywatch-በአማርኛ.png"
            alt="Project Bravo Thumbnail"
            class="object-cover w-full h-48 mb-4 rounded-lg cursor-pointer"
            @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-luxurywatch-በአማርኛ.png')"
          />
          <h3 class="mb-3 text-3xl font-semibold text-airforce-silver">Project Bravo:Luxury Watch Product Landing Page</h3>
          <p class="mb-4 text-airforce-silver text-md">
            A visually striking product landing page that showcases luxury timepieces with smooth parallax scrolling and interactive elements.
          </p>
          <div class="flex flex-wrap gap-2 mb-4 text-sm">
            <span class="px-3 py-1 rounded-full bg-airforce-gray text-airforce-blue-dark">Javascript</span>
            <span class="px-3 py-1 rounded-full bg-airforce-gray text-airforce-blue-dark">Html</span>
            <span class="px-3 py-1 rounded-full bg-airforce-gray text-airforce-blue-dark">CSS</span>
          </div>
          <div class="flex justify-between">
            <a href="#" class="px-4 py-2 text-sm font-bold rounded-full bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark">
              View Live <span class="ml-1">↗</span>
            </a>
            <a href="https://github.com/EyuReaper/luxury-watch-landing-page" class="px-4 py-2 text-sm font-bold border rounded-full border-airforce-silver hover:border-airforce-gold text-airforce-silver hover:text-airforce-gold">
              GitHub <span class="ml-1">↗</span>
            </a>
          </div>
        </div>

        <!-- Project Card 3 -->
        <div class="p-6 transition-transform duration-300 transform border shadow-xl bg-airforce-blue-medium rounded-xl border-airforce-gray hover:border-airforce-gold hover:scale-105">
          <img
            src="https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-amharic-phrasebook-webapp.png"
            alt="Project Charlie Thumbnail"
            class="object-cover w-full h-48 mb-4 rounded-lg cursor-pointer"
            @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-amharic-phrasebook-webapp.png')"
          />
          <h3 class="mb-3 text-3xl font-semibold text-airforce-silver">Project Charlie: Amharic Phrase book</h3>
          <p class="mb-4 text-airforce-silver text-md">
            A free, offline-friendly Amharic phrasebook web app for travelers and learners.
          </p>
          <div class="flex flex-wrap gap-2 mb-4 text-sm">
            <span class="px-3 py-1 rounded-full bg-airforce-gray text-airforce-blue-dark">React</span>
            <span class="px-3 py-1 rounded-full bg-airforce-gray text-airforce-blue-dark">Typescript</span>
            <span class="px-3 py-1 rounded-full bg-airforce-gray text-airforce-blue-dark">Tailwind CSS</span>
          </div>
          <div class="flex justify-between">
            <a href="https://amharic-phrase-book.vercel.app" class="px-4 py-2 text-sm font-bold rounded-full bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark">
              View Live <span class="ml-1">↗</span>
            </a>
            <a href="https://github.com/EyuReaper/amharic-phrase-book" class="px-4 py-2 text-sm font-bold border rounded-full border-airforce-silver hover:border-airforce-gold text-airforce-silver hover:text-airforce-gold">
              GitHub <span class="ml-1">↗</span>
            </a>
          </div>
        </div>
      </div>
    </main>
    <Footer />

    <!-- Image Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
      @click.self="closeImageModal"
    >
      <div class="relative max-w-4xl max-h-full overflow-auto rounded-lg shadow-xl">
        <button
          @click="closeImageModal"
          class="absolute z-50 p-2 text-4xl font-bold transition-colors duration-200 rounded-full top-4 right-4 text-airforce-silver bg-airforce-blue-medium hover:text-airforce-gold"
          aria-label="Close"
        >
          &times;
        </button>
        <img :src="modalImageUrl" alt="Zoomed Project Image" class="max-w-full max-h-[90vh] object-contain rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

// State for the modal
const isModalOpen = ref(false);
const modalImageUrl = ref('');

// Function to open the modal
const showImageModal = (imageUrl) => {
  modalImageUrl.value = imageUrl;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden'; // Prevent scrolling on body when modal is open
};

// Function to close the modal
const closeImageModal = () => {
  isModalOpen.value = false;
  modalImageUrl.value = '';
  document.body.style.overflow = ''; // Restore scrolling on body
};
</script>

<style scoped>
/* Scoped styles for the projects page (if any, Tailwind is preferred) */
/*
The `h-38` class for the image height is not a standard TailwindCSS class.
Tailwind provides height classes in a specific scale (e.g., h-40, h-48, h-56, h-64, etc.).
You might want to replace `h-38` with a standard Tailwind height like `h-40` or define a custom height in your `tailwind.config.js` if `h-38` is critical to your design.
For now, it's kept as is to reflect the user's input, but be aware it might not render as expected without custom config.
*/
</style>
