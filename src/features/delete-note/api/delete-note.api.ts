import { apiClient } from '../../../shared/api';

export type Props = {
  id: number;
};

export async function deleteNote({ id }: Props) {
  const res = await apiClient.delete('/notes', { params: id });
  return res;
}
