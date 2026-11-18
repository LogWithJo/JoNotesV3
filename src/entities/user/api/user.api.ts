import { apiClient } from '../../../shared/api';
import { userResponseSchema } from '../model/user.schema';

export async function getMe(signal: AbortSignal) {
  const response = await apiClient.get('/auth/me', { signal });
  return userResponseSchema.parse(response.data);
}
