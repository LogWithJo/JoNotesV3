import { queryOptions } from '@tanstack/react-query';
import { getNote } from './get-note.api';
import { notesKeys, type NoteId } from '../../../entities/notes';

export const getNoteOptions = (noteId: NoteId) => {
  return queryOptions({
    queryFn: ({ signal }) => getNote(noteId, signal),
    queryKey: notesKeys.detail(noteId),
  });
};
