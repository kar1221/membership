import type { AuthStoreReturn } from '@/types/authStoreReturn';
import type { ServerResponse } from '@/types/serverResponse';
import authFetch from '@/utils/authFetch';
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
    }): Promise<AuthStoreReturn> {
      this.isLoading = true;
      this.error = null;

      const { data, statusCode } = await authFetch('/signup')
        .post({
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          password: userData.password,
        })
        .json<ServerResponse<{ user?: User }>>();

      if (!data.value) {
        this.isLoading = false;
        return {
          success: false,
          error: "Unexpected Error. Server didn't return a value",
        };
      }

      if (statusCode.value && statusCode.value >= 400) {
        this.isLoading = false;
        return {
          success: false,
          error: data.value.message,
        };
      }

      this.isAuthenticated = true;
      this.isLoading = false;
      this.user = data.value.data.user;
      return {
        success: true,
      };
    },

    async fetchUser(): Promise<AuthStoreReturn> {
      this.isLoading = true;

      const { statusCode, data } = await authFetch('/user')
        .get()
        .json<ServerResponse<{ user?: User }>>();

      if (statusCode.value && statusCode.value > 400) {
        this.isLoading = false;
        return {
          success: false,
          error: data.value?.message,
        };
      }

      if (!data.value) {
        this.isLoading = false;
        return {
          success: false,
          error: "Unexpected Error. Server didn't return a value",
        };
      }

      this.isLoading = false;
      this.user = data.value.data.user;
      this.isAuthenticated = true;
      return {
        success: true,
      };
    },
  },
});
