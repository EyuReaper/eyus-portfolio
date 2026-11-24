<template>
  <nav
    class="hud-module hud-from-right hud-anchor-y-center fixed z-[10010] hidden sm:block right-6 top-1/2 -translate-y-1/2 pointer-events-none"
    :class="sideHudClass"
    style="--hud-delay: 0.35s; isolation: isolate;"
    aria-label="Section navigation"
  >
    <div class="sn-rail pointer-events-auto">
      <!-- Stops on a track that fills with scroll progress -->
      <div class="sn-stops" :style="{ '--active': activeIndex }">
        <span class="sn-track" aria-hidden="true">
          <span class="sn-track-fill" :style="{ transform: `scaleY(${scrollProgress / 100})` }"></span>
        </span>
        <!-- Single marker that glides to the active stop -->
        <span class="sn-marker" :class="{ 'sn-marker--ready': mountedAndReady }" aria-hidden="true"></span>

        <a
          v-for="(item, i) in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="sn-stop group"
          :class="{ 'sn-stop--active': activeSection === item.id && mountedAndReady }"
          :aria-current="activeSection === item.id ? 'true' : undefined"
          @click.prevent="scrollTo(item.id)"
        >
          <span class="sn-dot" aria-hidden="true"></span>
          <span class="sn-tag military-cut-button">
            <span class="sn-tag-num">{{ String(i + 1).padStart(2, '0') }}</span>{{ item.label }}
          </span>
        </a>
      </div>

      <span class="sn-divider" aria-hidden="true"></span>

      <!-- Light toggle: sun to go light; goggles (from light) to jump into night vision -->
      <button
        type="button"
        class="sn-nvg group"
        :aria-pressed="isLightMode"
        :aria-label="isLightMode ? 'Switch to night vision' : 'Switch to light mode'"
        @click="isLightMode ? toggleDarkMode() : toggleLightMode()"
      >
        <svg v-if="isLightMode" viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10.5h16v5.2a2.3 2.3 0 0 1-2.3 2.3h-2.4a2 2 0 0 1-1.8-1.1l-.6-1.2a1 1 0 0 0-1.8 0l-.6 1.2A2 2 0 0 1 8.7 18H6.3A2.3 2.3 0 0 1 4 15.7z"/><circle cx="8.3" cy="14" r="1.6"/><circle cx="15.7" cy="14" r="1.6"/><path d="M7 10.5 8.5 6h7l1.5 4.5M12 6V4"/></svg>
        <svg v-else viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>
        <span class="sn-tag military-cut-button">{{ isLightMode ? 'NIGHT VISION' : 'LIGHT MODE' }}</span>
      </button>

      <!-- Night vision toggle (in light mode the toggle above already shows goggles) -->
      <button
        v-if="!isLightMode"
        type="button"
        class="sn-nvg group"
        :class="{ 'sn-nvg--on': isDarkMode }"
        :aria-pressed="isDarkMode"
        aria-label="Toggle night vision"
        @click="toggleDarkMode"
      >
        <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 10.5h16v5.2a2.3 2.3 0 0 1-2.3 2.3h-2.4a2 2 0 0 1-1.8-1.1l-.6-1.2a1 1 0 0 0-1.8 0l-.6 1.2A2 2 0 0 1 8.7 18H6.3A2.3 2.3 0 0 1 4 15.7z"/>
          <circle cx="8.3" cy="14" r="1.6" class="sn-lens"/>
          <circle cx="15.7" cy="14" r="1.6" class="sn-lens"/>
          <path d="M7 10.5 8.5 6h7l1.5 4.5M12 6V4"/>
        </svg>
        <span class="sn-tag military-cut-button">NVG {{ isDarkMode ? 'ON' : 'OFF' }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
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
const activeIndex = computed(() => Math.max(0, navItems.findIndex((n) => n.id === activeSection.value)));
const mountedAndReady = ref(false);
const scrollProgress = ref(0);
let observer;
let debounceTimer = null;

const { isDarkMode, toggleDarkMode, isLightMode, toggleLightMode } = useThemeStore();

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
.sn-rail {
  --stop: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 48px;
  padding: 10px 0;
  border-radius: 16px;
  background: rgba(6, 10, 15, 0.9);
  border: 1px solid rgba(52, 211, 153, 0.2);
  box-shadow:
    0 18px 40px -18px rgba(0, 0, 0, 0.9),
    inset 0 1px 0 rgba(167, 243, 208, 0.06);
}

/* ── Stops + track ────────────────────────────────────── */
.sn-stops {
  position: relative;
  display: flex;
  flex-direction: column;
}
.sn-track {
  position: absolute;
  left: 50%;
  top: calc(var(--stop) / 2);
  bottom: calc(var(--stop) / 2);
  width: 1px;
  translate: -50% 0;
  background: rgba(148, 163, 184, 0.18);
  overflow: hidden;
}
.sn-track-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, #34d399, #0ea5e9);
  transform-origin: top;
  transition: transform 0.15s linear;
}
.sn-marker {
  position: absolute;
  left: 50%;
  top: calc(var(--stop) / 2 - 7px);
  width: 14px;
  height: 14px;
  margin-left: -7px;
  border: 1.5px solid #34d399;
  background: rgba(6, 10, 15, 0.9);
  box-shadow: 0 0 10px rgba(52, 211, 153, 0.55);
  /* translate in the rail's axis, then rotate into a diamond */
  transform: translateY(calc(var(--active) * var(--stop))) rotate(45deg);
  opacity: 0;
  pointer-events: none;
}
.sn-marker--ready {
  opacity: 1;
  transition: transform 0.5s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.3s ease;
}

