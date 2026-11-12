import { noteIdSchema, noteSchema } from '../../../entities/notes';
import { apiClient } from '../../../shared/api';
import {
  editNoteInputSchema,
  type EditNoteParams,
} from '../model/edit-note.schema';

export async function editNote({ data, id }: EditNoteParams) {
  const parseId = noteIdSchema.safeParse(id);
  const validPayload = editNoteInputSchema.safeParse(data);
  if (!parseId.success || !validPayload.success) {
    throw new Error(
      parseId.success
        ? `invalid type: ${parseId.error}`
        : `invalid typed data: ${validPayload.error?.message}`,
    );
  }
  const res = await apiClient.patch(
    `/notes/${parseId.data}`,
    validPayload.data,
  );
  return noteSchema.parse(res.data);
}
