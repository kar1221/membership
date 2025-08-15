<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { router } from '@/router';
import type { FormSubmitEvent } from '@nuxt/ui';
import { useNotify } from '@/composable/useNotify';
const auth = useAuthStore();
import { signUpSchema, type SignUpSchema } from '@/schema/signUpForm';

const state = reactive<SignUpSchema>({
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
});

const onSubmit = async (event: FormSubmitEvent<SignUpSchema>) => {
  if (auth.isLoggedIn) {
    useNotify().warning("You've already logged in, redirecting you in 5 second...");

    setTimeout(() => {
      void router.push('/');
    }, 2000);

    return;
  }

  await auth.signUp({
    firstName: event.data.firstName,
    lastName: event.data.lastName,
    username: event.data.username,
    password: event.data.password,
  });

  if (auth.error) {
    useNotify().error(auth.error);
    return;
  }

  useNotify().success('Sign up sucessful, redirecting...');

  setTimeout(() => {
    void router.push('/');
  }, 2000);
};

onMounted(() => {
  if (!auth.isAuthenticated) return;

  useNotify().warning('You are not suppose to be here buddy.');

  void router.push('/');
});

type FieldName = 'username' | 'firstName' | 'lastName' | 'password' | 'confirmPassword';

interface FormField {
  label: string;
  name: FieldName;
  type: string;
  isSpan?: boolean;
}

const formFields: FormField[] = [
  {
    label: 'First Name',
    name: 'firstName',
    type: 'text',
  },
  {
    label: 'Last Name',
    name: 'lastName',
    type: 'text',
  },
  {
    label: 'Username',
    name: 'username',
    type: 'text',
    isSpan: true,
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
  },
];
</script>

<template>
  <UContainer class="flex h-full items-center justify-center">
    <UCard class="max-w-xl shadow-2xl" variant="outline">
      <template #header>
        <h2 class="font-primary text-center text-2xl font-bold">Sign Up</h2>
      </template>
      <UForm
        :schema="signUpSchema"
        :state="state"
        class="grid auto-cols-fr grid-cols-2 gap-4"
        :disabled="auth.isLoading"
        :validate-on="['blur', 'input', 'change']"
        @submit="onSubmit"
      >
        <template v-for="field in formFields" :key="field.name">
          <UFormField
            size="xl"
            :label="field.label"
            :name="field.name"
            :class="field.isSpan && 'col-span-2'"
            required
          >
            <UInput
              v-model="state[field.name]"
              size="xl"
              variant="soft"
              :type="field.type"
              :class="field.isSpan ?? 'w-full'"
              :ui="{ root: 'w-full' }"
            ></UInput>
          </UFormField>
        </template>
        <div class="col-span-2 mt-4 flex justify-end gap-4">
          <UButton size="xl" type="submit" class="cursor-pointer" label="Sign Up"></UButton>
          <UButton
            size="xl"
            color="neutral"
            class="cursor-pointer"
            label="Cancel"
            variant="soft"
            to="/"
          ></UButton>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>
