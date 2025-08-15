<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useAuthStore } from './stores/authStore';
import { useErrorStore } from './stores/errorStore';

const toast = useToast();
const auth = useAuthStore();
const errorStore = useErrorStore();

watch(
  () => errorStore.error,
  (err) => {
    if (!err) return;

    toast.add({
      title: 'Error',
      description: err,
      color: 'error',
    });

    errorStore.error = null;
  },
);

onMounted(async () => {
  await auth.fetchUser();
});
</script>

<template>
  <UApp>
    <RouterView />
  </UApp>
</template>
