<!-- pages/contact.vue -->
<!-- Contact page with a simple form. -->
<template>
  <div class="flex flex-col min-h-screen bg-airforce-blue-dark">
    <Navbar />
    <main class="container flex-grow px-4 py-16 mx-auto text-airforce-silver">
      <h2 class="mb-12 text-5xl font-bold text-center text-airforce-gold">Establish Contact</h2>
      <div class="max-w-xl p-8 mx-auto border shadow-xl bg-airforce-blue-medium rounded-xl border-airforce-gray">
        <p class="mb-8 text-lg text-center">
          Ready to deploy a new mission? Reach out and let's discuss how I can help.
        </p>
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="name" class="block mb-2 text-sm font-semibold text-airforce-silver">Name</label>
            <input type="text" id="name" v-model="form.name" required
                   class="w-full p-3 border rounded-lg bg-airforce-blue-dark border-airforce-gray focus:outline-none focus:border-airforce-gold text-airforce-silver" />
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-semibold text-airforce-silver">Email</label>
            <input type="email" id="email" v-model="form.email" required
                   class="w-full p-3 border rounded-lg bg-airforce-blue-dark border-airforce-gray focus:outline-none focus:border-airforce-gold text-airforce-silver" />
          </div>
          <div>
            <label for="message" class="block mb-2 text-sm font-semibold text-airforce-silver">Message</label>
            <textarea id="message" v-model="form.message" rows="6" required
                      class="w-full p-3 border rounded-lg bg-airforce-blue-dark border-airforce-gray focus:outline-none focus:border-airforce-gold text-airforce-silver"></textarea>
          </div>
          <button type="submit"
                  class="w-full py-3 text-lg font-bold transition-all duration-300 transform rounded-full shadow-lg bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark hover:scale-105">
            Send Message <span class="ml-2">✈️</span>
          </button>
        </form>
        <p v-if="submitStatus === 'success'" class="mt-4 text-center text-green-500">Message sent successfully!</p>
        <p v-if="submitStatus === 'error'" class="mt-4 text-center text-airforce-red">Failed to send message. Please try again.</p>
        <p class="mt-8 text-sm text-center text-airforce-gray">
          You can also connect with me on:
          <a href="https://www.linkedin.com/in/eyuel-getachew-37061513b" class="mx-2 text-airforce-gold hover:underline">LinkedIn</a> |
          <a href="https://github.com/EyuReaper" class="mx-2 text-airforce-gold hover:underline">GitHub</a>
        </p>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const submitStatus = ref(null); // 'null', 'success', 'error'

const submitForm = async () => {
  submitStatus.value = null; // Reset status

  // In a real application, you would send this data to a backend service.
  // For a static site deployed on Vercel, you could use:
  // 1. Netlify Forms: Just add `data-netlify="true"` to your form tag.
  // 2. Web3Forms / Formspree: Use their endpoint as your form action.
  // 3. Vercel Serverless Function: Create an API route in Nuxt to handle the submission.

  // --- Placeholder for actual form submission logic ---
  console.log('Form Submitted:', form.value);
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Example for a serverless function on Vercel:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form.value)
    // });
    // if (response.ok) {
    //   submitStatus.value = 'success';
    //   form.value = { name: '', email: '', message: '' }; // Clear form
    // } else {
    //   submitStatus.value = 'error';
    // }
    submitStatus.value = 'success';
    form.value = { name: '', email: '', message: '' };
  } catch (error) {
    console.error('Form submission error:', error);
    submitStatus.value = 'error';
  }
};
</script>

<style scoped>
/* Scoped styles for the contact page */
</style>
