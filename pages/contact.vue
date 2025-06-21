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
            <p v-if="errors.name" class="mt-1 text-sm text-airforce-red">{{ errors.name }}</p>
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-semibold text-airforce-silver">Email</label>
            <input type="email" id="email" v-model="form.email" required
                   class="w-full p-3 border rounded-lg bg-airforce-blue-dark border-airforce-gray focus:outline-none focus:border-airforce-gold text-airforce-silver" />
            <p v-if="errors.email" class="mt-1 text-sm text-airforce-red">{{ errors.email }}</p>
          </div>
          <div>
            <label for="message" class="block mb-2 text-sm font-semibold text-airforce-silver">Message</label>
            <textarea id="message" v-model="form.message" rows="6" required
                      class="w-full p-3 border rounded-lg bg-airforce-blue-dark border-airforce-gray focus:outline-none focus:border-airforce-gold text-airforce-silver"></textarea>
            <p v-if="errors.message" class="mt-1 text-sm text-airforce-red">{{ errors.message }}</p>
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex items-center justify-center w-full py-3 text-lg font-bold transition-all duration-300 transform rounded-full shadow-lg bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark hover:scale-105"
          >
            <span v-if="isSubmitting" class="flex items-center">
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" overflow="visible" fill="#ffd700" stroke="none"><defs><rect id="loader" x="15" y="40" width="10" height="20" rx="2" ry="2"/></defs><use xlink:href="#loader" transform="rotate(0 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite"></animate></use><use xlink:href="#loader" transform="rotate(45 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.125s" repeatCount="indefinite"></animate></use><use xlink:href="#loader" transform="rotate(90 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate></use><use xlink:href="#loader" transform="rotate(135 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.375s" repeatCount="indefinite"></animate></use><use xlink:href="#loader" transform="rotate(180 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate></use><use xlink:href="#loader" transform="rotate(225 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.625s" repeatCount="indefinite"></animate></use><use xlink:href="#loader" transform="rotate(270 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></use><use xlink:href="#loader" transform="rotate(315 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.875s" repeatCount="indefinite"></animate></use></svg>              Sending...
            </span>
            <span v-else>Send Message <span class="ml-2">✈️</span></span>
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

const errors = ref({
  name: '',
  email: '',
  message: ''
});

const submitStatus = ref(null); // 'null', 'success', 'error'
const isSubmitting = ref(false);
let feedbackTimeout = null;

function validateEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  let valid = true;
  errors.value = { name: '', email: '', message: '' };

  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required.';
    valid = false;
  }
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required.';
    valid = false;
  } else if (!validateEmail(form.value.email)) {
    errors.value.email = 'Please enter a valid email address.';
    valid = false;
  }
  if (!form.value.message.trim()) {
    errors.value.message = 'Message is required.';
    valid = false;
  }
  return valid;
}

const submitForm = async () => {
  submitStatus.value = null;

  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'f82722bc-7f34-4d62-b7a9-9264f74e54c8',
        name: form.value.name,
        email: form.value.email,
        message: form.value.message
      })
    });

    const result = await response.json();
    if (result.success) {
      submitStatus.value = 'success';
      form.value = { name: '', email: '', message: '' };
    } else {
      submitStatus.value = 'error';
    }
  } catch (error) {
    submitStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
    if (feedbackTimeout) clearTimeout(feedbackTimeout);
    feedbackTimeout = setTimeout(() => {
      submitStatus.value = null;
    }, 4000);
  }
};
</script>

<style scoped>
/* Scoped styles for the contact page */
</style>
