import axios from 'axios';

const baseURL =
  import.meta.env.MODE === 'production' ? '/api/auth' : 'http://localhost:3000/api/auth';

export const authApi = axios.create({
  baseURL,
  withCredentials: true
});

