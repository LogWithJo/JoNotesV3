import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editNote, type Props } from './edit-note.api';
import { notesKeys } from '../../../entities/notes';

export const useEditNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: Props) => editNote(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.notes });
    },
  });
};
