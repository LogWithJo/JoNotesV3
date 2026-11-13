import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editNote } from './edit-note.api';
import { notesKeys } from '../../../entities/notes';
import type { EditNoteParams } from '../model/edit-note.schema';

export const useEditNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: EditNoteParams) => editNote(params),
    onSuccess: (_, editNoteData) => {
      queryClient.invalidateQueries({ queryKey: notesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notesKeys.detail(editNoteData.id),
      });
    },
  });
};
