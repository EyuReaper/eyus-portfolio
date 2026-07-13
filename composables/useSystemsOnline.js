import { ref, readonly, computed, unref } from 'vue'

/**
 * Shared "Iron Man HUD" systems state.
 * Engage Comms → modules drop online in sequence.
 * Power Off → HUD powers down again.
 */
const systemsOnline = ref(false)
const isBooting = ref(false)
const bootGeneration = ref(0)

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

  // Boot FX window (matches longest staggered module + overlay)
  bootTimer = setTimeout(() => {
    isBooting.value = false
    bootTimer = null
  }, 2200)
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
