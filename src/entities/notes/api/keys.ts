import type {
  CursorPageRequest,
  NoteId,
  NotesFilters,
  OffsetPageRequest,
} from '../model/notes.schema';

export const notesKeys = {
  all: ['notes'] as const,
  lists: () => [...notesKeys.all, 'list'] as const,
  offsetList: (filters: NotesFilters, pagination: OffsetPageRequest) =>
    [...notesKeys.lists(), filters, pagination] as const,
  cursorList: (filters: NotesFilters, pagination: CursorPageRequest) =>
    [...notesKeys.lists(), filters, pagination] as const,
  details: () => [...notesKeys.all, 'detail'] as const,
  detail: (noteId: NoteId) => [...notesKeys.details(), noteId] as const,
};
