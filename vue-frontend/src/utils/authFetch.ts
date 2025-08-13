import { createFetch } from "@vueuse/core";

const url =
  import.meta.env.MODE === 'production'
    ? '/api/auth/'
    : 'http://localhost:3000/api/auth/';

const authFetch = createFetch({
  baseUrl: url,
  options: {
    updateDataOnError: true,
  },
  fetchOptions: {
    credentials: 'include',
    mode: import.meta.env.MODE === "production" ? undefined : 'cors',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

export default authFetch;
