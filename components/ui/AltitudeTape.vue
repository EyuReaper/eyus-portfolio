<template>
  <div class="altitude-tape">
    <p>Altitude: {{ targetAltitude }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  targetAltitude: {
    type: Number,
    required: true,
    default: 0,
  },
});
</script>

<style scoped>
.altitude-tape {
  /* Basic styling for the placeholder */
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}
</style>