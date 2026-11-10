import { apiClient } from '../../../shared/api';

export type AddNotesProps = {
  title: string;
  content: string;
  category: string;
};

export async function addNote(data: AddNotesProps) {
  const res = await apiClient.post('/notes', data);
  return res;
}
