import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNote } from './add-note.api';
import { notesKeys } from '../../../entities/notes';
import type { AddNoteInput } from '../model/add-note.schema';

export const useAddNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteInput: AddNoteInput) => addNote(noteInput),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: notesKeys.lists() }),
  });
};
