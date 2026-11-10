import { apiClient } from '../../../shared/api';

export async function getMe() {
  const resposne = await apiClient.get('/auth/me');
  return resposne;
}
