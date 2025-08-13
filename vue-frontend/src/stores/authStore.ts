import type { ServerResponse } from '@/types/serverResponse';
import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import type { User } from 'shared-types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null | undefined,
    isAuthenticated: false,
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    currentUser: (state) => state.user,
  },

  actions: {
    async signUp(userData: {
      username?: string;
      password?: string;
      firstName?: string;
      lastName?: string;
    }): Promise<{ success: boolean; error?: string | null }> {
      this.isLoading = true;
      this.error = null;

      const url =
        import.meta.env.MODE === 'production' ? '/api/auth/signup' : 'http://localhost:3000/api/auth/signup';

      const { error, data, response } = await useFetch<ServerResponse<{ user?: User }>>(url)
        .post({
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          password: userData.password,
        })
        .json();


      if (data.value) {
        this.user = data.value.data.user;
        this.isAuthenticated = true;
        this.isLoading = false;
        return { success: true };
      }

      if (error.value) {
        const error = await response.value?.json() as ServerResponse<{user?: User}>;

        this.isLoading = false;
        return { success: false, error: `Fetch Error ${error.message}` };
      }

      this.isLoading = false;
      return { success: false, error: 'Unexpected Error' };
    },
  },
});
