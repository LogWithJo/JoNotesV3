import z from 'zod';

export const userSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  name: z.string().nullable(),
  avatar: z.string().url().nullable(),
  createdAt: z.string().datetime(),
});

export const userRes = z.object({
  user: z.object({
    id: z.number().int().positive(),
    email: z.string().email(),
    name: z.string().nullable(),
    avatar: z.string().url().nullable(),
    createdAt: z.string().datetime(),
  }),
});

export type User = z.infer<typeof userSchema>;
