import { apiClient } from '../../../shared/api';

export async function togglePin(id: number) {
  const res = await apiClient.patch(`/notes/${id}`);
  return res;
}
