<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';

const auth = useAuthStore();

onMounted(async () => await auth.fetchUser());
</script>

<template>
  <UApp>
    <RouterView />
  </UApp>
</template>
