import { noteIdSchema, noteSchema, type NoteId } from '../../../entities/notes';
import { apiClient } from '../../../shared/api';

export async function togglePin(noteId: NoteId) {
  const parsedNoteId = noteIdSchema.safeParse(noteId);
  if (!parsedNoteId.success) {
    throw new Error(`Invalid note ID: ${parsedNoteId.error.message}`);
  }
  const response = await apiClient.patch(`/notes/${parsedNoteId.data}/pin`);
  return noteSchema.parse(response.data);
}
