import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notesKeys, type NoteId } from '../../../entities/notes';
import { togglePin } from './toggle-pin.api';

export const useTogglePin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId: NoteId) => togglePin(noteId),
    onSuccess: (_, noteId) => {
      queryClient.invalidateQueries({ queryKey: notesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notesKeys.detail(noteId),
      });
    },
  });
};
