<script setup lang="ts">
import { reactive } from 'vue';
import * as z from 'zod';
import { useAuthStore } from '@/stores/authStore';
import { router } from '@/router';
const auth = useAuthStore();

const schema = z
  .object({
    username: z.string().min(3).max(30),
    firstName: z.string().min(1).max(30),
    lastName: z.string().min(1).max(30),
    password: z.string().min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string().nonempty(),
  })
  .refine(
    (schema) => {
      return schema.password === schema.confirmPassword;
    },
    {
      message: "Password doesn't match.",
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

const handleSignUp = async () => {
  const result = schema.safeParse(state);

  if (!result.success) {
    const toast = useToast();
    toast.add({
      title: "Error",
      description: result.error.message,
      color: 'error'
    })

    return;
  };

  const response = await auth.signUp({
    username: state.username,
    firstName: state.firstName,
    lastName: state.lastName,
    password: state.password,
  });

  if (response.success) {
    await router.push('/');
  } else {
  }
};
</script>

<template>
  <div class="flex h-full items-center justify-center">
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
      </UForm>
      <template #footer>
        <div class="flex justify-end gap-4">
          <UButton @click="handleSignUp">Sign Up</UButton>
          <UButton color="neutral" @click="returnHome">Cancel</UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
