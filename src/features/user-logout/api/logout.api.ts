import { apiClient } from '../../../shared/api';

export async function logout() {
  const res = await apiClient.post('/auth/logout');
  return res;
}
