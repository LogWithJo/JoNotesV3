import z from 'zod';
import type { NoteId } from '../../../entities/notes';

export const editNoteInputSchema = z.object({
  title: z
    .string({ error: 'Title is required' })
    .min(1, 'Title cannot be empty'),
  category: z
    .string({ error: 'Category is required' })
    .min(1, 'Category cannot be empty'),
  content: z.string({ error: 'Content must be text' }),
});

export type EditNoteInput = z.infer<typeof editNoteInputSchema>;
export type EditNoteParams = { id: NoteId; data: EditNoteInput };
