import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notesKeys } from '../../../entities/notes';
import { deleteNote, type Props } from './delete-note.api';

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (props: Props) => deleteNote(props),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.notes });
    },
  });
};
