<template>
  <div class="altitude-tape" role="status">
    <span class="altitude-tape__label">ALT</span>
    <span class="altitude-tape__value">{{ targetAltitude }}<span class="altitude-tape__unit">%</span></span>
  </div>
</template>

<script setup>
defineProps({
  targetAltitude: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.altitude-tape {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 64px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(6, 10, 15, 0.92);
  border: 1px solid rgba(52, 211, 153, 0.3);
  font-family: 'JetBrains Mono', monospace;
}
.altitude-tape__label {
  font-size: 9px;
  letter-spacing: 0.28em;
  color: rgba(167, 243, 208, 0.55);
}
.altitude-tape__value {
  font-size: 22px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #34d399;
}
.altitude-tape__unit {
  font-size: 12px;
  margin-left: 1px;
  color: rgba(52, 211, 153, 0.7);
}
</style>
