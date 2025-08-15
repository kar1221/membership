import { defineStore } from "pinia";

export const useErrorStore = defineStore('error', {
  state: () => ({
    error: null as string | null,
  }),

  actions: {
    setError(message: string) {
      this.error = message;
    },

    clearError() {
      this.error = null;
    }
  }
})
