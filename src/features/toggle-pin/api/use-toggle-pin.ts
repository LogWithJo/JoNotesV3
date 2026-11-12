import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notesKeys, type NoteId } from '../../../entities/notes';
import { togglePin } from './toggle-pin.api';

export const useTogglePin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: NoteId) => togglePin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.notes });
    },
  });
};
