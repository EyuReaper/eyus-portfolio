<template>
  <div v-show="showWelcomeMessage" class="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center transition-opacity duration-500" :class="{'opacity-0 pointer-events-none': !showWelcomeMessage}">
    <div class="text-center p-8 rounded-xl shadow-lg border-2 border-system animate-glow">
      <p class="text-white text-2xl font-bold mb-4">System Ready - Engage Comms?</p>
      <button @click="engageComms" class="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg transition-colors duration-200">
        Engage
      </button>
    </div>
  </div>

  <div
    v-if="!showWelcomeMessage"
    @mouseenter="isCollapsed = false"
    @mouseleave="isCollapsed = true"
    @click="isCollapsed = false"
    :class="[
      'group fixed z-[45] transition-all duration-300',
      'border-2 border-system animate-glow bg-slate-900/70',
      // Mobile positioning (Stacked above BottomNav)
      'bottom-28 left-5 rounded-xl',
      // Desktop positioning
      'sm:bottom-8 sm:left-8',
      // Collapsed/Expanded states
      isCollapsed
        ? 'w-14 h-14 rounded-full p-0 flex items-center justify-center'
        : 'w-64 sm:w-72 xl:w-80 p-4 sm:p-5',
    ]"
    style="transform: translateZ(0); will-change: transform;"
  >
    <div :class="['flex items-center sm:space-x-4 justify-between sm:justify-start', isCollapsed ? 'justify-center w-full' : '']">
      <!-- Icon/Visual for Music Player -->
      <svg xmlns="http://www.w3.org/2000/svg" :class="['w-8 h-8 md:w-10 md:h-10 text-emerald-500 shrink-0', isPlaying ? 'animate-pulse' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13M9 18a3 3 0 1 0 0 6 3 3 0 1 0 0-6Zm12 0a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z"/>
      </svg>

      <!-- Music Controls -->
      <div :class="['flex flex-col ml-4 sm:ml-0 flex-1', isCollapsed ? 'hidden' : 'flex transition-all duration-300']">
        <div class="flex items-center mb-2 space-x-2">
          <button v-tooltip="isPlaying ? 'Pause' : 'Play'" @click="togglePlay" class="p-2 rounded-full bg-system hover:bg-safe text-slate-950">
            <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </button>
          <button v-tooltip="'Power Off'" @click="powerOff" class="p-2 rounded-full bg-system hover:bg-safe text-slate-950">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
          </button>
          <div class="w-full">
            <ClientOnly>
              <VueMarquee :duration="10" :key="currentTrackName">
                <span class="font-mono text-sm text-safe">{{ currentTrackName }}</span>
              </VueMarquee>
              <template #fallback>
                <span class="font-mono text-sm text-safe">{{ currentTrackName }}</span>
              </template>
            </ClientOnly>
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
import DualWielder from '~/assets/dual-wielder-project-aces.mp3';
import MidnightLight from '~/assets/midnight-light-jose-pavli.mp3';
import Redline from '~/assets/redline-jose-pavli.mp3';

const audio = ref(null);
const isPlaying = ref(false);
const volume = ref(0.2); // Default volume
const currentTrackIndex = ref(0);
const showWelcomeMessage = ref(true); // New state for welcome message
const isCollapsed = ref(true); // For mobile collapse
let collapseTimer = null;

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
      showNowPlaying();
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

const powerOff = () => {
  if (audio.value) {
    audio.value.pause();
  }
  isPlaying.value = false;
  showWelcomeMessage.value = true;
  if (collapseTimer) clearTimeout(collapseTimer);
};

const showNowPlaying = () => {
  isCollapsed.value = false;
  if (collapseTimer) clearTimeout(collapseTimer);
  collapseTimer = setTimeout(() => {
    isCollapsed.value = true;
  }, 2800);
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
  showNowPlaying();
};

onUnmounted(() => {
  if (collapseTimer) clearTimeout(collapseTimer);
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
