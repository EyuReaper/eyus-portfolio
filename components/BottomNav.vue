<template>
  <nav class="fixed z-50 -translate-x-1/2 bottom-5 left-1/2" style="transform: translateX(-50%) translateZ(0); will-change: transform;">
    <div class="flex items-center justify-center gap-2 px-4 py-2 border rounded-full shadow-lg bg-slate-900/50 border-sky-500">
      <a 
        v-for="item in navItems"
        :key="item.id"
        :href="`#${item.id}`" 
        @click.prevent="scrollTo(item.id)"
        :class="[
          'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
          activeSection === item.id 
            ? 'bg-emerald-500 text-slate-950 shadow-md animate-glow' 
            : 'text-sky-500 hover:text-white'
        ]"
      >
        {{ item.label }}
      </a>

      <button 
        @click="toggleDarkMode" 
        aria-label="Toggle Night Vision"
        class="flex items-center justify-center w-10 h-10 p-2 transition-all duration-300 rounded-full" 
        :class="isDarkMode 
          ? 'text-slate-950 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]' 
          : 'text-sky-500 hover:bg-slate-800 hover:text-white'"
      >
        <svg v-if="isDarkMode" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="2.5" fill="currentColor" fill-opacity="0.2" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
          
          <circle cx="7.5" cy="14" r="2.5" fill="currentColor" fill-opacity="0.2" />
          <circle cx="7.5" cy="14" r="1" fill="currentColor" />
          
          <circle cx="16.5" cy="14" r="2.5" fill="currentColor" fill-opacity="0.2" />
          <circle cx="16.5" cy="14" r="1" fill="currentColor" />
          
          <path d="M9.5 9.5l-1 2.5m6.5-2.5l1 2.5M10 14h4" opacity="0.5" />
        </svg>

        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
          
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
          
          <path d="M2 6V2h4M18 2h4v4M2 18v4h4M18 22h4v-4" opacity="0.6" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useThemeStore } from '~/composables/useThemeStore';

const navItems = [
  { id: 'scan', label: 'SCAN' },
  { id: 'intel', label: 'INTEL' },
  { id: 'hangar', label: 'HANGAR' },
  { id: 'comms', label: 'COMMS' },
];

const activeSection = ref('scan');
let observer;

const { isDarkMode, toggleDarkMode } = useThemeStore();

const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  // 2. Intersection Observer for Navigation (Theme initialization is now in useThemeStore)
  const options = {
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
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
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.animate-glow {
  animation: glow 1.5s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px #10b981;
  }
  50% {
    box-shadow: 0 0 20px #10b981;
  }
}

/* Ensure smooth transition for theme switching */
:deep(svg) {
  transition: transform 0.3s ease-in-out;
}
</style>