import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import VueRouter from 'unplugin-vue-router/vite';
import VueLayouts from 'unplugin-vue-layouts';
import ui from '@nuxt/ui/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    ui({
      ui: {
        colors: {
          primary: 'indigo',
          secondary: 'teal',
          neutral: 'zinc',
        },
      },
    }),
    VueLayouts(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
