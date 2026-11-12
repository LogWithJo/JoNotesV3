import { queryOptions } from '@tanstack/react-query';
import { getNotes } from './notes.api';
import { notesKeys } from './keys';
import type { NotesFilters } from '../model/notes.schema';

export const getNotesOptions = (param?: NotesFilters) => {
  return queryOptions({
    queryKey: [...notesKeys.notes, param ?? null],
    queryFn: () => getNotes(param),
  });
};
