<template>
  <div class="relative py-20 overflow-hidden transition-colors duration-500 bg-gray-900 dark:bg-slate-950">
    <h2 class="mb-4 font-mono text-3xl font-bold tracking-tighter text-center text-white">
      TECH_ALTITUDE: <span class="uppercase text-emerald-500">Top Languages</span>
      <a :href="`https://github.com/${githubUser}`" target="_blank" class="transition-colors text-sky-500 hover:text-emerald-400">
        [{{ githubUser }}]
      </a>
    </h2>

    <div v-if="loading" class="font-mono text-center text-emerald-500 animate-pulse">INITIALIZING SCAN...</div>
    <div v-else-if="error" class="font-mono text-center text-red-500">ERROR: SIGNAL_LOST ({{ error }})</div>
    <div v-else-if="techStackData.length === 0" class="font-mono text-center text-white">NO DATA FOUND.</div>

    <div v-else class="relative w-full px-4 h-96" ref="container">
      <svg :viewBox="`0 0 ${width} 110`" class="w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
          </linearGradient>
          
          <filter id="hudGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g class="opacity-10 dark:opacity-20">
          <line v-for="h in [20, 40, 60, 80]" :key="h" 
            x1="0" :y1="h" :x2="width" :y2="h" 
            stroke="#10b981" stroke-width="0.5" stroke-dasharray="4 4" />
          <text v-for="h in [20, 40, 60, 80]" :key="`t-${h}`"
            x="5" :y="h - 2" fill="#10b981" font-size="3" font-family="monospace">
            {{ 100 - h }}%
          </text>
        </g>

        <path 
          :d="fullPath" 
          fill="url(#mountainGradient)" 
          class="transition-opacity duration-1000"
          :class="animationTriggered ? 'opacity-100' : 'opacity-0'"
        />

        <path 
          :d="topLinePath" 
          fill="none" 
          stroke="#10b981" 
          stroke-width="0.6" 
          filter="url(#hudGlow)"
          ref="mainPathRef"
          class="path-draw-animation"
          :style="{ 
            'stroke-dasharray': pathLength, 
            'stroke-dashoffset': animationTriggered ? 0 : pathLength 
          }"
        />
        
        <g v-for="(point, index) in points" :key="index">
          <g v-if="activeLabel === index" class="text-emerald-400">
            <rect :x="point.x - 4" :y="point.y - 4" width="8" height="8" fill="none" stroke="currentColor" stroke-width="0.3" class="animate-ping" />
            <line :x1="point.x" :y1="0" :x2="point.x" :y2="110" stroke="currentColor" stroke-width="0.2" stroke-dasharray="2 2" />
          </g>

          <circle 
            :cx="point.x" :cy="point.y" 
            :r="activeLabel === index ? 3 : 1.5" 
            :fill="activeLabel === index ? '#fff' : '#10b981'"
            class="transition-all duration-300 cursor-pointer"
            @mouseenter="showLabel(index, false)"
            @mouseleave="debouncedHideLabel"
            @click="showLabel(index, true)"
          />
          
          <rect :x="point.x - 15" :y="0" width="30" height="110" fill="transparent" class="cursor-pointer" @mouseenter="showLabel(index, false)" />
        </g>
      </svg>
      
      <div 
        v-for="(tech, index) in techStackData" 
        :key="`label-${index}`"
        :style="{ left: `${(points[index].x / width) * 100}%`, top: `${points[index].y - 35}px` }"
        class="absolute transition-all duration-300 ease-out pointer-events-none"
        :class="activeLabel === index ? 'opacity-100 transform -translate-x-1/2 -translate-y-2' : 'opacity-0 transform -translate-x-1/2 translate-y-0'"
      >
        <div class="px-3 py-1 text-xs font-mono text-emerald-400 bg-slate-900 border border-emerald-500/50 rounded shadow-[0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md">
          {{ tech.name.toUpperCase() }} // {{ tech.altitude }}%
        </div>
      </div>
    </div>
    
    <div 
      v-if="activeLabel !== null && techStackData.length > 0"
      class="absolute hidden transition-opacity duration-300 -translate-y-1/2 top-1/2 right-8 lg:block"
    >
      <AltitudeTape :targetAltitude="techStackData[activeLabel].altitude" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import AltitudeTape from './ui/AltitudeTape.vue';
