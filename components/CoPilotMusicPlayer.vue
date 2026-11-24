<template>
  <!-- Pre-boot gate -->
  <div
    v-show="showWelcomeMessage"
    class="fixed inset-0 bg-slate-900/90 z-[10020] flex items-center justify-center transition-opacity duration-500"
    :class="{ 'opacity-0 pointer-events-none': !showWelcomeMessage || isEngaging }"
  >
    <div class="relative text-center p-8 rounded-xl shadow-lg border-2 border-system animate-glow max-w-md mx-4">
      <p class="text-[10px] font-mono tracking-[0.35em] text-emerald-400/70 mb-3 uppercase">Mark I · Flight Deck</p>
      <p class="text-white text-2xl font-bold mb-2">System Ready</p>
      <p class="text-sky-400/70 text-xs font-mono tracking-widest mb-6 uppercase">Engage comms to bring HUD online</p>
      <button
        @click="engageComms"
        :disabled="isEngaging"
        class="military-cut-button px-8 py-[11px] bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-slate-950 font-semibold transition-all duration-200 tracking-[0.1em] uppercase text-xs [filter:drop-shadow(0_0_12px_rgba(16,185,129,0.35))] hover:[filter:drop-shadow(0_0_18px_rgba(16,185,129,0.55))]"
      >
        {{ isEngaging ? 'Initializing…' : 'Engage' }}
      </button>
    </div>
  </div>

  <!-- Music player HUD module (always mounted so boot drop-in can play) -->
  <div
    @mouseenter="systemsOnline && (isCollapsed = false)"
    @mouseleave="isCollapsed = true"
    @click="systemsOnline && (isCollapsed = false)"
    :class="[
      'hud-module hud-from-bottom-left fixed z-[10000] bottom-5 left-4 sm:bottom-8 sm:left-6 cp-player',
      musicHudClass,
      isCollapsed ? 'cp-player--collapsed' : 'cp-player--open',
      { 'cp-player--playing': isPlaying },
    ]"
    style="--hud-delay: 0.1s; isolation: isolate;"
  >
    <!-- Collapsed: disc with progress ring + equalizer -->
    <button
      v-if="isCollapsed"
      type="button"
      class="cp-disc"
      :aria-label="`Music player: ${track.title}`"
    >
      <svg class="cp-ring" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r="25" class="cp-ring-track" />
        <circle
          cx="28" cy="28" r="25"
          class="cp-ring-fill"
          :style="{ strokeDashoffset: RING_LEN * (1 - progress) }"
        />
      </svg>
      <span class="cp-eq" aria-hidden="true">
        <span v-for="i in 4" :key="i" class="cp-eq-bar" :style="{ '--i': i }"></span>
      </span>
    </button>

    <!-- Expanded -->
    <div v-else class="cp-panel">
      <div class="flex items-center gap-3 min-w-0">
        <span class="cp-tile" aria-hidden="true">
          <span class="cp-eq">
            <span v-for="i in 4" :key="i" class="cp-eq-bar" :style="{ '--i': i }"></span>
          </span>
        </span>

        <div class="flex-1 min-w-0">
          <div class="cp-title-wrap">
            <span
              :key="track.title"
              class="cp-title"
              :class="{ 'marquee-text': track.title.length > 18 }"
            >{{ track.title }}</span>
          </div>
          <div class="flex items-center justify-between gap-2 text-[11px] text-slate-400">
            <span class="truncate">{{ track.artist }}</span>
            <span class="shrink-0 text-[9px] tabular-nums tracking-[0.2em] text-emerald-300/50">{{ pad(currentTrackIndex + 1) }}/{{ pad(tracks.length) }}</span>
          </div>
        </div>
      </div>

      <!-- Progress -->
      <div class="mt-3 flex items-center gap-2 text-[10px] tabular-nums text-slate-500">
        <span class="w-7">{{ fmt(currentTime) }}</span>
        <div
          class="cp-progress flex-1"
          role="slider"
          aria-label="Seek"
          :aria-valuenow="Math.round(progress * 100)"
          aria-valuemin="0"
          aria-valuemax="100"
          tabindex="0"
          @click.stop="seek"
          @keydown.right.prevent="nudge(5)"
          @keydown.left.prevent="nudge(-5)"
        >
          <span class="cp-progress-fill" :style="{ transform: `scaleX(${progress})` }"></span>
        </div>
        <span class="w-7 text-right">{{ fmt(duration) }}</span>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-1 mt-2">
        <button type="button" title="Previous" class="cp-icon-btn" @click.stop="playPrev">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg>
        </button>
        <button
          type="button"
          :title="isPlaying ? 'Pause' : 'Play'"
          class="cp-play military-cut-button"
          @click.stop="togglePlay"
        >
          <svg v-if="!isPlaying" viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>
          <svg v-else viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
        </button>
        <button type="button" title="Next" class="cp-icon-btn" @click.stop="playNext">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg>
        </button>

        <div class="flex items-center gap-1.5 ml-auto">
          <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 text-emerald-300/60 shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4z"/><path v-if="volume > 0" d="M15.5 8.5a5 5 0 0 1 0 7"/>
          </svg>
          <input
            type="range" min="0" max="1" step="0.01"
            v-model.number="volume"
            @input="setVolume"
            @click.stop
            class="cp-volume"
            :style="{ '--vol': `${volume * 100}%` }"
            aria-label="Volume"
          >
        </div>

        <button type="button" title="Power off" class="cp-icon-btn cp-power" @click.stop="powerOff">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><path d="M12 2v10"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import DualWielder from '~/assets/dual-wielder-project-aces.mp3';
