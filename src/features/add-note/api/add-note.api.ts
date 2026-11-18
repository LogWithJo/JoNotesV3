import { noteSchema } from '../../../entities/notes';
import { apiClient } from '../../../shared/api';
import {
  addNoteInputSchema,
  type AddNoteInput,
} from '../model/add-note.schema';

export async function addNote(noteInput: AddNoteInput) {
  const parsedNoteInput = addNoteInputSchema.safeParse(noteInput);
  if (!parsedNoteInput.success) {
    throw new Error(`Invalid note input: ${parsedNoteInput.error.message}`);
  }
  const response = await apiClient.post('/notes', parsedNoteInput.data);
  return noteSchema.parse(response.data);
}
