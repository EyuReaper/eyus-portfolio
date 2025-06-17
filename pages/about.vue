<!-- pages/about.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-airforce-blue-dark">
    <Navbar />
    <main class="flex-grow container mx-auto px-4 py-16 text-airforce-silver">
      <h2 class="text-5xl font-bold text-center text-airforce-gold mb-10">About Eyu</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="md:order-2">
          <img
            src="https://placehold.co/400x300/0F1A3A/B3B6B9?text=About+Eyu"
            alt="Eyu's Desk Setup or a conceptual image"
            class="rounded-lg shadow-xl border-4 border-airforce-blue-medium object-cover w-full h-auto"
          />
        </div>
        <div class="md:order-1 space-y-6 text-lg leading-relaxed">
          <p>
            As a developer, my journey is driven by a passion for creating efficient and impactful digital solutions. I thrive on challenges, embracing new technologies and methodologies to build applications that are not only functional but also intuitive and user-friendly. My approach is disciplined and meticulous, reflecting the precision required in modern software development.
          </p>
          <p>
            I specialize in Vue.js for robust frontend experiences and leverage Tailwind CSS for rapid, maintainable styling. My skills extend to [mention a few other key skills, e.g., Node.js for backend, databases like MongoDB/PostgreSQL, cloud platforms like AWS/GCP]. I am always eager to collaborate on projects that demand creativity, problem-solving, and a commitment to excellence.
          </p>
          <p>
            Beyond coding, I enjoy [mention a hobby, e.g., reading about aviation history, strategic board games, hiking], which further sharpens my analytical thinking and strategic planning — qualities I bring to every development project.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
// No specific script logic for the about page.
</script>

<style scoped>
/* Scoped styles for the about page */
</style>