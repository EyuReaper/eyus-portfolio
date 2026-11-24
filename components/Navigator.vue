<template>
  <ClientOnly>
    <!-- ACE trigger pill -->
    <button
      ref="pillRef"
      @click="isOpen = !isOpen"
      @pointermove="onPillPointer"
      @pointerenter="onPillEnter"
      @pointerleave="onPillLeave"
      class="hud-module hud-from-right group ace-pill fixed bottom-[84px] sm:bottom-[102px] right-4 sm:right-6 z-[10005] border border-[rgba(0,212,255,0.2)] bg-[#060A0F] flex items-center hover:border-[rgba(0,212,255,0.4)] transition-[border-color,background] duration-300 cursor-pointer rounded-full shadow-[0_0_20px_rgba(0,212,255,0.05)]"
      :class="[navHudClass, { 'ace-pill--active': isHoveringPill || isOpen, 'ace-pill--paused': botPaused, 'ace-pill--thinking': loading }]"
      :style="{ ...pillStyle, '--hud-delay': '0.25s' }"
      aria-label="Toggle ACE"
    >
      <!-- Reversed so the ACE label slides out to the left, toward the page -->
      <div class="flex flex-row-reverse items-center">
        <!-- Robot — blinks, waves, tracks pointer -->
        <span class="ace-bot-wrap shrink-0">
        <!-- Pre-glowed halo: hover only fades its opacity (no per-frame filter) -->
        <span class="ace-bot-halo" aria-hidden="true"></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          class="ace-bot shrink-0 text-[#00D4FF]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ace-bot-shell" x1="12" y1="8" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.4"/>
              <stop offset="55%" stop-color="#00D4FF" stop-opacity="0.12"/>
              <stop offset="100%" stop-color="#00D4FF" stop-opacity="0.3"/>
            </linearGradient>
            <linearGradient id="ace-bot-visor" x1="16" y1="18" x2="40" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.18"/>
              <stop offset="50%" stop-color="#7CFC00" stop-opacity="0.22"/>
              <stop offset="100%" stop-color="#00D4FF" stop-opacity="0.18"/>
            </linearGradient>
            <linearGradient id="ace-bot-arm" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="#00D4FF" stop-opacity="0.45"/>
            </linearGradient>
            <clipPath id="ace-bot-visor-clip">
              <rect x="17" y="19" width="22" height="8.5" rx="4.2"/>
            </clipPath>
            <linearGradient id="ace-bot-scan-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#E8FBFF" stop-opacity="0"/>
              <stop offset="50%" stop-color="#E8FBFF" stop-opacity="0.55"/>
              <stop offset="100%" stop-color="#E8FBFF" stop-opacity="0"/>
            </linearGradient>
            <filter id="ace-bot-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.4" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- Root: idle bob + interactive tilt -->
          <g class="ace-bot-root">
            <!-- Antenna -->
            <g class="ace-bot-antenna">
              <path d="M28 6.5V12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.85"/>
              <circle class="ace-bot-signal" cx="28" cy="5" r="2" fill="currentColor" filter="url(#ace-bot-glow)" opacity="0.95"/>
              <circle class="ace-bot-ring" cx="28" cy="5" r="3.4" stroke="currentColor" stroke-width="0.9" fill="none" opacity="0.35"/>
            </g>

            <!-- Left arm (resting) -->
            <g class="ace-bot-arm-left">
              <path
                d="M12.5 30 C8 32 6.5 37 7.5 41"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                fill="none"
                opacity="0.7"
              />
              <circle cx="7.5" cy="41.5" r="2.2" fill="currentColor" opacity="0.55"/>
            </g>

            <!-- Right arm (waves) — pivot at shoulder -->
            <g class="ace-bot-arm-right">
              <path
                d="M43.5 30 C48 31.5 50.5 27 51 22"
                stroke="url(#ace-bot-arm)"
                stroke-width="2.6"
                stroke-linecap="round"
                fill="none"
                opacity="0.9"
              />
              <!-- Hand / wave tip -->
              <g class="ace-bot-hand">
                <circle cx="51.2" cy="20.5" r="2.6" fill="currentColor" opacity="0.75" filter="url(#ace-bot-glow)"/>
                <path d="M51.2 17.2 V15.2 M53.4 18.4 L54.8 17.2 M49 18.4 L47.6 17.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
              </g>
            </g>

            <!-- Head tracks pointer slightly -->
            <g class="ace-bot-head">
              <!-- Ear pods -->
              <rect x="9" y="20" width="4" height="9" rx="1.5" fill="currentColor" opacity="0.55"/>
              <rect x="43" y="20" width="4" height="9" rx="1.5" fill="currentColor" opacity="0.55"/>
              <circle class="ace-bot-led" cx="11" cy="24.5" r="0.9" fill="#7CFC00" opacity="0.9"/>
              <circle class="ace-bot-led" cx="45" cy="24.5" r="0.9" fill="#7CFC00" opacity="0.9"/>

              <!-- Chassis -->
              <rect x="13" y="12" width="30" height="26" rx="8" fill="url(#ace-bot-shell)" stroke="currentColor" stroke-width="1.5"/>
              <path d="M18 16.5h20" stroke="currentColor" stroke-width="0.8" opacity="0.25" stroke-linecap="round"/>
              <path d="M16 34h5M35 34h5" stroke="currentColor" stroke-width="1" opacity="0.3" stroke-linecap="round"/>

              <!-- Visor -->
              <rect x="17" y="19" width="22" height="8.5" rx="4.2" fill="url(#ace-bot-visor)" stroke="currentColor" stroke-width="1" opacity="0.95"/>

              <!-- Visor light sweep -->
              <g clip-path="url(#ace-bot-visor-clip)">
                <rect class="ace-bot-scan" x="11" y="18" width="6" height="11" fill="url(#ace-bot-scan-grad)"/>
              </g>

              <!-- Eyes (blink via scaleY) -->
              <g class="ace-bot-eyes">
                <g class="ace-bot-eye ace-bot-eye-l">
                  <circle cx="23" cy="23.2" r="2.1" fill="currentColor" filter="url(#ace-bot-glow)"/>
                  <circle class="ace-bot-pupil" cx="23.5" cy="22.7" r="0.65" fill="#E8FBFF" opacity="0.95"/>
                </g>
                <g class="ace-bot-eye ace-bot-eye-r">
                  <circle cx="33" cy="23.2" r="2.1" fill="currentColor" filter="url(#ace-bot-glow)"/>
                  <circle class="ace-bot-pupil" cx="33.5" cy="22.7" r="0.65" fill="#E8FBFF" opacity="0.95"/>
                </g>
              </g>

              <!-- Mouth LED -->
              <rect x="21" y="31.5" width="14" height="2.8" rx="1.4" fill="currentColor" opacity="0.16"/>
              <rect class="ace-bot-mouth" x="23" y="32" width="10" height="1.8" rx="0.9" fill="currentColor" opacity="0.8"/>
            </g>

            <!-- Collar / body stump -->
            <g class="ace-bot-body">
              <path d="M21 38v3.5c0 1.4 1.1 2.5 2.5 2.5h9c1.4 0 2.5-1.1 2.5-2.5V38" stroke="currentColor" stroke-width="1.4" opacity="0.55" stroke-linecap="round"/>
              <path d="M24 44h8" stroke="currentColor" stroke-width="1.1" opacity="0.3" stroke-linecap="round"/>
            </g>
          </g>
        </svg>
        </span>

        <!-- Status dot -->
        <span
          class="ace-status-badge w-2 h-2 rounded-full"
          :class="apiConnected ? 'bg-[#00D4FF] shadow-[0_0_8px_rgba(0,212,255,0.7)] ace-status-pulse' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'"
        ></span>

        <!-- Label -->
        <span class="ace-label font-mono text-xs tracking-[0.15em] text-[#00D4FF]/75 whitespace-nowrap font-semibold">
          ACE
        </span>
      </div>
    </button>

    <!-- Chat Panel (colours come from --ap-* variables so it follows the active theme) -->
    <Transition name="navigator-slide">
      <div
        v-if="isOpen"
        class="ace-panel fixed bottom-[140px] sm:bottom-[170px] right-4 sm:right-6 z-[10015] w-[min(20rem,calc(100vw-2rem))] h-[min(540px,calc(100svh-170px))] sm:h-[min(540px,calc(100svh-200px))] rounded-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-label="ACE chat"
      >
        <!-- Header -->
        <div class="ace-panel__header flex items-center gap-2.5 px-4 py-3.5 relative z-10">
          <div class="relative">
            <div class="ace-panel__avatar w-7 h-7 rounded-full flex items-center justify-center overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M20 6.5V10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.8"/>
                <circle cx="20" cy="5.2" r="1.5" fill="currentColor"/>
                <rect x="5.5" y="15.5" width="2.8" height="6.5" rx="1" fill="currentColor" opacity="0.5"/>
                <rect x="31.7" y="15.5" width="2.8" height="6.5" rx="1" fill="currentColor" opacity="0.5"/>
                <rect x="9" y="10" width="22" height="18" rx="6" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="12.5" y="14.5" width="15" height="5.5" rx="2.75" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="1" opacity="0.9"/>
                <circle cx="16.5" cy="17.2" r="1.4" fill="currentColor"/>
                <circle cx="23.5" cy="17.2" r="1.4" fill="currentColor"/>
                <rect x="16" y="23.5" width="8" height="1.5" rx="0.75" fill="currentColor" opacity="0.7"/>
              </svg>
            </div>
            <span
              class="ace-panel__dot absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
              :class="apiConnected ? 'ace-panel__dot--on' : 'bg-red-500'"
            ></span>
          </div>

          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="ace-panel__name font-mono text-xs tracking-[0.12em] font-semibold">ACE</span>
              <span
                class="text-[9px] uppercase font-mono tracking-[0.1em] px-1.5 py-0.5 rounded"
                :class="apiConnected ? 'ace-panel__badge' : 'bg-red-500/10 text-red-500'"
              >
                {{ apiConnected ? 'ONLINE' : 'OFFLINE' }}
              </span>
            </div>
            <span class="ace-panel__sub text-[8px] font-mono tracking-[0.12em]">NAVIGATOR v2.0</span>
          </div>

          <button
            type="button"
            class="ace-panel__close ml-auto w-7 h-7 rounded-full grid place-items-center transition-colors duration-200"
            aria-label="Close ACE chat"
            @click="isOpen = false"
          >
            <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
          </button>
        </div>

        <!-- Messages -->
        <div ref="messagesContainer" class="ace-panel__log flex-1 overflow-y-auto p-4 space-y-3 relative z-10" aria-live="polite">
          <div v-if="messages.length === 0" class="flex items-start gap-2.5">
            <span class="ace-panel__prompt text-[10px] font-mono mt-1 shrink-0">ACE ›</span>
            <div class="ace-msg ace-msg--ace rounded-xl px-3.5 py-2.5 text-xs font-mono leading-relaxed">
              {{ apiConnected
                ? 'Ace here. Ask me anything about Eyu\'s work, stack, or background. What\'s your query?'
                : 'ACE is offline — API key not configured. Set GOOGLE_AI_API_KEY in your .env file to activate.' }}
            </div>
          </div>

          <div v-for="(msg, i) in messages" :key="i" class="flex items-start gap-2.5" :class="msg.role === 'user' ? 'justify-end' : ''">
            <span v-if="msg.role !== 'user'" class="ace-panel__prompt text-[10px] font-mono mt-1 shrink-0">ACE ›</span>
            <div
              class="ace-msg font-mono text-xs max-w-[85%] leading-relaxed px-3.5 py-2.5 rounded-xl"
              :class="msg.role === 'user' ? 'ace-msg--user rounded-br-md' : 'ace-msg--ace rounded-bl-md'"
            >
              {{ msg.content }}
            </div>
          </div>

          <div v-if="loading" class="flex items-start gap-2.5">
            <span class="ace-panel__prompt text-[10px] font-mono mt-1 shrink-0">ACE ›</span>
            <div class="ace-msg ace-msg--ace ace-msg--pending rounded-xl px-3.5 py-2.5 text-xs font-mono animate-pulse">
              PROCESSING ···
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="ace-panel__footer flex items-center gap-2 p-3.5 relative z-10">
          <input
            v-model="userInput"
            @keydown.enter="sendMessage"
            :disabled="loading || !apiConnected"
            placeholder="Query ACE..."
            maxlength="1000"
            aria-label="Message ACE"
            class="ace-panel__input flex-1 rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none transition-colors duration-200"
          />
          <button
            type="button"
            @click="sendMessage"
            :disabled="loading || !userInput.trim()"
            class="ace-panel__send shrink-0 whitespace-nowrap px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono disabled:opacity-30 transition-colors duration-200"
          >
            SEND ›
          </button>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<script setup>
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from 'vue';
import { useSystemsOnline } from '~/composables/useSystemsOnline';

