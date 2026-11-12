import { apiClient } from '../../../shared/api';
import type { LogoutResponse } from '../model/logout.schema';

export async function logout(): Promise<LogoutResponse> {
  const res = await apiClient.post('/auth/logout');
  return res.data;
}
