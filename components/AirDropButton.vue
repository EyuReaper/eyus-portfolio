<template>
    <div class="flex flex-col items-center gap-6 mt-12 mb-8 group/container">
        <div class="relative p-1">
            <!-- HUD Corners (Styled like the site's dossiers) -->
            <div
                class="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-500/80 transition-all duration-500 group-hover/container:w-6 group-hover/container:h-6 group-hover/container:border-emerald-400"
            ></div>
            <div
                class="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-500/80 transition-all duration-500 group-hover/container:w-6 group-hover/container:h-6 group-hover/container:border-emerald-400"
            ></div>
            <div
                class="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-500/80 transition-all duration-500 group-hover/container:w-6 group-hover/container:h-6 group-hover/container:border-emerald-400"
            ></div>
            <div
                class="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-500/80 transition-all duration-500 group-hover/container:w-6 group-hover/container:h-6 group-hover/container:border-emerald-400"
            ></div>

            <!-- Main Button -->
            <button
                @click="initiateAirDrop"
                :disabled="state !== 'idle'"
                class="relative w-full max-w-[320px] px-8 py-5 bg-slate-900/40 border border-emerald-500/30 text-emerald-500 font-mono font-bold tracking-widest overflow-hidden transition-all duration-300 hover:bg-emerald-500/5 hover:border-emerald-500 active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed group/btn"
            >
                <!-- Glitch Effect Layers (Visible on Hover) -->
                <span
                    class="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                >
                    <span
                        class="absolute inset-0 bg-emerald-500/10 animate-pulse"
                    ></span>
                    <span
                        class="absolute top-0 left-0 w-full h-[1px] bg-emerald-400/50 animate-scan"
                    ></span>
                </span>

                <!-- Scanning Radar Effect -->
                <span
                    v-if="state === 'searching'"
                    class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
                >
                    <div
                        class="w-full h-full border-r-4 border-emerald-500/20 origin-center animate-radar-sweep"
                    ></div>
                    <div
                        class="absolute w-full h-full flex items-center justify-center"
                    >
                        <div
                            class="w-32 h-32 border border-emerald-500/20 rounded-full animate-ping"
                        ></div>
                    </div>
                </span>

                <!-- Content Area -->
                <div class="relative z-10 flex flex-col items-center gap-3">
                    <!-- Icon Stack -->
                    <div class="h-10 flex items-center justify-center">
                        <transition name="icon-pop" mode="out-in">
                            <div
                                v-if="state === 'idle'"
                                class="flex items-center gap-3"
                            >
                                <font-awesome-icon
                                    :icon="['fas', 'parachute-box']"
                                    class="text-2xl group-hover/btn:scale-110 transition-transform"
                                />
                                <span
                                    class="w-[1px] h-6 bg-emerald-500/30"
                                ></span>
                                <font-awesome-icon
                                    :icon="['fas', 'share-from-square']"
                                    class="text-lg opacity-70"
                                />
                            </div>

                            <div
                                v-else-if="state === 'searching'"
                                class="relative"
                            >
                                <font-awesome-icon
                                    :icon="['fas', 'spinner']"
                                    class="text-2xl animate-spin text-sky-400"
                                />
                                <div
                                    class="absolute -top-4 -left-4 w-12 h-12 border border-sky-400/30 rounded-full animate-ping"
                                ></div>
                            </div>

                            <div
                                v-else-if="state === 'sending'"
                                class="animate-drop-sway"
                            >
                                <font-awesome-icon
                                    :icon="['fas', 'parachute-box']"
                                    class="text-3xl text-emerald-400"
                                />
                            </div>

                            <div v-else class="flex flex-col items-center">
                                <font-awesome-icon
                                    :icon="['fas', 'check']"
                                    class="text-2xl text-emerald-500 animate-success-pop"
                                />
                            </div>
                        </transition>
                    </div>

                    <!-- Text Label -->
                    <div class="flex flex-col items-center">
                        <span
                            class="text-sm transition-all group-hover/btn:tracking-[0.25em]"
                        >
                            {{ buttonLabel }}
                        </span>
                        <div class="flex gap-1 mt-1">
                            <div
                                v-for="i in 3"
                                :key="i"
                                class="w-1.5 h-1 transition-all duration-500"
                                :class="[
                                    state === 'idle'
                                        ? 'bg-emerald-500/20'
                                        : state === 'completed'
                                          ? 'bg-emerald-500'
                                          : 'bg-emerald-500 animate-pulse',
                                ]"
                                :style="{ animationDelay: i * 150 + 'ms' }"
                            ></div>
                        </div>
                    </div>
                </div>

                <!-- Progress Bar Background -->
                <div
                    v-if="state === 'sending'"
                    class="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-[2000ms]"
                    :style="{ width: uploadProgress + '%' }"
                ></div>
            </button>
        </div>

        <!-- Status Detail Subtext -->
        <div
            class="h-4 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.3em]"
        >
            <transition name="fade">
                <p v-if="state !== 'idle'" class="text-emerald-400/80">
                    <span class="text-emerald-300">>></span> {{ statusMessage }}
                </p>
                <p
                    v-else
                    class="text-emerald-500/40 opacity-0 group-hover/container:opacity-100 transition-opacity"
                >
                    Ready for manual deployment
                </p>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const state = ref("idle"); // idle | searching | sending | completed
