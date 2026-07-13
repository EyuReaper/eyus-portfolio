<template>
  <ClientOnly>
    <!-- ACE trigger pill -->
    <button
      ref="pillRef"
      @click="isOpen = !isOpen"
      @pointermove="onPillPointer"
      @pointerenter="onPillEnter"
      @pointerleave="onPillLeave"
      class="hud-module hud-from-left group ace-pill fixed bottom-36 left-5 z-[10005] h-14 border border-[rgba(0,212,255,0.2)] bg-[#060A0F] flex items-center hover:border-[rgba(0,212,255,0.4)] transition-[border-color,box-shadow,background] duration-300 cursor-pointer rounded-r-full rounded-l-xl shadow-[0_0_20px_rgba(0,212,255,0.05)] hover:shadow-[0_0_32px_rgba(0,212,255,0.14)]"
      :class="[navHudClass, { 'ace-pill--active': isHoveringPill || isOpen }]"
      :style="{ ...pillStyle, '--hud-delay': '0.45s' }"
      aria-label="Toggle ACE"
    >
      <div class="flex items-center gap-3 pl-3.5 pr-4">
        <!-- Robot — blinks, waves, tracks pointer -->
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

        <!-- Status dot -->
        <span
          class="w-2 h-2 rounded-full shrink-0"
          :class="apiConnected ? 'bg-[#00D4FF] shadow-[0_0_8px_rgba(0,212,255,0.7)] ace-status-pulse' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'"
        ></span>

        <!-- Label -->
        <span class="font-mono text-xs tracking-[0.15em] text-[#00D4FF]/75 whitespace-nowrap max-w-0 group-hover:max-w-[72px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden font-semibold">
          ACE
        </span>
      </div>
    </button>

    <!-- Chat Panel -->
    <Transition name="navigator-slide">
      <div
        v-if="isOpen"
        class="fixed bottom-[200px] left-5 z-[10015] w-80 h-[540px] rounded-2xl flex flex-col overflow-hidden border border-[rgba(0,212,255,0.15)] shadow-[0_0_60px_rgba(0,212,255,0.04)]"
        style="background: #060A0F; backdrop-filter: blur(28px);"
      >
        <!-- Gradient top glow -->
        <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[rgba(0,212,255,0.03)] to-transparent pointer-events-none"></div>

        <!-- Header -->
        <div class="flex items-center gap-2.5 px-4 py-3.5 border-b border-[rgba(0,212,255,0.12)] relative z-10">
          <!-- Avatar dot -->
          <div class="relative">
            <div class="w-7 h-7 rounded-full bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 40 40"
                fill="none"
                class="text-[#00D4FF]/85"
                aria-hidden="true"
              >
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
              class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ring-[#060A0F]"
              :class="apiConnected ? 'bg-[#00D4FF] shadow-[0_0_6px_rgba(0,212,255,0.6)]' : 'bg-red-500'"
            ></span>
          </div>

          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs tracking-[0.12em] text-[#DDEEFF] font-semibold">ACE</span>
              <span
                class="text-[9px] uppercase font-mono tracking-[0.1em] px-1.5 py-0.5 rounded"
                :class="apiConnected ? 'bg-[rgba(0,212,255,0.1)] text-[#00D4FF]/70' : 'bg-red-500/10 text-red-400/70'"
              >
                {{ apiConnected ? 'ONLINE' : 'OFFLINE' }}
              </span>
            </div>
            <span class="text-[8px] font-mono text-[#00D4FF]/30 tracking-[0.12em]">NAVIGATOR v2.0</span>
          </div>

          <button @click="isOpen = false" class="ml-auto w-6 h-6 rounded-full flex items-center justify-center text-[#DDEEFF]/30 hover:text-[#DDEEFF]/60 hover:bg-[rgba(0,212,255,0.1)] transition-all duration-200 text-sm">✕</button>
        </div>

        <!-- Messages -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-3 relative z-10">
          <!-- Welcome -->
          <div v-if="messages.length === 0" class="flex items-start gap-2.5">
            <span class="text-[10px] text-[#00D4FF]/40 font-mono mt-1 shrink-0">ACE ›</span>
            <div class="bg-[rgba(0,212,255,0.04)] border border-[rgba(0,212,255,0.1)] rounded-xl px-3.5 py-2.5 text-xs text-[#DDEEFF]/80 font-mono leading-relaxed">
              {{ apiConnected
                ? 'Ace here. Ask me anything about Eyu\'s work, stack, or background. What\'s your query?'
                : 'ACE is offline — API key not configured. Set GOOGLE_AI_API_KEY in your .env file to activate.' }}
            </div>
          </div>

          <div v-for="(msg, i) in messages" :key="i" class="flex items-start gap-2.5" :class="msg.role === 'user' ? 'justify-end' : ''">
            <template v-if="msg.role !== 'user'">
              <span class="text-[10px] text-[#00D4FF]/40 font-mono mt-1 shrink-0">ACE ›</span>
            </template>
            <div
              class="font-mono text-xs max-w-[85%] leading-relaxed px-3.5 py-2.5"
              :class="msg.role === 'user'
                ? 'bg-[rgba(124,252,0,0.08)] border border-[rgba(124,252,0,0.15)] text-[#7CFC00] rounded-xl rounded-br-md'
                : 'bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.15)] text-[#00D4FF] rounded-xl rounded-bl-md'"
            >
              {{ msg.content }}
            </div>
          </div>

          <div v-if="loading" class="flex items-start gap-2.5">
            <span class="text-[10px] text-[#00D4FF]/40 font-mono mt-1 shrink-0">ACE ›</span>
            <div class="bg-[rgba(0,212,255,0.04)] border border-[rgba(0,212,255,0.1)] rounded-xl px-3.5 py-2.5 text-xs text-[#00D4FF]/60 font-mono animate-pulse">
              PROCESSING ···
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="flex items-center gap-2 p-3.5 border-t border-[rgba(0,212,255,0.12)] relative z-10">
          <input
            v-model="userInput"
            @keydown.enter="sendMessage"
            :disabled="loading || !apiConnected"
            placeholder="Query ACE..."
            class="flex-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(0,212,255,0.12)] focus:border-[rgba(0,212,255,0.3)] rounded-xl px-3.5 py-2.5 text-xs text-[#DDEEFF]/80 font-mono outline-none placeholder:text-[#DDEEFF]/15 transition-all duration-200"
          />
          <button
            @click="sendMessage"
            :disabled="loading || !userInput.trim()"
            class="bg-[#00D4FF] text-[#060A0F] px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono hover:bg-[#00D4FF]/90 disabled:opacity-30 transition-all duration-200 shadow-[0_0_20px_rgba(0,212,255,0.15)]"
          >
            SEND ›
          </button>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<script setup>
import { ref, computed, nextTick, watch, onMounted } from 'vue';
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

  messages.value.push({ role: 'user', content: text });
  userInput.value = '';
  loading.value = true;

  try {
    const data = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        message: text,
        history: messages.value.slice(-6),
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
.navigator-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.navigator-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 1, 0.45);
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

/* ── ACE robot ────────────────────────────────────────── */
.ace-bot {
  overflow: visible;
  filter: drop-shadow(0 0 7px rgba(0, 212, 255, 0.4));
  transition: filter 0.3s ease;
}
.group:hover .ace-bot,
.ace-pill--active .ace-bot {
  filter: drop-shadow(0 0 12px rgba(0, 212, 255, 0.65));
}

/* Idle bob + interactive tilt from pointer (individual transform props so they compose) */
.ace-bot-root {
  transform-box: fill-box;
  transform-origin: center 70%;
  rotate: var(--ace-tilt-x, 0deg);
  animation: ace-bob 3.2s ease-in-out infinite;
  transition: rotate 0.12s ease-out;
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
  transition: translate 0.14s ease-out;
}

/* Pupils track pointer */
.ace-bot-pupil {
  transform-box: fill-box;
  transform-origin: center;
  translate: var(--ace-pupil-x, 0px) var(--ace-pupil-y, 0px);
  transition: translate 0.1s ease-out;
}

/* Blink — squash eyes on Y */
.ace-bot-eye {
  transform-box: fill-box;
  transform-origin: center;
  animation: ace-blink 4.2s ease-in-out infinite;
}
.ace-bot-eye-r {
  animation-delay: 0.08s;
}

/* Wave arm — shoulder pivot ~ (43.5, 30) */
.ace-bot-arm-right {
  transform-box: view-box;
  transform-origin: 43.5px 30px;
  animation: ace-wave 2.8s ease-in-out infinite;
}
.group:hover .ace-bot-arm-right,
.ace-pill--active .ace-bot-arm-right {
  animation: ace-wave-fast 0.9s ease-in-out infinite;
}

.ace-bot-hand {
  transform-box: fill-box;
  transform-origin: center;
  animation: ace-hand-wiggle 2.8s ease-in-out infinite;
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
  animation: ace-mouth 3.2s ease-in-out infinite;
}
.ace-bot-led {
  animation: ace-led 2s ease-in-out infinite;
}
.ace-status-pulse {
  animation: ace-status 1.8s ease-in-out infinite;
}

/* ── Keyframes ────────────────────────────────────────── */
@keyframes ace-bob {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -1.5px; }
}
@keyframes ace-bob-excited {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -2.5px; }
}
@keyframes ace-blink {
  0%, 42%, 48%, 100% { scale: 1 1; }
  45% { scale: 1 0.08; }
}
@keyframes ace-wave {
  0%, 100% { rotate: 0deg; }
  15% { rotate: -28deg; }
  30% { rotate: 12deg; }
  45% { rotate: -32deg; }
  60% { rotate: 8deg; }
  75%, 100% { rotate: 0deg; }
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
  0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(0, 212, 255, 0.5); }
  50% { opacity: 0.55; box-shadow: 0 0 12px rgba(0, 212, 255, 0.9); }
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
  .ace-status-pulse {
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
