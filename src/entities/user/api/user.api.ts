import { apiClient } from '../../../shared/api';
import { userRes } from '../model/user.schema';

export async function getMe(signal: AbortSignal) {
  const response = await apiClient.get('/auth/me', { signal });
  return userRes.parse(response.data);
}
