<template>
  <div class="min-h-screen bg-slate-950 text-sky-500 dark:bg-gray-950 dark:text-gray-100">
    <FallingStarsBg />

    <!-- SCAN (Home) Section -->
    <section id="scan" class="container z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 mx-auto text-center">
      <div class="max-w-4xl animate-fade-in">
        <img
          src="/assets/profile.jpg"
          alt="Eyu's Profile Picture"
          class="object-cover w-48 h-48 mx-auto mb-6 border-4 rounded-full shadow-lg border-emerald-500"
        />
        <h1 class="mb-4 text-6xl font-extrabold leading-tight text-white animate-fly-in">
          Eyu's Portfolio
        </h1>
        <p class="mb-8 text-3xl italic font-semibold text-emerald-500">
          — Aviator of Code, Navigating Digital Frontiers —
        </p>
        <p class="max-w-2xl mx-auto mb-10 text-xl leading-relaxed text-white">
          Welcome to my command center. I am a dedicated developer, constantly
          honing my skills to deliver precise, robust, and high-performance
          web solutions. My mission is to transform complex challenges into elegant
          digital experiences.
        </p>
         <div id="typewriter-container" class="p-4 mt-4 text-left bg-black bg-opacity-50 rounded-lg">
          <span class="font-mono text-emerald-500"></span>
        </div>
        <p class="mt-4 font-mono text-sm text-sky-500 flicker">System Diagnostic: All systems nominal.</p>
      </div>
    </section>

    <!-- INTEL (About) Section -->
    <section id="intel" ref="intelRef" :class="['container', 'flex-grow', 'px-4', 'py-16', 'mx-auto', 'text-white', 'min-h-screen', 'section-transition', { 'is-visible': intelVisible }]">
      <h2 class="mb-10 text-5xl font-bold text-center text-emerald-500">INTEL</h2>
      <div class="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
        <div class="md:order-2">
          <img
            src="/assets/image1.png"
            alt="Eyu's Desk Setup or a conceptual image"
            class="object-cover w-full h-auto border-4 rounded-lg shadow-xl border-sky-500"
          />
        </div>
        <!--Todo: finish styling the title-->
        <div class="space-y-6 font-mono text-lg leading-relaxed md:order-1">
          <h3 class="text-3xl text-emerald-500">The Pilot</h3>
          <h4 class="text-2xl text-emerald-500">Call sign: <a href="https://t.me/@Reaper_X"><span class="text-orange-500">EyuReaper</span></a></h4>
          <p>
            Hi my name is Eyuel or Eyu for short. As a developer, my journey is driven by a passion for creating efficient and impactful digital solutions. I thrive on challenges, embracing new technologies and methodologies to build applications that are not only functional but also intuitive and user-friendly. My approach is disciplined and meticulous, reflecting the precision required in modern software development.
          </p>
          <p>
            I specialize in React & Vue.js for robust frontend experiences and leverage Tailwind CSS for rapid, maintainable styling. My skills extend to Nuxt.js, Node.js for backend, databases like MongoDB/PostgreSQL, cloud platforms like AWS/GCP. I am always eager to collaborate on projects that demand creativity, problem-solving, and a commitment to excellence.
          </p>
          <p>
            Beyond coding, I enjoy reading about technology & history books, drawing & sketching ,solving puzzles , which further sharpens my analytical thinking, my eye for design and strategic planning — qualities I bring to every development project.
          </p>
        </div>
      </div>
    </section>

    <TechAltitude />

    <!-- HANGAR (Projects) Section -->
    <section id="hangar" ref="hangarRef" :class="['container', 'flex-grow', 'min-h-screen', 'px-4', 'py-16', 'mx-auto', 'text-white', 'section-transition', { 'is-visible': hangarVisible }]">
      <h2 class="mb-12 text-5xl font-bold text-center text-emerald-500">HANGAR</h2>
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div
          class="p-6 transition-transform duration-300 transform border shadow-xl bg-slate-900 rounded-xl border-sky-500 hover:border-emerald-500 hover:scale-105 mission-dossier group"
          tabindex="0"
          role="button"
          @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-landingpage-siraqemir.png')"
          @keydown.enter="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-landingpage-siraqemir.png')"
        >
          <div class="relative">
            <img
              src="https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-landingpage-siraqemir.png"
              alt="Project Alpha Thumbnail"
              class="object-cover w-full mb-4 rounded-lg cursor-pointer h-38"
              @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-landingpage-siraqemir.png')"
            />
            <div class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100">
              <h4 class="text-xl font-bold text-emerald-500">Technical Specs</h4>
              <div class="flex flex-wrap gap-2 mt-2 text-sm">
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">React</span>
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">Tailwind CSS</span>
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">PostgreSQL</span>
              </div>
            </div>
          </div>
          <h3 class="mb-3 text-3xl font-semibold text-white">Project Alpha: Sira-qemir</h3>
          <p class="mb-4 text-white text-md">
            Sira Qemir (ሥራ ቀምር) is a modern task management web application built with React, Supabase, and Tailwind CSS and built for Ethiopians firs
          </p>
        </div>

        <!-- Project Card 2 -->
        <div
          class="p-6 transition-transform duration-300 transform border shadow-xl bg-slate-900 rounded-xl border-sky-500 hover:border-emerald-500 hover:scale-105 mission-dossier group"
          tabindex="0"
          role="button"
          @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-luxurywatch-በአማርኛ.png')"
          @keydown.enter="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-luxurywatch-በአማርኛ.png')"
        >
          <div class="relative">
            <img
              src="https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-luxurywatch-በአማርኛ.png"
              alt="Project Bravo Thumbnail"
              class="object-cover w-full h-48 mb-4 rounded-lg cursor-pointer"
              @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-luxurywatch-በአማርኛ.png')"
            />
            <div class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100">
              <h4 class="text-xl font-bold text-emerald-500">Technical Specs</h4>
              <div class="flex flex-wrap gap-2 mt-2 text-sm">
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">Javascript</span>
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">Html</span>
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">CSS</span>
              </div>
            </div>
          </div>
          <h3 class="mb-3 text-3xl font-semibold text-white">Project Bravo: Luxury Watch Product Landing Page</h3>
          <p class="mb-4 text-white text-md">
            A visually striking product landing page that showcases luxury timepieces with smooth parallax scrolling and interactive elements.
          </p>
        </div>

        <!-- Project Card 3 -->
        <div
          class="p-6 transition-transform duration-300 transform border shadow-xl bg-slate-900 rounded-xl border-sky-500 hover:border-emerald-500 hover:scale-105 mission-dossier group"
          tabindex="0"
          role="button"
          @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-amharic-phrasebook-webapp.png')"
          @keydown.enter="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-amharic-phrasebook-webapp.png')"
        >
          <div class="relative">
            <img
              src="https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-amharic-phrasebook-webapp.png"
              alt="Project Charlie Thumbnail"
              class="object-cover w-full h-48 mb-4 rounded-lg cursor-pointer"
              @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screenshot-amharic-phrasebook-webapp.png')"
            />
            <div class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100">
              <h4 class="text-xl font-bold text-emerald-500">Technical Specs</h4>
              <div class="flex flex-wrap gap-2 mt-2 text-sm">
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">React</span>
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">Typescript</span>
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">Tailwind CSS</span>
              </div>
            </div>
          </div>
          <h3 class="mb-3 text-3xl font-semibold text-white">Project Charlie: Amharic Phrase book</h3>
          <p class="mb-4 text-white text-md">
            A free, offline-friendly Amharic phrasebook web app for travelers and learners.
          </p>

        </div>

        <!-- Project Card 4 -->  <!--todo add the  4th card-->
        <div
          class="p-6 transition-transform duration-300 transform border shadow-xl bg-slate-900 rounded-xl border-sky-500 hover:border-emerald-500 hover:scale-105 mission-dossier group"
          tabindex="0"
          role="button"
          @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-yckf-replica.png')"
          @keydown.enter="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-yckf-replica.png')"
        >
          <div class="relative">
            <img
              src="https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-yckf-replica.png"
              alt="Project Delta Thumbnail"
              class="object-cover w-full h-48 mb-4 rounded-lg cursor-pointer"
              @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-yckf-replica.png')"
            />
            <div class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100">
              <h4 class="text-xl font-bold text-emerald-500">Technical Specs</h4>
              <div class="flex flex-wrap gap-2 mt-2 text-sm">
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">Next.js</span>
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">Express+Typescript</span>
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">Sanity CMS</span>
              </div>
            </div>
          </div>
          <h3 class="mb-3 text-3xl font-semibold text-white">Project Delta:YCKF-replica</h3>
          <p class="mb-4 text-white text-md">
            A full-stack Intership project done for young cyber knight foundation.
          </p>
        </div>


                <!-- Project Card 5 -->  <!--todo add the  5th card-->
        <div
          class="p-6 transition-transform duration-300 transform border shadow-xl bg-slate-900 rounded-xl border-sky-500 hover:border-emerald-500 hover:scale-105 mission-dossier group"
          tabindex="0"
          role="button"
          @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-janoweb1.png')"
          @keydown.enter="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-janoweb1.png')"
        >
          <div class="relative">
            <img
              src="https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-janoweb1.png"
              alt="Project Echo Thumbnail"
              class="object-cover w-full h-48 mb-4 rounded-lg cursor-pointer"
              @click="showImageModal('https://cdn.jsdelivr.net/gh/EyuReaper/image-cdn/screencapture-janoweb1.png')"
            />
            <div class="absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-300 bg-black bg-opacity-75 rounded-lg opacity-0 group-hover:opacity-100">
              <h4 class="text-xl font-bold text-emerald-500">Technical Specs</h4>
              <div class="flex flex-wrap gap-2 mt-2 text-sm">
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">Javascript</span>
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">Node.js</span>
                <span class="px-3 py-1 rounded-full bg-sky-500 text-slate-950">Typescript</span>
              </div>
            </div>
          </div>
          <h3 class="mb-3 text-3xl font-semibold text-white">Project Echo:Jano-fidel</h3>
          <p class="mb-4 text-white text-md">
            A Native Amharic programming Language built on Node.js.
          </p>
        </div>

      </div>
    </section>

    <!-- COMMS (Contact) Section -->
    <section id="comms" ref="commsRef" :class="['container', 'flex-grow', 'px-4', 'py-16', 'mx-auto', 'text-white', 'min-h-screen', 'section-transition', { 'is-visible': commsVisible }]">
      <h2 class="mb-12 text-5xl font-bold text-center text-emerald-500">COMMS</h2>
      <div class="flex flex-col items-center justify-center max-w-5xl gap-12 mx-auto">
        <div class="max-w-xl p-8 border shadow-xl bg-slate-900 rounded-xl border-sky-500">
          <p class="mb-8 text-lg text-center">
            Ready to deploy a new mission? Reach out and let's discuss how I can help.
          </p>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block mb-2 text-sm font-semibold text-white">Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                :aria-invalid="!!errors.name"
                :aria-describedby="errors.name ? 'name-error' : null"
                class="w-full p-3 text-white border rounded-lg bg-slate-950 border-sky-500 focus:outline-none focus:border-emerald-500"
              />
              <p
                v-if="errors.name"
                :id="'name-error'"
                class="mt-1 text-sm text-red-500"
                role="alert"
              >{{ errors.name }}</p>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-semibold text-white">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'email-error' : null"
                class="w-full p-3 text-white border rounded-lg bg-slate-950 border-sky-500 focus:outline-none focus:border-emerald-500"
              />
              <p
                v-if="errors.email"
                :id="'email-error'"
                class="mt-1 text-sm text-red-500"
                role="alert"
              >{{ errors.email }}</p>
            </div>
            <div>
              <label for="message" class="block mb-2 text-sm font-semibold text-white">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                required
                :aria-invalid="!!errors.message"
                :aria-describedby="errors.message ? 'message-error' : null"
                class="w-full p-3 text-white border rounded-lg bg-slate-950 border-sky-500 focus:outline-none focus:border-emerald-500"
              ></textarea>
              <p
                v-if="errors.message"
                :id="'message-error'"
                class="mt-1 text-sm text-red-500"
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
                        class="flex items-center justify-center w-full py-3 text-lg font-bold transition-all duration-300 transform rounded-full shadow-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:scale-105 signal-transmitter"
                      >
                        <span v-if="isSubmitting" class="flex items-center">
                          <span class="mr-2" aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100" overflow="visible" fill="#000" stroke="none" aria-hidden="true">
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
                                <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.75s" repeatCount="indefeni
            te"/>
                              </use>
                              <use xlink:href="#loader" transform="rotate(315 50 50)">
                                <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.875s" repeatCount="indefinite"/>
                              </use>
                            </svg>
                          </span>
                          <span class="sr-only">Sending...</span>
                          Sending...
                        </span>
                        <span v-else>Transmit Signal <span class="ml-2" aria-hidden="true">📡</span></span>
                      </button>
                      <p class="mt-4 text-sm text-center text-emerald-500">Track my signal! The radar below shows my current social presence.</p>          </form>
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
              class="flex items-center justify-between px-4 py-3 text-red-500 bg-red-100 border border-red-300 rounded shadow"
              role="alert"
              aria-live="assertive"
            >
              <span>Failed to send message. Please try again.</span>
              <button
                @click="submitStatus = null"
                type="button"
                aria-label="Dismiss message"
                class="ml-4 text-xl font-bold text-red-500 hover:text-red-600 focus:outline-none"
              >&times;</button>
            </div>
          </div>
        </div>
        <SocialRadar :socialLinks="socialMediaLinks" />
      </div>
    </section>

    <!-- Image Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
      @click.self="closeImageModal"
    >
      <div class="relative max-w-4xl max-h-full overflow-auto rounded-lg shadow-xl">
        <button
          @click="closeImageModal"
          class="absolute z-50 p-2 text-4xl font-bold text-white transition-colors duration-200 rounded-full top-4 right-4 bg-slate-900 hover:text-emerald-500"
          aria-label="Close"
        >
          &times;
        </button>
        <img :src="modalImageUrl" alt="Zoomed Project Image" class="max-w-full max-h-[90vh] object-contain rounded-lg" />
      </div>
    </div>

    <BottomNav />
    <JetScroll />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import FallingStarsBg from '@/components/ui/FallingStarsBg.vue';
