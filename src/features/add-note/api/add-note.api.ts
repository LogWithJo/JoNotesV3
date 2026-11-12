import { noteSchema } from '../../../entities/notes';
import { apiClient } from '../../../shared/api';
import {
  addNoteInputSchema,
  type AddNoteInput,
} from '../model/add-note.schema';

export async function addNote(data: AddNoteInput) {
  const validPayload = addNoteInputSchema.safeParse(data);
  if (!validPayload.success) {
    throw new Error(`Invalid data type: ${validPayload.error.message}`);
  }
  const res = await apiClient.post('/notes', validPayload.data);
  return noteSchema.parse(res.data);
}
