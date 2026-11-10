const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

export const apiConfig = {
  baseUrl: rawBaseUrl.replace(/\/+$/, ''),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