const uploadProgress = ref(0);

const buttonLabel = computed(() => {
    switch (state.value) {
        case "searching":
            return "UPLINK SEARCHING";
        case "sending":
            return "DROPPING PAYLOAD";
        case "completed":
            return "PAYLOAD DELIVERED";
        default:
            return "REQUEST AIR DROP";
    }
});

const statusMessage = computed(() => {
    if (state.value === "searching") return "Scanning local airspace...";
    if (state.value === "sending") return "Deploying encrypted CV...";
    if (state.value === "completed") return "Package confirmed received.";
    return "";
});

const playSound = (file) => {
    const audio = new Audio(`/assets/${file}`);
    audio.volume = 0.4;
    audio.play().catch(() => {});
};

const initiateAirDrop = () => {
    state.value = "searching";
    playSound("Splinter_Cell_Sfx.wav"); // Start scanning sound

    setTimeout(() => {
        state.value = "sending";
        // Animate progress bar
        let interval = setInterval(() => {
            uploadProgress.value += 5;
            if (uploadProgress.value >= 100) clearInterval(interval);
        }, 100);

        setTimeout(() => {
            const link = document.createElement("a");
            link.href = "/EYUEL_CV.pdf";
            link.download = "EYUEL_GETACHEW_CV.pdf";
            link.click();

            state.value = "completed";
            playSound("uicomplete.wav"); // Sound triggers when payload 'lands'
            uploadProgress.value = 0;

            setTimeout(() => {
                state.value = "idle";
            }, 4000);
        }, 2000);
    }, 2500);
};
</script>

<style scoped>
@keyframes scan {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(64px);
    }
}

@keyframes radar-sweep {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes drop-sway {
    0% {
        transform: translateY(-20px) rotate(-10deg);
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    50% {
        transform: translateY(0px) rotate(10deg);
    }
    100% {
        transform: translateY(20px) rotate(-10deg);
        opacity: 0;
    }
}

@keyframes success-pop {
    0% {
        transform: scale(0);
    }
    70% {
        transform: scale(1.4);
    }
    100% {
        transform: scale(1);
    }
}

.animate-scan {
    animation: scan 2s linear infinite;
}

.animate-radar-sweep {
    animation: radar-sweep 3s linear infinite;
    background: conic-gradient(
        from 0deg,
        transparent 80%,
        rgba(16, 185, 129, 0.2) 100%
    );
}

.animate-drop-sway {
    animation: drop-sway 2s ease-in-out infinite;
}

.animate-success-pop {
    animation: success-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.icon-pop-enter-active,
.icon-pop-leave-active {
    transition: all 0.3s ease;
}

.icon-pop-enter-from {
    opacity: 0;
    transform: scale(0.5) translateY(10px);
}

.icon-pop-leave-to {
    opacity: 0;
    transform: scale(1.5);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
