import { z } from 'zod';

export const LoginFormSchema = z.object({
  taiKhoan: z.string({ message: 'Name is required' }),
  matKhau: z.string({ message: 'Password is required' })
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
