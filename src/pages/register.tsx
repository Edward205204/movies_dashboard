import { LoginForm } from '@/components/login-form';
import { Film } from 'lucide-react';
export default function RegisterPage() {
  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-b from-background to-muted'>
      <div className="flex-1 flex items-center justify-center px-4 py-24 bg-[url('/auth-background.png')] bg-cover bg-center bg-no-repeat">
        <div className='w-full max-w-md space-y-8'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <div className='flex items-center justify-center h-12 w-12 rounded-full bg-primary/10'>
              <Film className='h-6 w-6 text-primary' />
            </div>
            <h2 className='text-2xl font-semibold tracking-tight'>Welcome back</h2>
            <p className='text-sm text-muted-foreground'>Enter your credentials to access your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
