import { defineStore } from 'pinia';
import type { User } from 'shared-types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    isLoggedIn: (state) => !state.user,
    currentUser: (state) => state.user,
  },

  actions: {},
});
