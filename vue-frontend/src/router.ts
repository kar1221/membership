import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:vue-layouts';
import { useAuthStore } from './stores/authStore';

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if (to.path === '/signup' && auth.isAuthenticated) {
    await router.push('/');
  }
});

if (import.meta.hot) {
  handleHotUpdate(router);
}
