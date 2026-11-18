import { apiClient } from '../../../shared/api';
import {
  cursorNotesSchema,
  cursorPageRequestSchema,
  notesFilterSchema,
  offsetNotesSchema,
  offsetPageRequestSchema,
  type CursorPageRequest,
  type NotesFilters,
  type OffsetPageRequest,
} from '../model/notes.schema';

export async function fetchNotesOffset(
  signal: AbortSignal,
  pagination: OffsetPageRequest,
  filters: NotesFilters,
) {
  const isValidPagination = offsetPageRequestSchema.safeParse(pagination);
  const filterResult = notesFilterSchema.safeParse(filters);
  const filterPayload = filterResult.success ? filterResult.data : undefined;
  if (!isValidPagination.success) {
    throw new Error(`Invalid pagination: ${isValidPagination.error.message}`);
  }
  const response = await apiClient.get(
    `/notes?page=${pagination.page}&limit=${pagination.limit}`,
    { signal, params: filterPayload },
  );
  return offsetNotesSchema.parse(response.data);
}

export async function fetchNotesCursor(
  signal: AbortSignal,
  pagination: CursorPageRequest,
  filters: NotesFilters,
) {
  const isValidPagination = cursorPageRequestSchema.safeParse(pagination);
  const filterResult = notesFilterSchema.safeParse(filters);
  const filterPayload = filterResult.success ? filterResult.data : undefined;
  if (!isValidPagination.success) {
    throw new Error(`Invalid pagination: ${isValidPagination.error.message}`);
  }
  const response = await apiClient.get(`/notes/feed?limit=${pagination.limit}`, {
    signal,
    params: {
      cursor: pagination.cursor,
      ...filterPayload,
    },
  });
  return cursorNotesSchema.parse(response.data);
}
