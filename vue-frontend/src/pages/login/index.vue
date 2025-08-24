<script setup lang="ts">
import { useNotify } from '@/composable/useNotify';
import { router } from '@/router';
import { useAuthStore } from '@/stores/authStore';
import type { FormSubmitEvent } from '@nuxt/ui';
import { reactive } from 'vue';
import z from 'zod';

const auth = useAuthStore();

const schema = z.object({
  username: z.string().min(1, 'Please enter username'),
  password: z.string().min(1, 'Please enter password'),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  username: '',
  password: '',
});

type FieldName = 'username' | 'password';

interface FormField {
  label: string;
  name: FieldName;
  type?: string;
}

const fields: FormField[] = [
  {
    label: 'Username',
    name: 'username',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
  },
];

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (auth.isLoggedIn) {
    useNotify().warning("You've already logged in, redirecting you in 5 second...");

    setTimeout(() => {
      void (async function () {
        await router.push('/');
      })();
    }, 2000);

    return;
  }

  await auth.login({
    username: event.data.username,
    password: event.data.password,
  });

  if (auth.error) {
    useNotify().error(auth.error);
    return;
  }

  useNotify().success('Login sucessful, redirecting...');

  setTimeout(() => {
    void (async function () {
      await router.push('/');
    })();
  }, 2000);
};
</script>

<template>
  <UContainer class="flex h-full items-center justify-center">
    <UCard class="max-w-xl shadow-2xl">
      <template #header>
        <h2 class="font-primary text-highlighted text-center text-2xl font-bold">Login</h2>
      </template>
      <UForm :schema="schema" :state="state" class="flex flex-col gap-5" @submit="onSubmit">
        <template v-for="field in fields" :key="field.name">
          <UFormField size="xl" :label="field.label" :name="field.name" required>
            <UInput v-model="state[field.name]" size="xl" variant="soft" :type="field.type">
            </UInput>
          </UFormField>
        </template>
        <div class="mt-4 flex justify-end gap-4">
          <UButton size="xl" type="submit" class="cursor-pointer" label="Login"></UButton>
          <UButton
            size="xl"
            class="cursor-pointer"
            label="Cancel"
            to="/"
            variant="soft"
            color="neutral"
          ></UButton>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>
