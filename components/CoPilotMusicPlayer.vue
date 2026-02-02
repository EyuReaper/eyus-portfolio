<template>
  <div
    :class="[
      'fixed bottom-8 left-8 z-50 p-4 rounded-xl shadow-lg border-2 bg-slate-900/70 backdrop-blur-sm transition-all duration-500',
      'border-system animate-glow', // Default border and glow
    ]"
  >
    <div class="flex items-center space-x-4">
      <!-- Icon/Visual for Music Player -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13M9 18a3 3 0 1 0 0 6 3 3 0 1 0 0-6Zm12 0a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z"/>
      </svg>

      <!-- Music Controls -->
      <div class="flex flex-col">
        <div class="flex items-center space-x-2 mb-2">
          <button @click="togglePlay" class="p-2 rounded-full bg-system hover:bg-safe text-slate-950">
            <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </button>
          <button @click="playNext" class="p-2 rounded-full bg-system hover:bg-safe text-slate-950">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 19 22 12 13 5 13 19"></polygon><line x1="2" y1="19" x2="2" y2="5"></line></svg>
          </button>
          <span class="text-sm font-mono text-safe">{{ currentTrackName }}</span>
        </div>

        <!-- Volume Slider -->
        <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="setVolume" class="w-24 h-1 bg-system rounded-lg appearance-none cursor-pointer">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const audio = ref(null);
const isPlaying = ref(false);
const volume = ref(0.7); // Default volume
const currentTrackIndex = ref(0);

// Placeholder music tracks
const tracks = [
  { name: "Tactical Beat 1", src: "/music/track1.mp3" }, // PLACEHOLDER: Replace with your actual track
  { name: "Mission Briefing", src: "/music/track2.mp3" }, // PLACEHOLDER: Replace with your actual track
  { name: "Sky Patrol", src: "/music/track3.mp3" },     // PLACEHOLDER: Replace with your actual track
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
});

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
  height: 4px;
  cursor: pointer;
  background: #0ea5e9; /* sky-500 */
  border-radius: 2px;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: #0ea5e9; /* sky-500 */
  border-radius: 2px;
}
</style>