<template>
  <div v-if="showWelcomeMessage" class="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center">
    <div class="text-center p-8 rounded-xl shadow-lg border-2 border-system animate-glow">
      <p class="text-white text-2xl font-bold mb-4">System Ready - Engage Comms?</p>
      <button @click="engageComms" class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg transition-colors duration-200">
        Engage
      </button>
    </div>
  </div>

  <div
    v-else
    @mouseenter="isCollapsed = false"
    @mouseleave="isCollapsed = true"
    :class="[
      'group fixed bottom-0 left-0 w-full z-50 p-4 sm:bottom-8 sm:left-8 sm:w-auto sm:p-5 sm:rounded-xl shadow-lg border-2 bg-slate-900/70 backdrop-blur-sm transition-all duration-300',
      'border-system animate-glow', // Default border and glow
      'max-sm:bottom-4 max-sm:left-4', // Position for mobile
      isCollapsed ? 'max-sm:w-16 max-sm:h-16 max-sm:p-4 max-sm:rounded-full' : 'max-sm:w-72 max-sm:p-4 max-sm:rounded-xl', // Size for mobile collapsed/expanded
    ]"
  >
    <div :class="['flex items-center sm:space-x-4 justify-between sm:justify-start', isCollapsed ? 'max-sm:justify-center' : '']">
      <!-- Icon/Visual for Music Player -->
      <svg xmlns="http://www.w3.org/2000/svg" :class="['w-8 h-8 md:w-10 md:h-10 text-emerald-500 shrink-0', isPlaying ? 'animate-pulse' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13M9 18a3 3 0 1 0 0 6 3 3 0 1 0 0-6Zm12 0a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z"/>
      </svg>

      <!-- Music Controls -->
      <div :class="['flex flex-col ml-4 sm:ml-0', isCollapsed ? 'max-sm:opacity-0 max-sm:h-0 max-sm:overflow-hidden max-sm:group-hover:opacity-100 max-sm:group-hover:h-auto max-sm:group-hover:ml-4 transition-all duration-300' : '']">
        <div class="flex items-center mb-2 space-x-2">
          <button v-tooltip="isPlaying ? 'Pause' : 'Play'" @click="togglePlay" class="p-2 rounded-full bg-system hover:bg-safe text-slate-950">
            <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </button>
          <button v-tooltip="'Next Track'" @click="playNext" class="p-2 rounded-full bg-system hover:bg-safe text-slate-950">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 19 22 12 13 5 13 19"></polygon><line x1="2" y1="19" x2="2" y2="5"></line></svg>
          </button>
          <div class="w-full">
          <VueMarquee :duration="10" :key="currentTrackName">
          <span class="font-mono text-sm text-safe">{{ currentTrackName }}</span>
        </VueMarquee>
      </div>
        </div>

        <!-- Volume Slider -->
        <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="setVolume" class="w-32 h-2 rounded-lg appearance-none cursor-pointer bg-system">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { VueMarquee } from 'vue-marquee';
import DualWielder from '~/assets/Dual Wielder - PROJECT ACES.mp3';
import MidnightLight from '~/assets/ Midnight Light - Jose Pavli.mp3';
import Redline from '~/assets/Redline - Jose Pavli.mp3';

const audio = ref(null);
const isPlaying = ref(false);
const volume = ref(0.2); // Default volume
const currentTrackIndex = ref(0);
const showWelcomeMessage = ref(true); // New state for welcome message
const isCollapsed = ref(true); // For mobile collapse

// Music tracks
const tracks = [
  { name: "Dual Wielder - PROJECT ACES", src: DualWielder },
  { name: "Midnight Light - Jose Pavli", src: MidnightLight },
  { name: "Redline - Jose Pavli", src: Redline },
];

const currentTrackName = computed(() => tracks[currentTrackIndex.value].name);

const loadTrack = (index) => {
  if (audio.value) {
    audio.value.src = tracks[index].src;
    audio.value.load();
    if (isPlaying.value) {
      audio.value.play();
    }
  }
};

const togglePlay = () => {
  if (audio.value.paused) {
    audio.value.play();
    isPlaying.value = true;
  } else {
    audio.value.pause();
    isPlaying.value = false;
  }
};

const playNext = () => {
  currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.length;
  loadTrack(currentTrackIndex.value);
};

const setVolume = () => {
  if (audio.value) {
    audio.value.volume = volume.value;
  }
};

onMounted(() => {
  audio.value = new Audio();
  audio.value.volume = volume.value;
  loadTrack(currentTrackIndex.value);
  audio.value.addEventListener('ended', playNext); // Auto play next track
  isPlaying.value = false; // Ensure it's false initially
});

const engageComms = () => {
  showWelcomeMessage.value = false;
  audio.value.play();
  isPlaying.value = true;
};

onUnmounted(() => {
  if (audio.value) {
    audio.value.removeEventListener('ended', playNext);
    audio.value.pause();
    audio.value = null;
  }
});
</script>

<style scoped>
/* Custom styling for the range input thumb for better theming */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #10b981; /* emerald-500 */
  cursor: pointer;
  box-shadow: 0 0 5px rgba(16, 185, 129, 0.7);
  transition: background .15s ease-in-out;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #10b981; /* emerald-500 */
  cursor: pointer;
  box-shadow: 0 0 5px rgba(16, 185, 129, 0.7);
  transition: background .15s ease-in-out;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px; /* Increased height for better touch target */
  cursor: pointer;
  background: #0ea5e9; /* sky-500 */
  border-radius: 4px;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 8px; /* Increased height for better touch target */
  cursor: pointer;
  background: #0ea5e9; /* sky-500 */
  border-radius: 4px;
}
</style>