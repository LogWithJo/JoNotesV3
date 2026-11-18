import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notesKeys, type NoteId } from '../../../entities/notes';
import { deleteNote } from './delete-note.api';

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId: NoteId) => deleteNote(noteId),
    onSuccess: (_, noteId) => {
      queryClient.invalidateQueries({ queryKey: notesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: notesKeys.detail(noteId) });
    },
  });
};
