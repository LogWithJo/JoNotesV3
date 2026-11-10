import { apiClient } from '../../../shared/api';

export async function continueAuth(email: string, password: string) {
  const res = await apiClient.post('/auth/continue', { email, password });
  return res;
}
