import { noteIdSchema, noteSchema, type NoteId } from '../../../entities/notes';
import { apiClient } from '../../../shared/api';

export async function getNote(id: NoteId) {
  const parseId = noteIdSchema.safeParse(id);
  if (!parseId.success) {
    throw new Error(`invalid id: ${parseId.error.message}`);
  }
  const res = await apiClient.get(`/notes/${parseId.data}`);
  return noteSchema.parse(res.data);
}
