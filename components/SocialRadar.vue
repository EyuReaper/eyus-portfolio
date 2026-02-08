<template>
  <div class="relative flex items-center justify-center w-full min-h-[400px]">
    <div class="relative w-full max-w-sm aspect-square">
      
      <div class="absolute inset-0 border-2 rounded-full bg-slate-950 border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.1)]"></div>
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div v-for="i in 3" :key="i" 
          :style="{ width: i * 30 + '%', height: i * 30 + '%' }"
          class="absolute border rounded-full border-emerald-500/30">
        </div>
        <div class="absolute w-[90%] h-[1px] bg-emerald-500/50"></div>
        <div class="absolute h-[90%] w-[1px] bg-emerald-500/50"></div>
      </div>

      <!-- Radar Sweep - Fixed origin -->
      <div class="absolute inset-0 z-10 pointer-events-none animate-radar-sweep">
        <div class="w-full h-full rounded-full" 
             style="background: conic-gradient(from 0deg at 50% 50%, transparent 300deg, rgba(16, 185, 129, 0.4) 360deg);">
        </div>
      </div>

      <div class="absolute inset-0 z-20">
        <a 
          v-for="(link, index) in socialLinks" 
          :key="link.name"
          :href="link.url"
          target="_blank"
          :style="getIconPosition(index)"
          class="absolute flex flex-col items-center justify-center group"
        >
          <div 
            class="flex items-center justify-center w-14 h-14 text-white bg-slate-900 border-2 rounded-full transition-all duration-300
                   group-hover:scale-125 group-hover:border-emerald-400 group-hover:shadow-[0_0_30px_#10b981] group-hover:bg-emerald-500/20 group-hover:z-50"
            :class="[
              isActive(index) 
                ? 'border-emerald-500 shadow-[0_0_20px_#10b981] scale-110 bg-emerald-500/10 opacity-100' 
                : 'border-slate-800 opacity-40 scale-100'
            ]"
          >
            <font-awesome-icon :icon="getFontAwesomeIcon(link.name)" class="w-6 h-6 transition-transform group-hover:rotate-12" />
          </div>
          
          <span 
            class="mt-2 font-mono text-[10px] tracking-widest transition-all duration-300 uppercase
                   group-hover:opacity-100 group-hover:text-emerald-300"
            :class="isActive(index) ? 'text-emerald-400 opacity-100' : 'text-emerald-900 opacity-0'"
          >
            {{ link.name }}
          </span>
        </a>
      </div>

      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981] z-30"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  socialLinks: {
    type: Array,
    default: () => [
      { name: 'GitHub', url: '#' },
      { name: 'LinkedIn', url: '#' },
      { name: 'Telegram', url: '#' },
      { name: 'X', url: '#' } // Added for consistency
    ]
  }
});

const currentAngle = ref(0);
let animationFrame = null;
const SWEEP_DURATION = 4000; // 4 seconds per full rotation
const SWEEP_WIDTH_DEGREES = 60; // The conic gradient covers 60 degrees

const getFontAwesomeIcon = (name) => {
  const map = {
    'GitHub': ['fab', 'github'],
    'LinkedIn': ['fab', 'linkedin'],
    'Telegram': ['fab', 'telegram'],
    'X': ['fab', 'x-twitter'] // Added X (Twitter) icon
  };
  return map[name] || ['fas', 'circle'];
};

// High-precision angle tracking
const updateAngle = (startTime) => {
  const elapsed = performance.now() - startTime;
  currentAngle.value = (elapsed % SWEEP_DURATION) / SWEEP_DURATION * 360;
  animationFrame = requestAnimationFrame(() => updateAngle(startTime));
};

onMounted(() => updateAngle(performance.now()));
onUnmounted(() => cancelAnimationFrame(animationFrame));

const getIconPosition = (index) => {
  const numLinks = props.socialLinks.length;
  // Offset by -90 because 0 degrees in CSS/Math is usually East, but radar starts North
  const angle = (index * (360 / numLinks)) - 90; 
  const radius = 38; // 38% from center

  const x = 50 + radius * Math.cos(angle * Math.PI / 180);
  const y = 50 + radius * Math.sin(angle * Math.PI / 180);

  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)'
  };
};

const isActive = (index) => {
  const numLinks = props.socialLinks.length;
  const iconAngle = (index * (360 / numLinks)); // Icon angle relative to 0 (East)

  // Normalized iconAngle to match radar sweep's 0 position (North)
  const normalizedIconAngle = (iconAngle - 90 + 360) % 360; 

  // Check if the current sweep angle is within the "active" range of the sweep arm
  // The sweep arm goes from currentAngle to (currentAngle + SWEEP_WIDTH_DEGREES)
  const sweepStart = currentAngle.value;
  const sweepEnd = (currentAngle.value + SWEEP_WIDTH_DEGREES) % 360;

  if (sweepStart < sweepEnd) {
    return normalizedIconAngle >= sweepStart && normalizedIconAngle <= sweepEnd;
  } else { // Handles wrap-around (e.g., sweep goes from 340 to 20 degrees)
    return normalizedIconAngle >= sweepStart || normalizedIconAngle <= sweepEnd;
  }
};
</script>

<style scoped>
@keyframes radar-sweep {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-radar-sweep {
  animation: radar-sweep 4s linear infinite;
  /* Ensure transform-origin is center */
  transform-origin: center center;
}
</style>
