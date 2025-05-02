<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.params, '>>>>>>');
const chatId = computed(() => route.params?.id);
</script>

<template>
  <div>{{ chatId }}</div>
</template>
