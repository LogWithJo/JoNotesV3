import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notesKeys } from '../../../entities/notes';
import { togglePin } from './toggle-pin.api';

export const useTogglePin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => togglePin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.notes });
    },
  });
};
