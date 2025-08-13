<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore();
</script>

<template>
  <nav class="flex items-center justify-between p-4">
    <RouterLink to="/" class="font-logo text-primary text-3xl">Membership</RouterLink>
    <div>
      <p v-if="auth.isAuthenticated">
        {{ auth.user!.username }}
      </p>
      <RouterLink v-else to="signup">Sign Up</RouterLink>
    </div>
  </nav>
</template>
