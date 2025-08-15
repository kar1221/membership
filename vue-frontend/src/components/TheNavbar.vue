<script setup lang="ts">
import { ref } from 'vue';
import type { DropdownMenuItem } from '@nuxt/ui';


const username = 'kar1221';

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
    },
  ],
]);

</script>

<template>
  <nav class="font-primary flex items-center justify-between px-8 py-4 shadow-md">
    <RouterLink to="/" class="font-logo text-primary text-3xl">Membership</RouterLink>
    <div class="font-primary flex items-center justify-center">
      <template v-if="true">
        <UDropdownMenu
          :items="items"
          size="lg"
          :ui="{
            content: 'w-72',
          }"
        >
          <div class="flex cursor-pointer items-center justify-center gap-2">
            <img
              :src="`https://avatar.iran.liara.run/username?username=${username}&size=32`"
              class="border-neutral rounded-full border-2"
            />
          </div>
          <template #profile>
            <div class="flex gap-3">
              <img
                :src="`https://avatar.iran.liara.run/username?username=${username}&size=64`"
                class="border-inverted rounded-full border-2"
              />
              <div class="flex flex-col justify-center gap-0.5">
                <div class="text-highlighted text-md font-primary flex gap-1 font-bold">
                  <p>John</p>
                  <p>Smith</p>
                </div>
                <div>
                  <p class="text-dimmed text-start">Username</p>
                </div>
              </div>
            </div>
          </template>
        </UDropdownMenu>
      </template>
    </div>
  </nav>
</template>
