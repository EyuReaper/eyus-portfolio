<template>
  <Teleport to="body">
    <div
      v-if="visible"
      :key="bootGeneration"
      class="hud-boot-overlay"
      :style="{ '--hud-boot-duration': `${visibleDurationMs}ms` }"
      aria-hidden="true"
    >
      <div class="hud-boot-grid"></div>
      <div class="hud-boot-scan"></div>

      <span class="hud-boot-corner hud-boot-corner--tl"></span>
      <span class="hud-boot-corner hud-boot-corner--tr"></span>
      <span class="hud-boot-corner hud-boot-corner--bl"></span>
      <span class="hud-boot-corner hud-boot-corner--br"></span>

      <div class="hud-boot-center">
        <p class="hud-boot-title">SYSTEMS ONLINE</p>
        <div class="hud-boot-bar"><span></span></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useTimeoutFn, usePreferredReducedMotion } from '@vueuse/core'
import { useSystemsOnline, HUD_BOOT_FADE_MS } from '~/composables/useSystemsOnline'

// Just long enough to swap the (already invisible) overlay out of the DOM.
const REDUCED_MOTION_VISIBLE_MS = 50

const { isBooting, bootGeneration, systemsOnline } = useSystemsOnline()
const visible = ref(false)

const reducedMotion = usePreferredReducedMotion()
const visibleDurationMs = computed(() =>
  reducedMotion.value === 'reduce' ? REDUCED_MOTION_VISIBLE_MS : HUD_BOOT_FADE_MS,
)

const { start: startHideTimer } = useTimeoutFn(
  () => {
    visible.value = false
  },
  visibleDurationMs,
  { immediate: false },
)

// Watch both refs: systemsOnline flips true on a deferred rAF tick after
// isBooting flips true, so relying on isBooting alone can fire before
// systemsOnline catches up and skip showing the overlay entirely.
watch(
  [isBooting, systemsOnline],
  ([booting, online]) => {
    if (booting && online) {
      visible.value = true
      startHideTimer()
    }
  },
  { immediate: true },
)
</script>
