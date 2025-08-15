import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:vue-layouts';
import { useAuthStore } from './stores/authStore';

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.name === '/signUp/' && auth.isAuthenticated) {
    return '/';
  }
});

if (import.meta.hot) {
  handleHotUpdate(router);
}
