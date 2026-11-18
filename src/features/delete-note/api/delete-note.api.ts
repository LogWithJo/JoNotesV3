import { noteIdSchema, type NoteId } from '../../../entities/notes';
import { apiClient } from '../../../shared/api';

export async function deleteNote(noteId: NoteId) {
  const parsedNoteId = noteIdSchema.safeParse(noteId);
  if (!parsedNoteId.success) {
    throw new Error(`Invalid note ID: ${parsedNoteId.error.message}`);
  }
  const response = await apiClient.delete(`/notes/${parsedNoteId.data}`);
  return response;
}
