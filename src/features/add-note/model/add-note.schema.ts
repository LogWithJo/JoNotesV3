import z from 'zod';

export const addNoteInputSchema = z.object({
  title: z
    .string({ error: 'Title is required' })
    .min(1, 'Title cannot be empty'),
  category: z
    .string({ error: 'Category is required' })
    .min(1, 'Category cannot be empty'),
});

export type AddNoteInput = z.infer<typeof addNoteInputSchema>;
