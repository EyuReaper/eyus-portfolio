<template>
  <div>{{ msg }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const msg = ref('Hello from Simple component');

onMounted(() => {
  console.log('Simple component mounted');
});
</script>
