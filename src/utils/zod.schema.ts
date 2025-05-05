import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z.string({ message: 'Password is required' })
});

export const RegisterSchema = LoginFormSchema.extend({
  user_name: z.string({ message: 'User name is required' }),
  group_code: z.string({ message: 'Group code is required' }),
  full_name: z.string({ message: 'Full name is required' }),
  phone_number: z
    .string({ message: 'Phone number is required' })
    .regex(/^\d+$/, { message: 'Phone number must be a valid number' })
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number must be at most 15 digits' }),
  confirm_password: z.string({ message: 'Confirm password is required' })
}).refine((data) => data.password === data.confirm_password, {
  path: ['confirm_password'],
  message: 'Passwords do not match'
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
