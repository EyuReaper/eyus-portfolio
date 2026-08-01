import { ref, readonly, computed, unref } from 'vue'

/**
 * Shared "Iron Man HUD" systems state.
 * Engage Comms → modules drop online in sequence.
 * Power Off → HUD powers down again.
 */
const systemsOnline = ref(false)
const isBooting = ref(false)
const bootGeneration = ref(0)

// Single source of truth for the boot-overlay fade duration.
// HudBootOverlay uses this for its hide timer and passes it to CSS
// via --hud-boot-duration, so the JS timer and the CSS animation
// (main.css .hud-boot-overlay / hud-boot-fade) can never drift apart.
export const HUD_BOOT_FADE_MS = 2100
// Boot FX window: fade duration plus a buffer for the longest
// staggered module drop-in animation.
const HUD_BOOT_WINDOW_MS = HUD_BOOT_FADE_MS + 100

let bootTimer = null

function engageSystems() {
  if (systemsOnline.value && !isBooting.value) return

  clearTimeout(bootTimer)
  isBooting.value = true
  bootGeneration.value += 1

  // Next frame so offline → online animations always re-fire
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => {
      systemsOnline.value = true
    })
  } else {
    systemsOnline.value = true
  }

  bootTimer = setTimeout(() => {
    isBooting.value = false
    bootTimer = null
  }, HUD_BOOT_WINDOW_MS)
}

function powerDownSystems() {
  clearTimeout(bootTimer)
  bootTimer = null
  isBooting.value = false
  systemsOnline.value = false
  bootGeneration.value += 1
}

/**
 * CSS class for a HUD module:
 *  - hud-offline  → hidden / parked
 *  - hud-online   → drop-in animation (during boot)
 *  - hud-live     → settled online (no animation transform lock)
 */
function hudModuleClass(extraOnline = true) {
  return computed(() => {
    const extra = unref(extraOnline)
    if (!systemsOnline.value || !extra) return 'hud-offline'
    if (isBooting.value) return 'hud-online'
    return 'hud-live'
  })
}

export function useSystemsOnline() {
  return {
    systemsOnline: readonly(systemsOnline),
    isBooting: readonly(isBooting),
    bootGeneration: readonly(bootGeneration),
    engageSystems,
    powerDownSystems,
    hudModuleClass,
  }
}
