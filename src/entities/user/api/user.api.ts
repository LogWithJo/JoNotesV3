import { apiClient } from '../../../shared/api';
import { userRes } from '../model/user.schema';

export async function getMe() {
  const response = await apiClient.get('/auth/me');
  return userRes.parse(response.data);
}
