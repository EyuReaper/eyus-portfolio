<template>
  <nav
    class="hud-module hud-from-right hud-anchor-y-center fixed z-[10010] right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 pointer-events-none"
    :class="sideHudClass"
    style="--hud-delay: 0.55s; isolation: isolate;"
  >
    
    <!-- Tactical Indicator Rail -->
    <div class="pointer-events-auto flex flex-col items-center gap-4 p-2.5 border border-sky-500/30 rounded-full bg-slate-950 shadow-2xl">
      
      <div 
        v-for="item in navItems" 
        :key="item.id"
        class="relative group flex items-center justify-center w-8 h-8"
      >
        <!-- Label that slides out to the left -->
        <span 
          :class="[
            'absolute right-full mr-4 px-2 py-1 rounded text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap pointer-events-none',
            activeSection === item.id && mountedAndReady
              ? 'opacity-100 translate-x-0 bg-emerald-500 text-slate-950 shadow-[0_0_10px_#10b981]' 
              : 'opacity-0 translate-x-4 text-sky-500 group-hover:opacity-100 group-hover:translate-x-0 bg-slate-900/80'
          ]"
        >
          {{ item.label }}
        </span>

        <!-- Indicator Diamond -->
        <a
          :href="`#${item.id}`"
          @click.prevent="scrollTo(item.id)"
          :class="[
            'w-2 h-2 rotate-45 border transition-all duration-500',
            activeSection === item.id && mountedAndReady
              ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_12px_#10b981] scale-125' 
              : 'border-sky-500/50 group-hover:border-white group-hover:scale-110'
          ]"
          :aria-label="`Navigate to ${item.label}`"
        ></a>
        
        <!-- Active Scan Circle (Decorative) -->
        <div 
          v-if="activeSection === item.id"
          class="absolute -inset-1 border border-emerald-500/20 rounded-full animate-ping"
        ></div>
      </div>

      <!-- Tactical Divider -->
      <div class="w-[1px] h-6 bg-gradient-to-b from-transparent via-sky-500/40 to-transparent"></div>

      <!-- System Toggle (Night Vision) -->
      <button
        @click="toggleDarkMode"
        aria-label="Toggle Night Vision"
        class="relative w-10 h-10 flex items-center justify-center transition-all duration-300 rounded-full group"
      >
        <div 
          class="absolute inset-0 rounded-full border border-sky-500/20 group-hover:border-emerald-500/40 transition-colors"
          :class="isDarkMode ? 'bg-emerald-500/10' : ''"
        ></div>
        
        <svg v-if="isDarkMode" class="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="2.5" fill="currentColor" fill-opacity="0.2" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
          <circle cx="7.5" cy="14" r="2.5" fill="currentColor" fill-opacity="0.2" />
          <circle cx="7.5" cy="14" r="1" fill="currentColor" />
          <circle cx="16.5" cy="14" r="2.5" fill="currentColor" fill-opacity="0.2" />
          <circle cx="16.5" cy="14" r="1" fill="currentColor" />
          <path d="M9.5 9.5l-1 2.5m6.5-2.5l1 2.5M10 14h4" opacity="0.5" />
        </svg>

        <svg v-else class="w-6 h-6 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
          <path d="M2 6V2h4M18 2h4v4M2 18v4h4M18 22h4v-4" opacity="0.6" />
        </svg>
      </button>
    </div>

    <!-- Vertical Progress Gauge -->
    <div class="hidden sm:flex flex-col items-center gap-2 opacity-60 mr-1">
      <div class="h-20 w-[2px] bg-slate-800 rounded-full relative overflow-hidden">
        <div 
          class="absolute bottom-0 left-0 w-full bg-sky-500/50 transition-all duration-100"
          :style="{ height: `${scrollProgress}%` }"
        ></div>
      </div>
      <span class="text-[8px] font-mono text-sky-500 tracking-tighter uppercase vertical-text">Signal</span>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useThemeStore } from '~/composables/useThemeStore';
import { useSystemsOnline } from '~/composables/useSystemsOnline';

const { hudModuleClass } = useSystemsOnline();
const sideHudClass = hudModuleClass();

const navItems = [
  { id: 'scan', label: 'SCAN' },
  { id: 'intel', label: 'INTEL' },
  { id: 'hangar', label: 'HANGAR' },
  { id: 'comms', label: 'COMMS' },
];

const activeSection = ref('scan');
const mountedAndReady = ref(false);
const scrollProgress = ref(0);
let observer;
let debounceTimer = null;

const { isDarkMode, toggleDarkMode } = useThemeStore();

const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const updateScrollProgress = () => {
  window.requestAnimationFrame(() => {
    const winScroll = window.pageYOffset || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) {
      scrollProgress.value = (winScroll / height) * 100;
    }
  });
};

onMounted(() => {
  mountedAndReady.value = true;
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  const options = {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
          activeSection.value = entry.target.id
        }, 50)
      }
    });
  }, options);

  navItems.forEach(item => {
    const element = document.getElementById(item.id);
    if (element) {
      observer.observe(element);
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
  if (observer) {
    observer.disconnect();
  }
  if (debounceTimer) clearTimeout(debounceTimer);
});
</script>

<style scoped>
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

/* Custom glow animation */
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px #10b981;
  }
  50% {
    box-shadow: 0 0 20px #10b981;
  }
}

:deep(svg) {
  transition: transform 0.3s ease-in-out;
}
</style>
