import { noteIdSchema, noteSchema, type NoteId } from '../../../entities/notes';
import { apiClient } from '../../../shared/api';

export async function togglePin(id: NoteId) {
  const parseId = noteIdSchema.safeParse(id);
  if (!parseId.success) {
    throw new Error(`invalid id: ${parseId.error.message}`);
  }
  const res = await apiClient.patch(`/notes/${id}/pin`);
  return noteSchema.parse(res.data);
}
