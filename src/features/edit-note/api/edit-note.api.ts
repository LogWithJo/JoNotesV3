import { noteIdSchema, noteSchema } from '../../../entities/notes';
import { apiClient } from '../../../shared/api';
import {
  editNoteInputSchema,
  type EditNoteParams,
} from '../model/edit-note.schema';

export async function editNote({ noteChanges, noteId }: EditNoteParams) {
  const parsedNoteId = noteIdSchema.safeParse(noteId);
  const parsedNoteChanges = editNoteInputSchema.safeParse(noteChanges);
  if (!parsedNoteId.success || !parsedNoteChanges.success) {
    throw new Error('Invalid note edit parameters');
  }
  const response = await apiClient.patch(
    `/notes/${parsedNoteId.data}`,
    parsedNoteChanges.data,
  );
  return noteSchema.parse(response.data);
}
