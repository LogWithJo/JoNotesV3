import z from 'zod';

export const logoutResponseSchema = z.object({
  success: z.string(),
});

export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
