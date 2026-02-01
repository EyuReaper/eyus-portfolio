<template>
  <nav class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
    <div class="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-sky-500 rounded-full shadow-lg">
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
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const navItems = [
  { id: 'scan', label: 'SCAN' },
  { id: 'intel', label: 'INTEL' },
  { id: 'hangar', label: 'HANGAR' },
  { id: 'comms', label: 'COMMS' },
];

const activeSection = ref('scan');
let observer;

const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
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
</style>