<template>
  <button 
    v-show="mountedAndReady"
    @click="handleScramble"
    :class="[
      'fixed bottom-8 right-8 z-50 p-4 transition-all duration-500 rounded-full border-2 border-system hover:border-safe',
      showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
      !showButton && 'pointer-events-none'
    ]"
    aria-label="Scramble to top"
    style="transform: translateZ(0); will-change: transform;"
  >
    <div :class="['relative transition-all duration-700 ease-in-expo', isBlasting ? '-translate-y-[100vh] scale-150' : 'hover:-translate-y-2', !isBlasting && showButton ? 'animate-glow' : '']">
      
      <div v-if="isBlasting" class="absolute top-full left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-t from-emerald-500 via-sky-500 to-transparent blur-sm animate-pulse"></div>
      
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-system drop-shadow-[0_0_10px_rgba(14,165,233,0.8)] rotate-jet">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
      </svg>
    </div>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);
const isBlasting = ref(false);
const mountedAndReady = ref(false);

// Simple throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const handleScroll = () => {
  // Show button after scrolling down 400px
  showButton.value = window.scrollY > 400;
};

const handleScramble = () => {
  isBlasting.value = true;
  
  // Smooth scroll the window
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Reset the jet position after it clears the screen
  setTimeout(() => {
    isBlasting.value = false;
  }, 1000);
};

// Throttled scroll handler
let throttledHandleScroll;

onMounted(() => {
  throttledHandleScroll = throttle(handleScroll, 100); // Throttle to 100ms
  window.addEventListener('scroll', throttledHandleScroll);
  mountedAndReady.value = true;
});
onUnmounted(() => {
  window.removeEventListener('scroll', throttledHandleScroll);
});
</script>

<style scoped>
.ease-in-expo {
  transition-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
}
.rotate-jet {
  transform: rotate(-45deg);
}
</style>
