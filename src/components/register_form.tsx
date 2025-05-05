import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';
import path from '@/constants/path';

export function RegisterForm({ className, ...props }: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-8 w-full max-w-lg mx-auto bg-card rounded-lg ', className)} {...props}>
      <div className='flex flex-col items-center gap-3 text-center mb-4'>
        <h1 className='text-2xl font-bold'>Create an account</h1>
        <p className='text-muted-foreground text-sm'>Fill in your details to get started</p>
      </div>

      <div className='grid gap-6'>
        <div className='grid grid-cols-2 gap-5'>
          <div className='space-y-2'>
            <Label htmlFor='taiKhoan'>Username</Label>
            <Input id='taiKhoan' placeholder='username' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='maNhom'>Group Code</Label>
            <Input id='maNhom' placeholder='GP01' />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='hoTen'>Full Name</Label>
          <Input id='hoTen' placeholder='Your full name' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' placeholder='m@example.com' />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='soDt'>Phone Number</Label>
          <Input id='soDt' type='tel' placeholder='0123456789' />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='matKhau'>Password</Label>
            <Input id='matKhau' type='password' placeholder='password' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirm_password'>Confirm Password</Label>
            <Input id='confirm_password' type='password' placeholder='confirm password' />
          </div>
        </div>

        <Button type='submit' className='mt-2 w-full'>
          Register
        </Button>
      </div>

      <div className='text-center text-sm mt-4'>
        Already have an account?{' '}
        <Link to={path.login} className='underline hover:text-primary'>
          Login
        </Link>
      </div>
    </form>
  );
}
