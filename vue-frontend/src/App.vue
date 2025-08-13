<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';

const auth = useAuthStore();
</script>

<template>
  <UApp>
    <RouterView />
    <UButton @click="auth.fetchUser()">Fetch</UButton>
  </UApp>
</template>
