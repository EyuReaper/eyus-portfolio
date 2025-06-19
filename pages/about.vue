<!-- pages/about.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-airforce-blue-dark">
    <Navbar />
    <main class="container flex-grow px-4 py-16 mx-auto text-airforce-silver">
      <h2 class="mb-10 text-5xl font-bold text-center text-airforce-gold">About Eyu</h2>
      <div class="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
        <div class="md:order-2">
          <img
            src="/assets/image1.png"
            alt="Eyu's Desk Setup or a conceptual image"
            class="object-cover w-full h-auto border-4 rounded-lg shadow-xl border-airforce-blue-medium"
          />
        </div>
        <div class="space-y-6 text-lg leading-relaxed md:order-1">
          <p>
            Hi my name is Eyuel or Eyu for short. As  a developer, my journey is driven by a passion for creating efficient and impactful digital solutions. I thrive on challenges, embracing new technologies and methodologies to build applications that are not only functional but also intuitive and user-friendly. My approach is disciplined and meticulous, reflecting the precision required in modern software development.
          </p>
          <p>
            I specialize in React & Vue.js for robust frontend experiences and leverage Tailwind CSS for rapid, maintainable styling. My skills extend to Nuxt.js, Node.js for backend, databases like MongoDB/PostgreSQL, cloud platforms like AWS/GCP. I am always eager to collaborate on projects that demand creativity, problem-solving, and a commitment to excellence.
          </p>
          <p>
            Beyond coding, I enjoy  reading about  technology & history books, drawing & sketching ,solving puzzles , which further sharpens my analytical thinking, an eye for design and strategic planning  — qualities I bring to every development project.
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