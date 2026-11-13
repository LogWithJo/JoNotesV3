import z from 'zod';

export const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  name: z.string().min(5, 'Name must be at least 8 characters long'),
});

export const loginResponseSchema = z.object({
  token: z.string().jwt().or(z.string().min(1)),
  accessToken: z.string().jwt().or(z.string().min(1)),
  refreshToken: z.string().min(1),
  tokenType: z.literal('Bearer'),
  expiresIn: z.number().int().positive(),
});

export type LoginInput = z.infer<typeof loginSchema>;
