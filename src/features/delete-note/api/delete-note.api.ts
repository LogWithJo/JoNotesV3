import { noteIdSchema, type NoteId } from '../../../entities/notes';
import { apiClient } from '../../../shared/api';

export async function deleteNote(id: NoteId) {
  const parseId = noteIdSchema.safeParse(id);
  if (!parseId.success) {
    throw new Error(`invalid id: ${parseId.error.message}`);
  }
  const res = await apiClient.delete(`/notes/${parseId.data}`);
  return res;
}
