import { useQuery } from '@tanstack/react-query';
import { getNotes, type FilterParam } from './notes.api';
import { notesKeys } from './keys';

export const useNotes = (param?: FilterParam) => {
  return useQuery({
    queryFn: () => getNotes(param),
    queryKey: notesKeys.notes,
  });
};
