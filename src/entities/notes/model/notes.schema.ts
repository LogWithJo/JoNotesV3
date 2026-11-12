import { z } from 'zod';

export const notesFilterSchema = z.object({
  category: z.string().trim().optional(),
  search: z.string().trim().optional(),
  sort: z.enum(['newest', 'oldest', 'az', 'za']).default('newest'),
});

export const noteSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  category: z.string(),
  content: z.string(),
  userId: z.number().int().positive(),
  isPin: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const noteIdSchema = z
  .number({ error: 'Note ID is required and must be a number' })
  .int('Note ID must be a whole number')
  .min(1, 'Note ID must be at least 1');

export const notesSchemaArray = z.array(noteSchema);

export type NoteId = z.infer<typeof noteIdSchema>;
export type Note = z.infer<typeof noteSchema>;
export type NotesFilters = z.infer<typeof notesFilterSchema>;