import MidnightLight from '~/assets/midnight-light-jose-pavli.mp3';
import Redline from '~/assets/redline-jose-pavli.mp3';
import { useSystemsOnline } from '~/composables/useSystemsOnline';

const { systemsOnline, engageSystems, powerDownSystems, hudModuleClass } = useSystemsOnline();
const musicHudClass = hudModuleClass();

const audio = ref(null);
const isPlaying = ref(false);
const volume = ref(0.2); // Default volume
const currentTrackIndex = ref(0);
const showWelcomeMessage = ref(true); // New state for welcome message
const isCollapsed = ref(true); // For mobile collapse
const isEngaging = ref(false);
let collapseTimer = null;

// Music tracks
const tracks = [
  { name: "Dual Wielder - PROJECT ACES", src: DualWielder },
  { name: "Midnight Light - Jose Pavli", src: MidnightLight },
  { name: "Redline - Jose Pavli", src: Redline },
];

const currentTrackName = computed(() => tracks[currentTrackIndex.value].name);
const track = computed(() => {
  const [title, artist = ''] = currentTrackName.value.split(' - ');
  return { title, artist };
});

// Playback progress (timeupdate fires ~4x/sec, so this is cheap)
const RING_LEN = 2 * Math.PI * 25;
const currentTime = ref(0);
const duration = ref(0);
const progress = computed(() => (duration.value ? Math.min(currentTime.value / duration.value, 1) : 0));
const pad = (n) => String(n).padStart(2, '0');
const fmt = (t) => (Number.isFinite(t) && t > 0 ? `${Math.floor(t / 60)}:${pad(Math.floor(t % 60))}` : '0:00');
const onTimeUpdate = () => { currentTime.value = audio.value?.currentTime || 0; };
const onMeta = () => { duration.value = audio.value?.duration || 0; };

const seek = (e) => {
  if (!audio.value || !duration.value) return;
  const r = e.currentTarget.getBoundingClientRect();
  audio.value.currentTime = ((e.clientX - r.left) / r.width) * duration.value;
};
const nudge = (secs) => {
  if (audio.value) audio.value.currentTime = Math.max(0, audio.value.currentTime + secs);
};

const loadTrack = (index) => {
  if (audio.value) {
    audio.value.src = tracks[index].src;
    audio.value.load();
    if (isPlaying.value) {
      audio.value.play();
      showNowPlaying();
    }
  }
};

