import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';
import path from '@/constants/path';
import { FormikProps } from 'formik';
import { LoginFormSchemaType } from '@/utils/zod.schema';

interface LoginFormProps extends React.ComponentProps<'form'> {
  formik: FormikProps<LoginFormSchemaType>;
}

export function LoginForm({ formik, className, ...props }: LoginFormProps) {
  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={formik.handleSubmit} {...props}>
      <div className='flex flex-col items-center gap-1 text-center'>
        <h1 className='text-2xl font-bold'>Login to your account</h1>
        <p className='text-muted-foreground text-sm text-balance'>Enter your email below to login to your account</p>
      </div>
      <div className='grid gap-6'>
        <div className='grid gap-1'>
          <Label htmlFor='taiKhoan'>User Name</Label>
          <Input
            id='taiKhoan'
            type='text'
            placeholder='User Name'
            name='taiKhoan'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.taiKhoan}
            className={formik.touched.taiKhoan && formik.errors.taiKhoan ? 'border-destructive' : ''}
          />
          <div className='h-5'>
            {formik.touched.taiKhoan && formik.errors.taiKhoan && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.taiKhoan}</p>
            )}
          </div>
        </div>

        <div className='grid gap-1'>
          <div className='flex items-center'>
            <Label htmlFor='matKhau'>Password</Label>
            <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
              Forgot your password?
            </a>
          </div>
          <Input
            id='matKhau'
            type='password'
            placeholder='password'
            autoCapitalize='none'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.matKhau}
            name='matKhau'
            className={formik.touched.matKhau && formik.errors.matKhau ? 'border-destructive' : ''}
          />
          <div className='h-5'>
            {formik.touched.matKhau && formik.errors.matKhau && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.matKhau}</p>
            )}
          </div>
        </div>
        <Button type='submit' className='w-full'>
          Login
        </Button>
      </div>
      <div className='text-center text-sm'>
        Don&apos;t have an account?
        <Link to={path.register} className='underline underline-offset-4'>
          Sign up
        </Link>
      </div>
    </form>
  );
}