import BottomNav from '@/components/BottomNav.vue';
import JetScroll from '@/components/jetscroll.vue';
import TechAltitude from '@/components/TechAltitude.vue';
import SocialRadar from '@/components/SocialRadar.vue'; // New import

// --- Section Visibility ---
const intelRef = ref(null);
const hangarRef = ref(null);
const commsRef = ref(null);

const socialMediaLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/eyuel-getachew-37061513b' },
  { name: 'GitHub', url: 'https://github.com/EyuReaper' },
  { name: 'Telegram', url: 'https://t.me/@Reaper_X' },
  { name: 'X', url: 'https://x.com/@eyu_gx' }, // Placeholder URL for X (Twitter)
];

const intelVisible = ref(false);
const hangarVisible = ref(false);
const commsVisible = ref(false);

useIntersectionObserver(intelRef, ([{ isIntersecting }]) => {
  if (isIntersecting) intelVisible.value = true;
});
useIntersectionObserver(hangarRef, ([{ isIntersecting }]) => {
  if (isIntersecting) hangarVisible.value = true;
});
useIntersectionObserver(commsRef, ([{ isIntersecting }]) => {
  if (isIntersecting) commsVisible.value = true;
});


// --- Typewriter and Flicker ---
onMounted(() => {
  const container = document.getElementById('typewriter-container');
  if (container) {
    const span = container.querySelector('span');
    const text = "System analysis complete. All subsystems are operational. Ready for user engagement.";
    let index = 0;
    
    function type() {
      if (index < text.length) {
        span.textContent += text.charAt(index);
        index++;
        setTimeout(type, 50);
      }
    }
    type();
  }
});


// --- Projects Modal ---
const isModalOpen = ref(false);
const modalImageUrl = ref('');

const showImageModal = (imageUrl) => {
  modalImageUrl.value = imageUrl;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeImageModal = () => {
  isModalOpen.value = false;
  modalImageUrl.value = '';
  document.body.style.overflow = '';
};

// --- Contact Form ---
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
  return /^[^\s @]+ @[^\s @]+\.[^\s @]+$/.test(email);
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
.section-transition {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.flicker {
  animation: flicker 1.5s infinite alternate;
}

 @keyframes flicker {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.mission-dossier {
  position: relative;
  border: 2px solid #0ea5e9; /* sky-500 */
}

.mission-dossier:before,
.mission-dossier:after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: #10b981; /* emerald-500 */
  border-style: solid;
}

.mission-dossier:before {
  top: -5px;
  left: -5px;
  border-width: 2px 0 0 2px;
}

.mission-dossier:after {
  bottom: -5px;
  right: -5px;
  border-width: 0 2px 2px 0;
}

.signal-transmitter {
  box-shadow: 0 0 15px #10b981; /* emerald-500 */
}
</style>