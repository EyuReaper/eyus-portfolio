<template>
  <ClientOnly>
    <!-- ACE trigger pill -->
    <button
      @click="isOpen = !isOpen"
      class="group fixed bottom-36 left-5 z-[10005] h-12 border border-[rgba(0,212,255,0.2)] bg-[#060A0F] flex items-center hover:border-[rgba(0,212,255,0.35)] transition-all duration-300 overflow-hidden cursor-pointer rounded-r-full rounded-l-md shadow-[0_0_20px_rgba(0,212,255,0.05)] hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] "
      aria-label="Toggle ACE"
    >
      <div class="flex items-center gap-2.5 pl-3 pr-3.5">
        <!-- Robot icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-[#00D4FF]/90 shrink-0 drop-shadow-[0_0_6px_rgba(0,212,255,0.3)]">
          <rect x="3" y="4" width="18" height="14" rx="3"/>
          <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
          <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
          <rect x="7" y="13" width="10" height="5" rx="1" fill="currentColor" fill-opacity="0.15"/>
          <path d="M8 4V2M16 4V2"/>
          <path d="M6 18v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2"/>
          <path d="M1 9v4a1 1 0 0 0 1 1h1"/>
          <path d="M23 9v4a1 1 0 0 1-1 1h-1"/>
        </svg>

        <!-- Status dot -->
        <span
          class="w-1.5 h-1.5 rounded-full shrink-0"
          :class="apiConnected ? 'bg-[#00D4FF] shadow-[0_0_6px_rgba(0,212,255,0.6)]' : 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]'"
        ></span>

        <!-- Label -->
        <span class="font-mono text-[11px] tracking-[0.15em] text-[#00D4FF]/70 whitespace-nowrap max-w-0 group-hover:max-w-[60px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden font-semibold">
          ACE
        </span>
      </div>
    </button>

    <!-- Chat Panel -->
    <Transition name="navigator-slide">
      <div
        v-if="isOpen"
        class="fixed bottom-[192px] left-5 z-[10015] w-80 h-[540px] rounded-2xl flex flex-col overflow-hidden border border-[rgba(0,212,255,0.15)] shadow-[0_0_60px_rgba(0,212,255,0.04)]"
        style="background: #060A0F; backdrop-filter: blur(28px);"
      >
        <!-- Gradient top glow -->
        <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[rgba(0,212,255,0.03)] to-transparent pointer-events-none"></div>

        <!-- Header -->
        <div class="flex items-center gap-2.5 px-4 py-3.5 border-b border-[rgba(0,212,255,0.12)] relative z-10">
          <!-- Avatar dot -->
          <div class="relative">
            <div class="w-7 h-7 rounded-full bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-[#00D4FF]/70">
                <rect x="3" y="4" width="18" height="14" rx="3"/>
                <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
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
import { ref, nextTick, watch, onMounted } from 'vue';

const isOpen = ref(false);
const userInput = ref('');
const messages = ref([]);
const loading = ref(false);
const messagesContainer = ref(null);
const apiConnected = ref(true);

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
