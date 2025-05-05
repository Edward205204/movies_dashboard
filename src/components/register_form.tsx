import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';
import path from '@/constants/path';
import { FormikProps } from 'formik';
import { RegisterFormValues } from '@/pages/register';

interface RegisterFormProps extends React.ComponentProps<'form'> {
  formik: FormikProps<RegisterFormValues>;
}

export function RegisterForm({ formik, className, ...props }: RegisterFormProps) {
  return (
    <form
      className={cn('flex flex-col gap-8 w-full max-w-lg mx-auto bg-card rounded-lg ', className)}
      {...props}
      onSubmit={formik.handleSubmit}
    >
      <div className='flex flex-col items-center gap-3 text-center mb-4'>
        <h1 className='text-2xl font-bold'>Create an account</h1>
        <p className='text-muted-foreground text-sm'>Fill in your details to get started</p>
      </div>

      <div className='grid gap-6'>
        <div className='grid grid-cols-2 gap-5'>
          <div className='space-y-2'>
            <Label htmlFor='user_name'>Username</Label>
            <Input
              id='user_name'
              type='text'
              placeholder='username'
              name='user_name'
              value={formik.values.user_name}
              onChange={formik.handleChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='group_code'>Group Code</Label>
            <Input
              placeholder='GP01'
              type='text'
              id='group_code'
              name='group_code'
              value={formik.values.group_code}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='full_name'>Full Name</Label>
          <Input
            id='full_name'
            type='text'
            placeholder='Your full name'
            name='full_name'
            value={formik.values.full_name}
            onChange={formik.handleChange}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='m@example.com'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone_number'>Phone Number</Label>
          <Input
            id='phone_number'
            type='tel'
            placeholder='0123456789'
            name='phone_number'
            value={formik.values.phone_number}
            onChange={formik.handleChange}
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              placeholder='password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirm_password'>Confirm Password</Label>
            <Input
              id='confirm_password'
              type='password'
              placeholder='confirm password'
              name='confirm_password'
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <Button type='submit' className='mt-2 w-full'>
          Register
        </Button>
      </div>

      <div className='text-center text-sm mt-4'>
        Already have an account?
        <Link to={path.login} className='underline hover:text-primary'>
          Login
        </Link>
      </div>
    </form>
  );
}
