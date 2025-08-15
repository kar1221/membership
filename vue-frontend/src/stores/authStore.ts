import { authApi } from '@/composable/useAuthApi';
import type { LoginForm, SignUpForm } from '@/types';
import type { ServerResponse } from 'shared-types';
import { AxiosError } from 'axios';
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
    async signUp({ username, password, firstName, lastName }: SignUpForm) {
      this.isLoading = true;

      try {
        await authApi.post('/signup', {
          username,
          password,
          firstName,
          lastName,
        });
        await this.fetchUser();
      } catch (error) {
        if (error instanceof AxiosError) {
          this.error = error.response?.data.message;
        } else {
          this.error = 'Unexpected error while signing up.';
        }
      } finally {
        this.isLoading = false;
      }
    },

    async login({ username, password }: LoginForm) {
      this.isLoading = true;

      try {
        await authApi.post('/login', {
          username,
          password,
        });
        await this.fetchUser();
      } catch (error) {
        if (error instanceof AxiosError) {
          this.error = error.response?.data.message;
        } else {
          this.error = 'Unexpected error while logging in.';
        }
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUser() {
      try {
        const res = await authApi.get<ServerResponse<{ user?: User }>>('/user');
        this.user = res.data.data?.user;
        this.isAuthenticated = true;
      } catch {
        this.user = null;
        this.isAuthenticated = false;
      }
    },

    async logout() {
      this.isLoading = true;

      try {
        await authApi.post('/logout');
        this.user = null;
        this.isAuthenticated = false;
      } catch (error) {
        if (error instanceof AxiosError) this.error = error.response?.data.message;
        else this.error = 'Unexpected error while logging out';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
