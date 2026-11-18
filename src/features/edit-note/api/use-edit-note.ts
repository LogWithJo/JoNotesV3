import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editNote } from './edit-note.api';
import { notesKeys } from '../../../entities/notes';
import type { EditNoteParams } from '../model/edit-note.schema';

export const useEditNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (editParams: EditNoteParams) => editNote(editParams),
    onSuccess: (_, editNoteParams) => {
      queryClient.invalidateQueries({ queryKey: notesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: notesKeys.detail(editNoteParams.noteId),
      });
    },
  });
};
