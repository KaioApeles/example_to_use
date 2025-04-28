import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const findByEmailSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export const findByIdSchema = z.object({
  id: z.number().int().positive('ID must be a positive integer'),
});

export const softDeleteSchema = z.object({
  id: z.number().int().positive('ID must be a positive integer'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type FindByEmailInput = z.infer<typeof findByEmailSchema>;
export type FindByIdInput = z.infer<typeof findByIdSchema>;
export type SoftDeleteInput = z.infer<typeof softDeleteSchema>; 