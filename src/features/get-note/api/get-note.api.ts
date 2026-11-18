import { noteIdSchema, noteSchema, type NoteId } from '../../../entities/notes';
import { apiClient } from '../../../shared/api';

export async function getNote(noteId: NoteId, signal: AbortSignal) {
  const parsedNoteId = noteIdSchema.safeParse(noteId);
  if (!parsedNoteId.success) {
    throw new Error(`Invalid note ID: ${parsedNoteId.error.message}`);
  }
  const response = await apiClient.get(`/notes/${parsedNoteId.data}`, { signal });
  return noteSchema.parse(response.data);
}
