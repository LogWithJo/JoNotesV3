import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getNote } from './get-note.api';
import { notesKeys } from '../../../entities/notes';

export const useEditNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => getNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.notes });
    },
  });
};
