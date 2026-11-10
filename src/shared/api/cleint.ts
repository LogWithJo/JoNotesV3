import axios from 'axios';
import { apiConfig } from './config';

export const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: apiConfig.headers,
  timeout: apiConfig.timeout,
  withCredentials: true,
});
