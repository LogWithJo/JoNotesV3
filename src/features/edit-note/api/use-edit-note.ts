import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editNote } from './edit-note.api';
import { notesKeys } from '../../../entities/notes';
import type { EditNoteParams } from '../model/edit-note.schema';

export const useEditNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: EditNoteParams) => editNote(params),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: notesKeys.notes }),
  });
};
