import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notesKeys, type NoteId } from '../../../entities/notes';
import { deleteNote } from './delete-note.api';

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: NoteId) => deleteNote(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: notesKeys.notes }),
  });
};
