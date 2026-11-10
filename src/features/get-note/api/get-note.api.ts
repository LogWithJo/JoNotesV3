import { apiClient } from '../../../shared/api';

export async function getNote(id: number) {
  const res = await apiClient.get(`/notes/${id}`);
  return res;
}
