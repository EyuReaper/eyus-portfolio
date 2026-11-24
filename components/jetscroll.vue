<template>
  <button
    v-show="mountedAndReady"
    type="button"
    :class="[
      'hud-module hud-from-bottom-right fixed bottom-5 right-4 sm:bottom-8 sm:right-6 z-[10005]',
      'js-btn military-cut-button military-cut-outline group',
      jetHudClass,
      { 'js-btn--launch': isBlasting },
    ]"
    aria-label="Back to top"
    style="--hud-delay: 0.45s; isolation: isolate;"
    @click="handleScramble"
  >
    <span class="js-jet" aria-hidden="true">
      <span class="js-flame"></span>
      <svg viewBox="0 0 24 24" class="w-5 h-5 rotate-jet" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
      </svg>
    </span>
    <span class="js-label">TOP</span>
  </button>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSystemsOnline } from '~/composables/useSystemsOnline'

const { systemsOnline, isBooting, hudModuleClass } = useSystemsOnline()

const showButton = ref(false)
const isBlasting = ref(false)
const mountedAndReady = ref(false)

// Drop in with HUD during boot; after that only when user has scrolled
const jetHudClass = hudModuleClass(
  computed(() => systemsOnline.value && (isBooting.value || showButton.value)),
)

const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

const handleScroll = () => {
  showButton.value = window.scrollY > 400
}

const handleScramble = () => {
  isBlasting.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setTimeout(() => {
    isBlasting.value = false
  }, 900)
}

let throttledHandleScroll

onMounted(() => {
  throttledHandleScroll = throttle(handleScroll, 100)
  window.addEventListener('scroll', throttledHandleScroll, { passive: true })
  mountedAndReady.value = true
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledHandleScroll)
})
</script>

<style scoped>
.js-btn {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  width: 44px;
  height: 52px;
  color: #6ee7b7;
}
@media (min-width: 640px) {
  .js-btn { width: 48px; height: 58px; }
}
.js-btn > * {
  position: relative; /* above the outline's fill layer */
}
.js-btn:focus-visible {
  outline: 2px solid rgba(52, 211, 153, 0.7);
  outline-offset: 3px;
}
.js-jet {
  position: relative;
  display: grid;
  place-items: center;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.js-btn:hover .js-jet {
  transform: translateY(-3px);
}
.rotate-jet {
  transform: rotate(-45deg);
}
/* Afterburner: hidden at rest, flickers on hover, stretches on launch */
.js-flame {
  position: absolute;
  top: 85%;
  left: 50%;
  width: 4px;
  height: 12px;
  margin-left: -2px;
  border-radius: 9999px;
  background: linear-gradient(to bottom, #fef3c7, #f59e0b 45%, rgba(16, 185, 129, 0));
  transform-origin: top;
  transform: scaleY(0);
  opacity: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.js-btn:hover .js-flame {
  opacity: 1;
  transform: scaleY(0.8);
  animation: js-flicker 0.12s steps(2) infinite alternate;
}
@keyframes js-flicker {
  from { transform: scaleY(0.65); }
  to { transform: scaleY(1); }
}
.js-label {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.28em;
  margin-right: -0.28em; /* optically centre tracked text */
  color: rgba(167, 243, 208, 0.6);
}

/* Launch: jet takes off out of the frame, a fresh one slides back in */
.js-btn--launch .js-jet {
  animation: js-launch 0.9s cubic-bezier(0.55, 0, 0.1, 1) forwards;
}
.js-btn--launch .js-flame {
  opacity: 1;
  animation: none;
  transform: scaleY(2.4);
}
@keyframes js-launch {
  0% { transform: translateY(0); }
  12% { transform: translateY(3px); }
  45% { transform: translateY(-60px); opacity: 1; }
  46% { transform: translateY(40px); opacity: 0; }
  60% { opacity: 1; }
  100% { transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .js-jet,
  .js-flame { transition: none; }
  .js-btn--launch .js-jet,
  .js-btn:hover .js-flame { animation: none; }
}
</style>
