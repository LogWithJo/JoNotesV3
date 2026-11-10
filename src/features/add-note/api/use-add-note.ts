import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNote, type AddNotesProps } from './add-note.api';
import { notesKeys } from '../../../entities/notes';

export const useAddNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddNotesProps) => addNote(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.notes });
    },
  });
};
