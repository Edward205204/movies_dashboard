import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';
import path from '@/constants/path';
import { FormikProps } from 'formik';
import { LoginFormValues } from '@/pages/login';

interface LoginFormProps extends React.ComponentProps<'form'> {
  formik: FormikProps<LoginFormValues>;
}

export function LoginForm({ formik, className, ...props }: LoginFormProps) {
  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={formik.handleSubmit} {...props}>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Login to your account</h1>
        <p className='text-muted-foreground text-sm text-balance'>Enter your email below to login to your account</p>
      </div>
      <div className='grid gap-6'>
        <div className='grid gap-3'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='m@example.com'
            name='email'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className='grid gap-3'>
          <div className='flex items-center'>
            <Label htmlFor='password'>Password</Label>
            <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
              Forgot your password?
            </a>
          </div>
          <Input
            id='password'
            type='password'
            placeholder='password'
            autoCapitalize='none'
            onChange={formik.handleChange}
            value={formik.values.password}
            name='password'
          />
        </div>
        <Button type='submit' className='w-full'>
          Login
        </Button>
      </div>
      <div className='text-center text-sm'>
        Don&apos;t have an account?{' '}
        <Link to={path.register} className='underline underline-offset-4'>
          Sign up
        </Link>
      </div>
    </form>
  );
}
