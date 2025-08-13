<script setup lang="ts">
import { reactive } from 'vue';
import * as z from 'zod';
import { useAuthStore } from '@/stores/authStore';
import { router } from '@/router';
import type { FormSubmitEvent } from '@nuxt/ui';
const auth = useAuthStore();

const schema = z
  .object({
    username: z
      .string()
      .min(3, 'Username should be longer than 3 characters')
      .max(30, 'Username should not be longer than 30 characters'),
    firstName: z
      .string()
      .min(1, 'First name should be longer than 1 character')
      .max(30, 'First name should not be longer than 30 characters ')
      .regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        'First name can only contain letters, spaces, hyphens, and apostrophes.',
      ),
    lastName: z
      .string()
      .min(1, 'Last name should be longer than 1 character')
      .max(30, 'Last name should not be longer than 30 characters ')
      .regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        'Last name can only contain letters, spaces, hyphens, and apostrophes.',
      ),
    password: z.string().min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string().nonempty(),
  })
  .refine(
    (schema) => {
      return schema.password === schema.confirmPassword;
    },
    {
      message: "Password doesn't match.",
      path: ['confirmPassword'],
    },
  );

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
});

const returnHome = async () => {
  await router.push('/');
};

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const toast = useToast();
  if (auth.isLoggedIn) {
    toast.add({
      title: 'Already logged in',
      description: "You've already logged in, redirecting you in 5 second...",
      color: 'warning',
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(async (): Promise<void> => {
      await router.push('/');
    }, 5000);

    return;
  }

  const result = await auth.signUp({
    firstName: event.data.firstName,
    lastName: event.data.lastName,
    username: event.data.username,
    password: event.data.password,
  });

  if (!result.success && result.error) {
    toast.add({
      title: 'Error',
      description: result.error,
      color: 'error',
    });

    return;
  }

  toast.add({
    title: 'Sign Up Succesful',
    description: 'redirecting you in 5 second...',
    color: 'success',
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  setTimeout(async () => {
    await router.push('/');
  }, 5000);
};
</script>

<template>
  <UContainer class="flex h-full items-center justify-center">
    <UCard class="max-w-xl shadow-xl" variant="outline">
      <template #header>
        <h2 class="font-primary text-center text-2xl font-bold">Sign Up</h2>
      </template>
      <UForm
        :schema="schema"
        :state="state"
        class="grid auto-cols-fr grid-cols-2 gap-4"
        :disabled="auth.isLoading"
        :validate-on="['blur', 'input', 'change']"
        @submit="onSubmit"
      >
        <UFormField label="First Name" name="firstName">
          <UInput v-model="state.firstName" variant="soft"></UInput>
        </UFormField>
        <UFormField label="Last Name" name="lastName">
          <UInput v-model="state.lastName" variant="soft"></UInput>
        </UFormField>
        <UFormField label="Username" name="username" class="col-span-2">
          <UInput v-model="state.username" variant="soft" class="w-full"></UInput>
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" variant="soft" type="password"></UInput>
        </UFormField>
        <UFormField label="Confirm Password" name="confirmPassword">
          <UInput v-model="state.confirmPassword" variant="soft" type="password"></UInput>
        </UFormField>
        <div class="flex justify-end gap-4 col-span-2">
          <UButton type="submit" class="cursor-pointer">Sign Up</UButton>
          <UButton color="neutral" class="cursor-pointer" @click="returnHome">Cancel</UButton>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>
