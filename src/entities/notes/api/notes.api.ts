import { apiClient } from '../../../shared/api';
import {
  notesFilterSchema,
  notesSchemaArray,
  type NotesFilters,
} from '../model/notes.schema';

export async function getNotes(data?: NotesFilters) {
  const results = notesFilterSchema.safeParse(data);
  const payload = results.success ? results.data : undefined;
  const res = await apiClient.get('/notes', { params: payload });
  return notesSchemaArray.parse(res.data);
}
