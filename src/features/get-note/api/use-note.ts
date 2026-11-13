import { useQuery } from '@tanstack/react-query';
import { getNote } from './get-note.api';
import { notesKeys, type NoteId } from '../../../entities/notes';

export const useNote = (id: NoteId) => {
  return useQuery({
    queryFn: () => getNote(id),
    queryKey: notesKeys.detail(id),
  });
};
