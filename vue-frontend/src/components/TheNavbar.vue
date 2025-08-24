<script setup lang="ts">
import { ref } from 'vue';
import type { DropdownMenuItem } from '@nuxt/ui';
import { useAuthStore } from '@/stores/authStore';
import { useNotify } from '@/composable/useNotify';

const auth = useAuthStore();

async function handleLogout() {
  await auth.logout();

  if(auth.error) {
    useNotify().error(auth.error);
    return;
  }

  useNotify().success('Logout sucessful');
}

const items = ref<DropdownMenuItem[][]>([
  [
    {
      slot: 'profile',
    },
  ],
  [
    {
      label: 'Change Profile Info',
      icon: 'fa7-solid:user',
    },
    {
      label: 'Logout',
      icon: '',
      onSelect() {
        void handleLogout();
      }
    },
  ],
]);
</script>

<template>
  <nav class="font-primary flex items-center justify-between px-8 py-4 shadow-md">
    <RouterLink to="/" class="font-logo text-primary text-3xl">Membership</RouterLink>
    <div class="font-primary flex items-center justify-center">
      <UDropdownMenu
        v-if="auth.isAuthenticated"
        :items="items"
        size="lg"
        :ui="{
          content: 'w-72',
        }"
      >
        <div class="flex cursor-pointer items-center justify-center gap-2">
          <img
            :src="`https://avatar.iran.liara.run/username?username=${auth.user?.username}&size=32`"
            class="border-neutral rounded-full border-2"
          />
        </div>
        <template #profile>
          <div class="flex gap-3">
            <img
              :src="`https://avatar.iran.liara.run/username?username=${auth.user?.username}&size=64`"
              class="border-inverted rounded-full border-2"
            />
            <div class="flex flex-col justify-center gap-0.5">
              <div class="text-highlighted text-md font-primary flex gap-1 font-bold">
                <p>{{ auth.user?.firstName }}</p>
                <p>{{ auth.user?.lastName }}</p>
              </div>
              <div>
                <p class="text-dimmed text-start">Username</p>
              </div>
            </div>
          </div>
        </template>
      </UDropdownMenu>
      <div v-else>
        <UButton label="Login" to="/login" size="lg" variant="ghost"></UButton>
        <UButton label="Sign Up" to="/signUp" size="lg" variant="ghost" color="secondary"></UButton>
      </div>
    </div>
  </nav>
</template>
