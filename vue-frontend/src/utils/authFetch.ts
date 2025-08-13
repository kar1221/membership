import { createFetch } from "@vueuse/core";

const url =
  import.meta.env.MODE === 'production'
    ? '/api/auth/'
    : 'http://localhost:3000/api/auth/';

const authFetch = createFetch({
  baseUrl: url,
  options: {
    updateDataOnError: true,
    beforeFetch({ options }) {
      if (['POST', 'PUT', 'PATCH'].includes(options.method ?? 'GET')) {
        const headers = new Headers(options.headers as Headers);
        headers.set('Content-Type', 'application/json');
        options.headers = headers;
      }

      return { options };
    }
  },
  fetchOptions: {
    credentials: 'include',
    mode: import.meta.env.MODE === "production" ? undefined : 'cors',
    cache: 'no-store',
  }
});

export default authFetch;