import { useGithubLanguages } from '@/composables/useGithubLanguages';

const props = defineProps({
  githubUser: { type: String, default: 'EyuReaper' },
  isVisible: { type: Boolean, default: true }
});

const { languages: fetchedLanguages, loading, error } = useGithubLanguages(props.githubUser);
const techStackData = computed(() => fetchedLanguages.value);

const container = ref(null);
const width = ref(1000);
const activeLabel = ref(null);
const pathLength = ref(0);
const animationTriggered = ref(false);
const mainPathRef = ref(null);
const horizontalPadding = 80;

// Calculate SVG Points
const points = computed(() => {
  const count = techStackData.value.length;
  if (count === 0) return [];
  const usableWidth = width.value - (2 * horizontalPadding);
  const segmentWidth = usableWidth / (count > 1 ? count - 1 : 1);
  return techStackData.value.map((tech, i) => ({
    x: horizontalPadding + (i * segmentWidth),
    y: 90 - (tech.altitude / 100 * 70), // Map 0-100 altitude to 20-90 Y space
  }));
});

// Helper for Catmull-Rom smoothing
const getControlPoints = (p0, p1, p2, p3) => {
  const t = 0.2; // Tension
  return [
    { x: p1.x + (p2.x - p0.x) * t, y: p1.y + (p2.y - p0.y) * t },
    { x: p2.x - (p3.x - p1.x) * t, y: p2.y - (p3.y - p1.y) * t }
  ];
};

// Top Line Path (For Stroke Animation)
const topLinePath = computed(() => {
  const p = points.value;
  if (p.length < 2) return '';
  let d = `M ${p[0].x},${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const [c1, c2] = getControlPoints(p[i-1] || p[i], p[i], p[i+1], p[i+2] || p[i+1]);
    d += ` C ${c1.x},${c1.y} ${c2.x},${c2.y} ${p[i+1].x},${p[i+1].y}`;
  }
  return d;
});

// Full Path (For Fill)
const fullPath = computed(() => {
  if (points.value.length < 2) return '';
  return `${topLinePath.value} L ${points.value[points.value.length-1].x},110 L ${points.value[0].x},110 Z`;
});

const setWidth = () => {
  if (container.value) width.value = container.value.clientWidth;
};

onMounted(() => {
  setWidth();
  window.addEventListener('resize', setWidth);
  
  // Trigger animation when data arrives or visibility changes
  watch([techStackData, () => props.isVisible], async ([data, visible]) => {
    if (data.length > 0 && visible) {
      await nextTick();
      if (mainPathRef.value) {
        pathLength.value = mainPathRef.value.getTotalLength();
        setTimeout(() => animationTriggered.value = true, 100);
      }
    }
  }, { immediate: true });
});

// Hover Logic
let hideTimeoutId = null;
const showLabel = (index, toggled = false) => {
  if (hideTimeoutId) clearTimeout(hideTimeoutId);
  if (toggled) activeLabel.value = activeLabel.value === index ? null : index;
  else activeLabel.value = index;
};

const debouncedHideLabel = () => {
  hideTimeoutId = setTimeout(() => activeLabel.value = null, 300);
};
</script>

<style scoped>
.path-draw-animation {
  transition: stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scanline effect for the chart area */
svg {
  background: linear-gradient(
    rgba(16, 185, 129, 0.02) 50%, 
    transparent 50%
  );
  background-size: 100% 4px;
}

@keyframes scanline {
  0% { opacity: 0.5; }
  50% { opacity: 0.8; }
  100% { opacity: 0.5; }
}

path {
  animation: scanline 4s infinite ease-in-out;
}
</style>