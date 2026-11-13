import type { NoteId, NotesFilters } from '../model/notes.schema';

export const notesKeys = {
  all: ['notes'] as const,
  lists: () => [...notesKeys.all, 'list'] as const,
  list: (filters: NotesFilters) => [...notesKeys.lists(), filters] as const,
  details: () => [...notesKeys.all, 'detail'] as const,
  detail: (id: NoteId) => [...notesKeys.details(), id] as const,
};