const togglePlay = () => {
  if (!audio.value) return;
  if (audio.value.paused) {
    audio.value.play();
    isPlaying.value = true;
  } else {
    audio.value.pause();
    isPlaying.value = false;
  }
};

const playPrev = () => {
  // Restart the current track if we're more than 3s in, like most players
  if (audio.value && audio.value.currentTime > 3) {
    audio.value.currentTime = 0;
    return;
  }
  currentTrackIndex.value = (currentTrackIndex.value - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex.value);
};

const playNext = () => {
  currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.length;
  loadTrack(currentTrackIndex.value);
};

const setVolume = () => {
  if (audio.value) {
    audio.value.volume = volume.value;
  }
};

const powerOff = () => {
  if (audio.value) {
    audio.value.pause();
  }
  isPlaying.value = false;
  isEngaging.value = false;
  powerDownSystems();
  showWelcomeMessage.value = true;
  if (collapseTimer) clearTimeout(collapseTimer);
};

const showNowPlaying = () => {
  isCollapsed.value = false;
  if (collapseTimer) clearTimeout(collapseTimer);
  collapseTimer = setTimeout(() => {
    isCollapsed.value = true;
  }, 2800);
};

onMounted(() => {
  audio.value = new Audio();
  audio.value.volume = volume.value;
  loadTrack(currentTrackIndex.value);
  audio.value.addEventListener('ended', playNext); // Auto play next track
  audio.value.addEventListener('timeupdate', onTimeUpdate);
  audio.value.addEventListener('loadedmetadata', onMeta);
  isPlaying.value = false; // Ensure it's false initially
});

const engageComms = () => {
  if (isEngaging.value) return;
  isEngaging.value = true;

  // Kick Iron Man HUD boot — modules drop in staggered sequence
  engageSystems();

  // Brief beat for overlay / gate fade, then reveal player + audio
  setTimeout(() => {
    showWelcomeMessage.value = false;
    isEngaging.value = false;
    if (audio.value) {
      audio.value.play().catch(() => {});
      isPlaying.value = true;
      showNowPlaying();
    }
  }, 280);
};

onUnmounted(() => {
  if (collapseTimer) clearTimeout(collapseTimer);
  if (audio.value) {
    audio.value.removeEventListener('ended', playNext);
    audio.value.removeEventListener('timeupdate', onTimeUpdate);
    audio.value.removeEventListener('loadedmetadata', onMeta);
    audio.value.pause();
    audio.value = null;
  }
});
</script>

<style scoped>
.marquee-text {
  display: inline-block;
  white-space: nowrap;
  /* Percentage padding resolves against the container width, so the text
     starts just past the right edge; translateX(-100%) then carries it fully
     off the left edge. Transform-only, so no layout per frame. */
  padding-left: 100%;
  will-change: transform;
  animation: marquee 5s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-text {
    padding-left: 0;
    animation: none;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* ── Player shell ─────────────────────────────────────── */
.cp-player {
  background: rgba(6, 10, 15, 0.94);
  border: 1px solid rgba(52, 211, 153, 0.22);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.4),
    0 18px 40px -18px rgba(0, 0, 0, 0.9),
    inset 0 1px 0 rgba(167, 243, 208, 0.06);
  color: #e2e8f0;
  transition: border-color 0.3s ease;
}
.cp-player--collapsed {
  width: 44px;
  height: 44px;
  border-radius: 9999px;
}
@media (min-width: 640px) {
  .cp-player--collapsed { width: 56px; height: 56px; }
}
.cp-player--open {
  width: min(300px, calc(100vw - 2rem));
  padding: 12px 12px 10px;
  border-radius: 16px;
}
.cp-player:hover {
  border-color: rgba(52, 211, 153, 0.4);
}
.cp-panel {
  animation: cp-panel-in 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes cp-panel-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
}

/* ── Collapsed disc ───────────────────────────────────── */
.cp-disc {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  border-radius: inherit;
}
.cp-ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  rotate: -90deg;
}
.cp-ring-track {
  fill: none;
  stroke: rgba(52, 211, 153, 0.12);
  stroke-width: 2;
}
.cp-ring-fill {
  fill: none;
  stroke: #34d399;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 157.08;
  transition: stroke-dashoffset 0.3s linear;
}