const { systemsOnline, hudModuleClass } = useSystemsOnline();
const navHudClass = hudModuleClass();

const isOpen = ref(false);
const userInput = ref('');
const messages = ref([]);
const loading = ref(false);
const messagesContainer = ref(null);
const apiConnected = ref(true);

// Close chat if HUD powers down
watch(systemsOnline, (online) => {
  if (!online) isOpen.value = false;
});

// Interactive robot look / tilt (CSS vars on the pill)
const pillRef = ref(null);
const isHoveringPill = ref(false);
const lookX = ref(0); // -1 … 1
const lookY = ref(0);

const pillStyle = computed(() => ({
  '--ace-look-x': String(lookX.value),
  '--ace-look-y': String(lookY.value),
  '--ace-tilt-x': `${lookX.value * 8}deg`,
  '--ace-tilt-y': `${-lookY.value * 6}deg`,
  '--ace-pupil-x': `${lookX.value * 1.4}px`,
  '--ace-pupil-y': `${lookY.value * 1.1}px`,
}));

// Pause the robot's idle loops when the pill is parked (HUD offline) or off-screen
const pillOnScreen = ref(true);
const botPaused = computed(() => !systemsOnline.value || !pillOnScreen.value);
let pillObserver = null;

watch(pillRef, (el) => {
  pillObserver?.disconnect();
  pillObserver = null;
  if (!el || typeof IntersectionObserver === 'undefined') return;
  pillObserver = new IntersectionObserver(([entry]) => {
    pillOnScreen.value = entry.isIntersecting;
  });
  pillObserver.observe(el);
});

