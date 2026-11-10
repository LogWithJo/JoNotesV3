export const notesKeys = {
  notes: ['notes'] as const,
  lists: () => [...notesKeys.notes, 'lists'] as const,
};