/* ── Equalizer (transform-only) ───────────────────────── */
.cp-eq {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 18px;
}
.cp-eq-bar {
  width: 3px;
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(to top, #10b981, #6ee7b7);
  transform-origin: bottom;
  transform: scaleY(0.25);
  animation: cp-eq 0.9s ease-in-out infinite alternate;
  animation-delay: calc(var(--i) * -0.23s);
  animation-duration: calc(0.6s + var(--i) * 0.11s);
  animation-play-state: paused;
}
.cp-player--playing .cp-eq-bar {
  animation-play-state: running;
}
@keyframes cp-eq {
  0% { transform: scaleY(0.2); }
  35% { transform: scaleY(0.9); }
  70% { transform: scaleY(0.45); }
  100% { transform: scaleY(1); }
}
.cp-tile {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background:
    radial-gradient(circle at 30% 20%, rgba(52, 211, 153, 0.22), transparent 70%),
    rgba(16, 185, 129, 0.06);
  border: 1px solid rgba(52, 211, 153, 0.2);
}

/* ── Title ────────────────────────────────────────────── */
.cp-title-wrap {
  overflow: hidden;
  white-space: nowrap;
  mask-image: linear-gradient(to right, #000 85%, transparent);
}
.cp-title {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #f1f5f9;
}
.cp-title.marquee-text {
  animation-duration: 9s;
}

/* ── Progress ─────────────────────────────────────────── */
.cp-progress {
  position: relative;
  height: 4px;
  border-radius: 9999px;
  background: rgba(148, 163, 184, 0.15);
  overflow: hidden;
  cursor: pointer;
}
.cp-progress::before {
  /* larger invisible hit area */
  content: "";
  position: absolute;
  inset: -6px 0;
}
.cp-progress-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #10b981, #6ee7b7);
  transform-origin: left;
  transition: transform 0.25s linear;
}
.cp-progress:focus-visible {
  outline: 2px solid rgba(52, 211, 153, 0.6);
  outline-offset: 3px;
}

/* ── Buttons ──────────────────────────────────────────── */
.cp-icon-btn {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 7px;
  color: rgba(167, 243, 208, 0.75);
  transition: color 0.15s ease, background-color 0.15s ease, transform 0.15s ease;
}
.cp-icon-btn:hover {
  color: #6ee7b7;
  background: rgba(16, 185, 129, 0.1);
}
.cp-icon-btn:active,
.cp-play:active {
  transform: scale(0.92);
}
.cp-power:hover {
  color: #f87171;
  background: rgba(248, 113, 113, 0.1);
}
.cp-play {
  display: grid;
  place-items: center;
  width: 38px;
  height: 28px;
  color: #022c22;
  background: #34d399;
  transition: background-color 0.15s ease, transform 0.15s ease;
}
.cp-play:hover {
  background: #6ee7b7;
}
.cp-icon-btn:focus-visible,
.cp-play:focus-visible,
.cp-disc:focus-visible {
  outline: 2px solid rgba(52, 211, 153, 0.7);
  outline-offset: 2px;
}

/* ── Volume ───────────────────────────────────────────── */
.cp-volume {
  -webkit-appearance: none;
  appearance: none;
  width: 64px;
  height: 4px;
  border-radius: 9999px;
  cursor: pointer;
  background: linear-gradient(to right, #34d399 var(--vol), rgba(148, 163, 184, 0.18) var(--vol));
}
.cp-volume::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ecfdf5;
  box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25);
  transition: transform 0.15s ease;
}
.cp-volume:hover::-webkit-slider-thumb {
  transform: scale(1.2);
}
.cp-volume::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border: 0;
  border-radius: 50%;
  background: #ecfdf5;
  box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25);
}
.cp-volume::-moz-range-track {
  background: transparent;
}

@media (prefers-reduced-motion: reduce) {
  .cp-eq-bar { animation: none; transform: scaleY(0.6); }
  .cp-panel { animation: none; }
}
</style>
