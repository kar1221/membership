import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:vue-layouts';

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
});

if (import.meta.hot) {
  handleHotUpdate(router);
}
