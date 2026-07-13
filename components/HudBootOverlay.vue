<template>
  <Teleport to="body">
    <div
      v-if="visible"
      :key="bootGeneration"
      class="hud-boot-overlay"
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
        <p class="hud-boot-sub">Initializing flight interfaces</p>
        <div class="hud-boot-bar"><span></span></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useSystemsOnline } from '~/composables/useSystemsOnline'

const { isBooting, bootGeneration, systemsOnline } = useSystemsOnline()
const visible = ref(false)
let hideTimer = null

watch(
  isBooting,
  (booting) => {
    if (booting && systemsOnline.value) {
      clearTimeout(hideTimer)
      visible.value = true
      // Match css fade-out end
      hideTimer = setTimeout(() => {
        visible.value = false
      }, 2100)
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  clearTimeout(hideTimer)
})
</script>