.sn-stop {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--stop);
  height: var(--stop);
  border-radius: 10px;
}
.sn-dot {
  width: 6px;
  height: 6px;
  rotate: 45deg;
  background: rgba(148, 163, 184, 0.45);
  transition: background-color 0.2s ease, scale 0.2s ease;
}
.sn-stop:hover .sn-dot {
  background: #a7f3d0;
  scale: 1.3;
}
.sn-stop--active .sn-dot {
  background: #34d399;
}
.sn-stop:focus-visible,
.sn-nvg:focus-visible {
  outline: 2px solid rgba(52, 211, 153, 0.7);
  outline-offset: 2px;
}

/* ── Label tags (slide out to the left) ───────────────── */
.sn-tag {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px 5px 10px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  white-space: nowrap;
  color: #a7f3d0;
  background: rgba(6, 10, 15, 0.95);
  translate: 8px -50%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, translate 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.sn-tag-num {
  color: rgba(52, 211, 153, 0.55);
  letter-spacing: 0.08em;
}
.sn-stop:hover .sn-tag,
.sn-stop:focus-visible .sn-tag,
.sn-nvg:hover .sn-tag,
.sn-nvg:focus-visible .sn-tag {
  opacity: 1;
  translate: 0 -50%;
}
/* The gliding marker shows the active section; its tag only appears on
   hover/focus so it never sits on top of page content. */
.sn-stop--active .sn-tag {
  color: #022c22;
  background: #34d399;
}
.sn-stop--active .sn-tag-num {
  color: rgba(2, 44, 34, 0.6);
}

.sn-divider {
  width: 20px;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(52, 211, 153, 0.35), transparent);
}

/* ── NVG toggle ───────────────────────────────────────── */
.sn-nvg {
  position: relative;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  color: rgba(148, 163, 184, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}
.sn-nvg:hover {
  color: #a7f3d0;
  border-color: rgba(52, 211, 153, 0.4);
}
.sn-nvg:active {
  scale: 0.92;
}
.sn-nvg .sn-lens {
  transition: fill 0.25s ease;
  fill: transparent;
}
.sn-nvg--on {
  color: #4ade80;
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(74, 222, 128, 0.5);
  box-shadow: 0 0 14px -2px rgba(74, 222, 128, 0.45);
}
.sn-nvg--on .sn-lens {
  fill: rgba(74, 222, 128, 0.55);
}

@media (prefers-reduced-motion: reduce) {
  .sn-marker--ready,
  .sn-tag {
    transition: none;
  }
}
</style>
