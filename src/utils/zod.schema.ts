import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.number()
});

export const RegisterSchema = LoginFormSchema.extend({
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' })
});

export const LoginFormSchemaType = LoginFormSchema._type;