onBeforeUnmount(() => {
  pillObserver?.disconnect();
  pillObserver = null;
});

const onPillPointer = (e) => {
  const el = pillRef.value;
  if (!el) return;
  const r = el.getBoundingClientRect();
  const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
  const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
  lookX.value = Math.max(-1, Math.min(1, nx));
  lookY.value = Math.max(-1, Math.min(1, ny));
};

const onPillEnter = () => {
  isHoveringPill.value = true;
};

const onPillLeave = () => {
  isHoveringPill.value = false;
  lookX.value = 0;
  lookY.value = 0;
};

onMounted(async () => {
  try {
    const data = await $fetch('/api/chat-status');
    apiConnected.value = data.connected;
  } catch {
    apiConnected.value = false;
  }
});

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

watch(messages, scrollToBottom, { deep: true });

const sendMessage = async () => {
  const text = userInput.value.trim();
  if (!text || loading.value) return;

  const history = messages.value.slice(-6).map(({ role, content }) => ({ role, content }));
  messages.value.push({ role: 'user', content: text });
  userInput.value = '';
  loading.value = true;

  try {
    const data = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        message: text,
        history,
      },
    });

    messages.value.push({ role: 'assistant', content: data.reply });
  } catch {
    messages.value.push({ role: 'assistant', content: 'NAVIGATOR offline. Try the COMMS section.' });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* ── Chat panel, themed through --ap-* variables ─────────
 * Default = dark HUD. Night vision overrides these in assets/css/main.css
 * (html.dark), light mode in assets/css/light.css (html.light). */
.ace-panel {
  --ap-bg: #060a0f;
  --ap-edge: rgba(0, 212, 255, 0.15);
  --ap-divider: rgba(0, 212, 255, 0.12);
  --ap-accent: #00d4ff;
  --ap-accent-soft: rgba(0, 212, 255, 0.08);
  --ap-on-accent: #060a0f;
  --ap-text: #ddeeff;
  --ap-muted: rgba(0, 212, 255, 0.4);
  --ap-ace-bg: rgba(0, 212, 255, 0.06);
  --ap-ace-edge: rgba(0, 212, 255, 0.15);
  --ap-ace-text: #00d4ff;
  --ap-user-bg: rgba(124, 252, 0, 0.08);
  --ap-user-edge: rgba(124, 252, 0, 0.15);
  --ap-user-text: #7cfc00;
  --ap-input-bg: rgba(255, 255, 255, 0.03);
  --ap-shadow: 0 0 60px rgba(0, 212, 255, 0.04);

  background:
    linear-gradient(to bottom, var(--ap-accent-soft), transparent 8rem),
    var(--ap-bg);
  border: 1px solid var(--ap-edge);
  box-shadow: var(--ap-shadow);
  color: var(--ap-text);
}
.ace-panel__header { border-bottom: 1px solid var(--ap-divider); }
.ace-panel__footer { border-top: 1px solid var(--ap-divider); }
.ace-panel__avatar {
  color: var(--ap-accent);
  background: var(--ap-accent-soft);
  border: 1px solid var(--ap-edge);
}
.ace-panel__dot { box-shadow: 0 0 0 2px var(--ap-bg); }
.ace-panel__dot--on { background: var(--ap-accent); }
.ace-panel__name { color: var(--ap-text); }
.ace-panel__badge { background: var(--ap-accent-soft); color: var(--ap-accent); }
.ace-panel__sub,
.ace-panel__prompt { color: var(--ap-muted); }
.ace-panel__close { color: var(--ap-muted); }
.ace-panel__close:hover { color: var(--ap-text); background: var(--ap-accent-soft); }
.ace-msg--ace {
  background: var(--ap-ace-bg);
  border: 1px solid var(--ap-ace-edge);
  color: var(--ap-ace-text);
}
.ace-msg--user {
  background: var(--ap-user-bg);
  border: 1px solid var(--ap-user-edge);
  color: var(--ap-user-text);
}
.ace-msg--pending { opacity: 0.7; }
.ace-panel__input {
  background: var(--ap-input-bg);
  border: 1px solid var(--ap-divider);
  color: var(--ap-text);
  caret-color: var(--ap-accent);
}
.ace-panel__input::placeholder { color: var(--ap-muted); opacity: 0.6; }
.ace-panel__input:focus { border-color: var(--ap-accent); }
.ace-panel__send { background: var(--ap-accent); color: var(--ap-on-accent); }
.ace-panel__send:hover:not(:disabled) { filter: brightness(1.08); }
.ace-panel__close:focus-visible,
.ace-panel__send:focus-visible {
  outline: 2px solid var(--ap-accent);
  outline-offset: 2px;
}

.navigator-slide-enter-active {
  transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.navigator-slide-leave-active {
  transition: opacity 0.2s cubic-bezier(0.55, 0, 1, 0.45), transform 0.2s cubic-bezier(0.55, 0, 1, 0.45);
}
.navigator-slide-enter-from,
.navigator-slide-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}

/* ── ACE pill ─────────────────────────────────────────── */
.ace-pill {
  overflow: visible; /* allow wave arm to peek past pill edge */
}
.ace-pill--active {
  border-color: rgba(0, 212, 255, 0.45);
  background: #070d14;
}
/* Hover glow lives on a pre-shadowed layer; only its opacity transitions */
.ace-pill::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  box-shadow: 0 0 32px rgba(0, 212, 255, 0.14);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.ace-pill:hover::after,
.ace-pill--active::after {
  opacity: 1;
}

/* ── ACE robot ────────────────────────────────────────── */
.ace-bot-wrap {
  position: relative;
  display: block;
  width: var(--ace-size);
  height: var(--ace-size);
}
.ace-bot-wrap > .ace-bot {
  width: 100%;
  height: 100%;
}
/* Round badge at rest; the ACE label slides out on hover / when open */
.ace-pill {
  --ace-size: 44px;
  height: var(--ace-size);
}
@media (min-width: 640px) {
  .ace-pill { --ace-size: 56px; }
}
.ace-status-badge {
  position: absolute;
  top: 3px;
  right: 3px;
  box-shadow: 0 0 0 2px #060A0F;
}
.ace-label {
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, padding 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.group:hover .ace-label,
.ace-pill--active .ace-label {
  max-width: 64px;
  opacity: 1;
  padding: 0 6px 0 18px;
}
.ace-bot {
  position: relative;
  overflow: visible;
  /* own layer: the SVG's per-frame repaints don't touch the pill */
  will-change: transform;
}
.ace-bot-halo {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 45%,
    rgba(0, 212, 255, 0.3) 0%,
    rgba(0, 212, 255, 0.12) 38%,
    rgba(0, 212, 255, 0) 68%
  );
  opacity: 0.6;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.group:hover .ace-bot-halo,
.ace-pill--active .ace-bot-halo {
  opacity: 1;
}

/* Idle bob + interactive tilt from pointer (individual transform props so they compose) */
.ace-bot-root {
  transform-box: fill-box;
  transform-origin: center 70%;
  rotate: var(--ace-tilt-x, 0deg);
  animation: ace-bob 3.2s ease-in-out infinite;
  /* springy overshoot so the tilt feels physical, not linear */
  transition: rotate 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.group:hover .ace-bot-root,
.ace-pill--active .ace-bot-root {
  animation: ace-bob-excited 1.6s ease-in-out infinite;
}

/* Head looks toward pointer */
.ace-bot-head {
  transform-box: view-box;
  transform-origin: 28px 28px;
  translate: calc(var(--ace-look-x, 0) * 2.2px) calc(var(--ace-look-y, 0) * 1.6px);
  /* head lags the body slightly: secondary motion */
  transition: translate 0.38s cubic-bezier(0.34, 1.4, 0.64, 1) 0.04s;
}

/* Pupils track pointer */
.ace-bot-pupil {
  transform-box: fill-box;
  transform-origin: center;
  translate: var(--ace-pupil-x, 0px) var(--ace-pupil-y, 0px);
  transition: translate 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Blink — squash eyes on Y */
.ace-bot-eye {
  transform-box: fill-box;
  transform-origin: center;
  animation: ace-blink 5.6s ease-in-out infinite;
  transition: scale 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
/* Happy eyes on hover: squint into a smile instead of blinking */
.group:hover .ace-bot-eye,
.ace-pill--active .ace-bot-eye {
  animation: none;
  scale: 1 0.45;
}
.ace-bot-eye-r {
  animation-delay: 0.08s;
}

/* Wave arm — shoulder pivot ~ (43.5, 30) */
.ace-bot-arm-right {
  transform-box: view-box;
  transform-origin: 43.5px 30px;
  /* occasional greeting wave, then rest — constant waving read as busy */
  animation: ace-wave 7s cubic-bezier(0.37, 0, 0.63, 1) infinite;
}
.group:hover .ace-bot-arm-right,
.ace-pill--active .ace-bot-arm-right {
  animation: ace-wave-fast 0.9s ease-in-out infinite;
}

.ace-bot-hand {
  transform-box: fill-box;
  transform-origin: center;
  animation: ace-hand-wiggle-idle 7s ease-in-out infinite;
}
.group:hover .ace-bot-hand,
.ace-pill--active .ace-bot-hand {
  animation: ace-hand-wiggle 0.9s ease-in-out infinite;
}

/* Left arm gentle sway */
.ace-bot-arm-left {
  transform-box: view-box;
  transform-origin: 12.5px 30px;
  animation: ace-arm-sway 3.6s ease-in-out infinite;
}

/* Antenna + signal */
.ace-bot-antenna {
  transform-box: view-box;
  transform-origin: 28px 12px;
  animation: ace-antenna-sway 2.4s ease-in-out infinite;
}
.ace-bot-signal {
  transform-origin: center;
  transform-box: fill-box;
  animation: ace-signal 1.8s ease-in-out infinite;
}
.ace-bot-ring {
  transform-origin: center;
  transform-box: fill-box;
  animation: ace-ring 2.4s ease-out infinite;
}
.ace-bot-mouth {
  transform-box: fill-box;
  transform-origin: center;
  animation: ace-mouth 3.2s ease-in-out infinite;
  transition: scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.group:hover .ace-bot-mouth,
.ace-pill--active .ace-bot-mouth {
  scale: 1.3 1.15;
}
.ace-bot-scan {
  animation: ace-scan 5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
/* Press: quick squish on the whole bot */
.ace-bot-wrap {
  transition: scale 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ace-pill:active .ace-bot-wrap {
  scale: 0.9;
  transition-duration: 0.08s;
}
/* Thinking (waiting on a reply): antenna, visor and mouth speed up */
.ace-pill--thinking .ace-bot-signal { animation-duration: 0.5s; }
.ace-pill--thinking .ace-bot-ring { animation-duration: 0.9s; }
.ace-pill--thinking .ace-bot-scan { animation-duration: 1.1s; }
.ace-pill--thinking .ace-bot-mouth { animation: ace-mouth 0.35s ease-in-out infinite; }
.ace-bot-led {
  animation: ace-led 2s ease-in-out infinite;
}
.ace-status-pulse {
  position: relative;
  box-shadow: 0 0 6px rgba(0, 212, 255, 0.5);
  animation: ace-status 1.8s ease-in-out infinite;
}
/* Stronger glow pre-baked on a pseudo layer; pulse only its opacity */
.ace-status-pulse::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.9);
  opacity: 0;
  animation: ace-status-glow 1.8s ease-in-out infinite;
}

/* Idle loops freeze while the pill is parked or off-screen */
.ace-pill--paused .ace-bot *,
.ace-pill--paused .ace-status-pulse,
.ace-pill--paused .ace-status-pulse::after {
  animation-play-state: paused !important;
}

/* ── Keyframes ────────────────────────────────────────── */
/* Bob with squash & stretch: compress at the bottom, stretch on the rise */
@keyframes ace-bob {
  0%, 100% { translate: 0 0; scale: 1.02 0.98; }
  45% { translate: 0 -1.8px; scale: 0.99 1.01; }
  55% { translate: 0 -1.8px; scale: 1 1; }
}
@keyframes ace-bob-excited {
  0%, 100% { translate: 0 0; scale: 1.04 0.96; }
  40% { translate: 0 -3.5px; scale: 0.97 1.03; }
  60% { translate: 0 -3px; scale: 1 1; }
}
/* Single blink, then a quick double blink later in the cycle */
@keyframes ace-blink {
  0%, 38%, 44%, 82%, 86%, 90%, 100% { scale: 1 1; }
  41% { scale: 1 0.08; }
  84% { scale: 1 0.1; }
  88% { scale: 1 0.1; }
}
@keyframes ace-wave {
  0% { rotate: 0deg; }
  4% { rotate: -34deg; }
  8% { rotate: 6deg; }
  12% { rotate: -30deg; }
  16% { rotate: 4deg; }
  21%, 100% { rotate: 0deg; }
}
@keyframes ace-hand-wiggle-idle {
  0%, 21%, 100% { rotate: 0deg; }
  6% { rotate: 14deg; }
  10% { rotate: -10deg; }
  14% { rotate: 12deg; }
}
@keyframes ace-scan {
  0%, 55% { translate: 0 0; opacity: 0; }
  60% { opacity: 1; }
  80% { translate: 30px 0; opacity: 1; }
  82%, 100% { translate: 30px 0; opacity: 0; }
}
@keyframes ace-wave-fast {
  0%, 100% { rotate: -8deg; }
  50% { rotate: -38deg; }
}
@keyframes ace-hand-wiggle {
  0%, 100% { rotate: 0deg; }
  25% { rotate: 12deg; }
  50% { rotate: -8deg; }
  75% { rotate: 10deg; }
}
@keyframes ace-arm-sway {
  0%, 100% { rotate: 0deg; }
  50% { rotate: 6deg; }
}
@keyframes ace-antenna-sway {
  0%, 100% { rotate: -3deg; }
  50% { rotate: 4deg; }
}
@keyframes ace-signal {
  0%, 100% { opacity: 0.7; scale: 1; }
  50% { opacity: 1; scale: 1.25; }
}
@keyframes ace-ring {
  0% { opacity: 0.45; scale: 0.85; }
  70% { opacity: 0; scale: 1.6; }
  100% { opacity: 0; scale: 1.6; }
}
@keyframes ace-mouth {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}
@keyframes ace-led {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}
@keyframes ace-status {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
}
@keyframes ace-status-glow {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

/* Prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ace-bot-root,
  .ace-bot-eye,
  .ace-bot-arm-right,
  .ace-bot-arm-left,
  .ace-bot-hand,
  .ace-bot-antenna,
  .ace-bot-signal,
  .ace-bot-ring,
  .ace-bot-mouth,
  .ace-bot-led,
  .ace-bot-scan,
  .ace-status-pulse,
  .ace-status-pulse::after {
    animation: none !important;
  }
}

::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(123, 230, 219, 0.15);
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(123, 230, 219, 0.3);
}
</style>
