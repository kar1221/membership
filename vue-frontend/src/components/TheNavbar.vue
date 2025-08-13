<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore();
</script>

<template>
  <nav class="flex items-center justify-between p-4 shadow-md">
    <RouterLink to="/" class="font-logo text-primary text-3xl">Membership</RouterLink>
    <div>
      <div v-if="auth.isAuthenticated" class="flex items-center justify-center gap-2 text-lg">
        <UIcon name="fa7-solid:user-alt"></UIcon>
        <p>{{ auth.currentUser!.username }}</p>
      </div>
      <RouterLink v-else to="signup" class="flex items-center justify-center gap-2 text-lg">
        <UIcon name="fa7-solid:user-plus"></UIcon>
        <p>Sign Up</p>
      </RouterLink>
    </div>
  </nav>
</template>
