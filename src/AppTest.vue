<template>
  <div style="padding: 20px; color: white; background: #1e1e1e; min-height: 100vh;">
    <h1>HolyC Test</h1>
    <p>If you see this, Vue is working!</p>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);
</script>
