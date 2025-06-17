<!-- pages/contact.vue -->
<!-- Contact page with a simple form. -->
<template>
  <div class="flex flex-col min-h-screen bg-airforce-blue-dark">
    <Navbar />
    <main class="flex-grow container mx-auto px-4 py-16 text-airforce-silver">
      <h2 class="text-5xl font-bold text-center text-airforce-gold mb-12">Establish Contact</h2>
      <div class="max-w-xl mx-auto bg-airforce-blue-medium p-8 rounded-xl shadow-xl border border-airforce-gray">
        <p class="text-lg text-center mb-8">
          Ready to deploy a new mission? Reach out and let's discuss how I can help.
        </p>
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="name" class="block text-airforce-silver text-sm font-semibold mb-2">Name</label>
            <input type="text" id="name" v-model="form.name" required
                   class="w-full p-3 rounded-lg bg-airforce-blue-dark border border-airforce-gray focus:outline-none focus:border-airforce-gold text-airforce-silver" />
          </div>
          <div>
            <label for="email" class="block text-airforce-silver text-sm font-semibold mb-2">Email</label>
            <input type="email" id="email" v-model="form.email" required
                   class="w-full p-3 rounded-lg bg-airforce-blue-dark border border-airforce-gray focus:outline-none focus:border-airforce-gold text-airforce-silver" />
          </div>
          <div>
            <label for="message" class="block text-airforce-silver text-sm font-semibold mb-2">Message</label>
            <textarea id="message" v-model="form.message" rows="6" required
                      class="w-full p-3 rounded-lg bg-airforce-blue-dark border border-airforce-gray focus:outline-none focus:border-airforce-gold text-airforce-silver"></textarea>
          </div>
          <button type="submit"
                  class="w-full bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark font-bold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 text-lg">
            Send Message <span class="ml-2">✈️</span>
          </button>
        </form>
        <p v-if="submitStatus === 'success'" class="mt-4 text-center text-green-500">Message sent successfully!</p>
        <p v-if="submitStatus === 'error'" class="mt-4 text-center text-airforce-red">Failed to send message. Please try again.</p>
        <p class="mt-8 text-center text-airforce-gray text-sm">
          You can also connect with me on:
          <a href="#" class="text-airforce-gold hover:underline mx-2">LinkedIn</a> |
          <a href="#" class="text-airforce-gold hover:underline mx-2">GitHub</a>
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
