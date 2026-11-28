<template>
  <div class="relative flex items-center justify-center w-full min-h-[400px] px-8">
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
      <!-- Clip the rotating sweep to the circle so its corners never widen the page -->
      <div class="absolute inset-0 z-10 rounded-full overflow-hidden pointer-events-none">
        <div class="absolute inset-0 animate-radar-sweep">
          <div class="w-full h-full rounded-full"
               style="background: conic-gradient(from 0deg at 50% 50%, transparent 300deg, rgba(16, 185, 129, 0.4) 360deg);">
          </div>
        </div>
      </div>

      <div class="absolute inset-0 z-20">
        <a 
          v-for="(link, index) in socialLinks" 
          :key="link.name"
          :href="link.url"
          target="_blank"
          :style="[getIconPosition(index), getSweepDelay(index)]"
          class="absolute flex flex-col items-center justify-center group"
        >
          <div 
            class="radar-blip relative flex items-center justify-center w-14 h-14 text-white bg-slate-900 border-2 border-slate-800 rounded-full transition-all duration-300
                   group-hover:scale-125 group-hover:border-emerald-400 group-hover:shadow-[0_0_30px_#10b981] group-hover:bg-emerald-500/20 group-hover:z-50"
          >
            <!-- Lit while the sweep arm passes over this icon -->
            <span class="radar-lock absolute -inset-0.5 border-2 rounded-full pointer-events-none border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_#10b981]" aria-hidden="true"></span>
            <font-awesome-icon :icon="getFontAwesomeIcon(link.name)" class="w-6 h-6 transition-transform group-hover:rotate-12" />
          </div>
          
          <span 
            class="radar-label mt-2 font-mono text-[10px] tracking-widest transition-all duration-300 uppercase text-emerald-400
                   group-hover:text-emerald-300"
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

const SWEEP_SECONDS = 4; // one full rotation; matches the CSS animations below

const getFontAwesomeIcon = (name) => {
  const map = {
    'GitHub': ['fab', 'github'],
    'LinkedIn': ['fab', 'linkedin'],
    'Telegram': ['fab', 'telegram'],
    'X': ['fab', 'x-twitter'] // Added X (Twitter) icon
  };
  return map[name] || ['fas', 'circle'];
};

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

// Icons run clockwise from the top, like the sweep, so each one lights a
// proportional part of a rotation later. The negative delay starts it mid-cycle.
const getSweepDelay = (index) => ({
  '--sweep-delay': `${(index / props.socialLinks.length - 1) * SWEEP_SECONDS}s`,
});
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

/* Icon highlights are pure CSS: no per-frame JavaScript. Each stays lit for the
   60deg (16.67% of a turn) the arm covers it, with a 300ms fade either side. */
.radar-blip { animation: radar-blip 4s var(--sweep-delay) infinite; }
.radar-lock { opacity: 0; animation: radar-fade 4s var(--sweep-delay) infinite; }
.radar-label { opacity: 0; animation: radar-fade 4s var(--sweep-delay) infinite; }

@keyframes radar-blip {
  0%, 24.17%, 100% { opacity: 0.4; scale: 1; }
  7.5%, 16.67% { opacity: 1; scale: 1.1; }
}

@keyframes radar-fade {
  0%, 24.17%, 100% { opacity: 0; }
  7.5%, 16.67% { opacity: 1; }
}

/* Hover takes over from the sweep */
.group:hover .radar-blip { animation: none; opacity: 1; }
.group:hover .radar-lock { animation: none; opacity: 0; }
.group:hover .radar-label { animation: none; opacity: 1; }
</style>
