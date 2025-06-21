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
            <input
              type="text"
              id="name"
              v-model="form.name"
              required
              :aria-invalid="!!errors.name"
              :aria-describedby="errors.name ? 'name-error' : null"
              class="w-full p-3 border rounded-lg bg-airforce-blue-dark border-airforce-gray focus:outline-none focus:border-airforce-gold text-airforce-silver"
            />
            <p
              v-if="errors.name"
              :id="'name-error'"
              class="mt-1 text-sm text-airforce-red"
              role="alert"
            >{{ errors.name }}</p>
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-semibold text-airforce-silver">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'email-error' : null"
              class="w-full p-3 border rounded-lg bg-airforce-blue-dark border-airforce-gray focus:outline-none focus:border-airforce-gold text-airforce-silver"
            />
            <p
              v-if="errors.email"
              :id="'email-error'"
              class="mt-1 text-sm text-airforce-red"
              role="alert"
            >{{ errors.email }}</p>
          </div>
          <div>
            <label for="message" class="block mb-2 text-sm font-semibold text-airforce-silver">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="6"
              required
              :aria-invalid="!!errors.message"
              :aria-describedby="errors.message ? 'message-error' : null"
              class="w-full p-3 border rounded-lg bg-airforce-blue-dark border-airforce-gray focus:outline-none focus:border-airforce-gold text-airforce-silver"
            ></textarea>
            <p
              v-if="errors.message"
              :id="'message-error'"
              class="mt-1 text-sm text-airforce-red"
              role="alert"
            >{{ errors.message }}</p>
          </div>
          <!-- Honeypot field for spam prevention -->
          <input
            type="text"
            v-model="form.honeypot"
            autocomplete="off"
            tabindex="-1"
            style="display:none"
            aria-hidden="true"
          />
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex items-center justify-center w-full py-3 text-lg font-bold transition-all duration-300 transform rounded-full shadow-lg bg-airforce-gold hover:bg-airforce-red text-airforce-blue-dark hover:scale-105"
          >
            <span v-if="isSubmitting" class="flex items-center">
              <span class="mr-2" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100" overflow="visible" fill="#ffd700" stroke="none" aria-hidden="true">
                  <defs>
                    <rect id="loader" x="15" y="40" width="10" height="20" rx="2" ry="2"/>
                  </defs>
                  <use xlink:href="#loader" transform="rotate(0 50 50)">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite"/>
                  </use>
                  <use xlink:href="#loader" transform="rotate(45 50 50)">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.125s" repeatCount="indefinite"/>
                  </use>
                  <use xlink:href="#loader" transform="rotate(90 50 50)">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.25s" repeatCount="indefinite"/>
                  </use>
                  <use xlink:href="#loader" transform="rotate(135 50 50)">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.375s" repeatCount="indefinite"/>
                  </use>
                  <use xlink:href="#loader" transform="rotate(180 50 50)">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.5s" repeatCount="indefinite"/>
                  </use>
                  <use xlink:href="#loader" transform="rotate(225 50 50)">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.625s" repeatCount="indefinite"/>
                  </use>
                  <use xlink:href="#loader" transform="rotate(270 50 50)">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.75s" repeatCount="indefinite"/>
                  </use>
                  <use xlink:href="#loader" transform="rotate(315 50 50)">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.875s" repeatCount="indefinite"/>
                  </use>
                </svg>
              </span>
              <span class="sr-only">Sending...</span>
              Sending...
            </span>
            <span v-else>Send Message <span class="ml-2" aria-hidden="true">✈️</span></span>
          </button>
        </form>
        <!-- Feedback messages -->
        <div v-if="submitStatus" class="relative max-w-xl mx-auto mt-4">
          <div
            v-if="submitStatus === 'success'"
            class="flex items-center justify-between px-4 py-3 text-green-800 bg-green-100 border border-green-300 rounded shadow"
            role="status"
            aria-live="polite"
          >
            <span>Message sent successfully!</span>
            <button
              @click="submitStatus = null"
              type="button"
              aria-label="Dismiss message"
              class="ml-4 text-xl font-bold text-green-800 hover:text-green-600 focus:outline-none"
            >&times;</button>
          </div>
          <div
            v-else-if="submitStatus === 'error'"
            class="flex items-center justify-between px-4 py-3 bg-red-100 border border-red-300 rounded shadow text-airforce-red"
            role="alert"
            aria-live="assertive"
          >
            <span>Failed to send message. Please try again.</span>
            <button
              @click="submitStatus = null"
              type="button"
              aria-label="Dismiss message"
              class="ml-4 text-xl font-bold text-airforce-red hover:text-red-600 focus:outline-none"
            >&times;</button>
          </div>
        </div>
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
  message: '',
  honeypot: ''
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

  // Check honeypot field for spam prevention
  if (form.value.honeypot) {
    isSubmitting.value = false;
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
      form.value = { name: '', email: '', message: '', honeypot: '' };
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
