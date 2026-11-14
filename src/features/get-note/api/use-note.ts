import { queryOptions } from '@tanstack/react-query';
import { getNote } from './get-note.api';
import { notesKeys, type NoteId } from '../../../entities/notes';

export const getNoteOptions = (id: NoteId) => {
  return queryOptions({
    queryFn: ({ signal }) => getNote(id, signal),
    queryKey: notesKeys.detail(id),
  });
};
