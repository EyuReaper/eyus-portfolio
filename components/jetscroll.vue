<template>
  <button
    v-show="mountedAndReady"
    @click="handleScramble"
    :class="[
      'hud-module hud-from-bottom-right fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[10005] p-4 rounded-full border-2 border-system hover:border-safe',
      jetHudClass,
    ]"
    aria-label="Scramble to top"
    style="--hud-delay: 0.7s; isolation: isolate;"
  >
    <div
      :class="[
        'relative transition-all duration-700 ease-in-expo',
        isBlasting ? '-translate-y-[100vh] scale-150' : 'hover:-translate-y-2',
        !isBlasting && showButton ? 'animate-glow' : '',
      ]"
    >
      <div
        v-if="isBlasting"
        class="absolute top-full left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-t from-emerald-500 via-sky-500 to-transparent blur-sm animate-pulse"
      ></div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-system drop-shadow-[0_0_10px_rgba(14,165,233,0.8)] rotate-jet"
      >
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
      </svg>
    </div>
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
  }, 1000)
}

let throttledHandleScroll

onMounted(() => {
  throttledHandleScroll = throttle(handleScroll, 100)
  window.addEventListener('scroll', throttledHandleScroll)
  mountedAndReady.value = true
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledHandleScroll)
})
</script>

<style scoped>
.ease-in-expo {
  transition-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
}
.rotate-jet {
  transform: rotate(-45deg);
}
</style>
