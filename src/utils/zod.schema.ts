import { z } from 'zod';

export const LoginFormSchema = z.object({
  taiKhoan: z.string({ message: 'Name is required' }).email({ message: 'Invalid email address' }),
  matKhau: z.string({ message: 'Password is required' })
});

export const RegisterSchema = LoginFormSchema.extend({
  maNhom: z.string(),
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
  hoTen: z.string({ message: 'Full name is required' }),
  soDT: z
    .string({ message: 'Phone number is required' })
    .regex(/^\d+$/, { message: 'Phone number must be a valid number' })
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number must be at most 15 digits' }),
  confirm_password: z.string({ message: 'Confirm password is required' })
}).refine((data) => data.matKhau === data.confirm_password, {
  path: ['confirm_password'],
  message: 'Confirm passwords do not match'
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
