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
  .positive()
  .min(1, 'Note ID must be at least 1');

export const notesSchemaArray = z.array(noteSchema);
const pageNumber = z.number().int().positive();

const pageLimit = z.number().int().min(1).max(50);

export const offsetNotesSchema = z
  .object({
    items: notesSchemaArray,
    total: z.number().int().nonnegative(),
    page: pageNumber,
    limit: pageLimit,
    totalPages: z.number().int().nonnegative(), // 0 when total is 0
  })
  .refine(
    (offsetResponse) => offsetResponse.items.length <= offsetResponse.limit,
    {
    message: 'items length cannot exceed limit',
    path: ['items'],
    },
  );

export const cursorNotesSchema = z.object({
  items: notesSchemaArray,
  nextCursor: z.string().min(1).nullable(), // null when there are no more pages
});

export const offsetPageRequestSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export const cursorPageRequestSchema = z.object({
  cursor: z.string().min(1).nullish(), // omitted on the first request
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export type OffsetNotes = z.infer<typeof offsetNotesSchema>;
export type CursorNotes = z.infer<typeof cursorNotesSchema>;
export type OffsetPageRequest = z.infer<typeof offsetPageRequestSchema>;
export type CursorPageRequest = z.infer<typeof cursorPageRequestSchema>;
export type NoteId = z.infer<typeof noteIdSchema>;
export type Note = z.infer<typeof noteSchema>;
export type NotesFilters = z.infer<typeof notesFilterSchema>;
