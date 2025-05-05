import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router';
import path from '@/constants/path';
import { FormikProps } from 'formik';
import { RegisterSchemaType } from '@/utils/zod.schema';

interface RegisterFormProps extends React.ComponentProps<'form'> {
  formik: FormikProps<RegisterSchemaType>;
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
          <div className='space-y-1'>
            <Label htmlFor='taiKhoan'>User Name</Label>
            <Input
              id='taiKhoan'
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
          <div className='space-y-1'>
            <Label htmlFor='maNhom'>Group Code</Label>
            <Input
              id='maNhom'
              placeholder='Group Code'
              type='text'
              name='maNhom'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.maNhom}
              className={formik.touched.maNhom && formik.errors.maNhom ? 'border-destructive' : ''}
            />
          </div>
        </div>

        <div className='space-y-1'>
          <Label htmlFor='hoTen'>Full Name</Label>
          <Input
            id='hoTen'
            placeholder='Your full name'
            name='hoTen'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.hoTen}
            className={formik.touched.hoTen && formik.errors.hoTen ? 'border-destructive' : ''}
          />
          <div className='h-5'>
            {formik.touched.hoTen && formik.errors.hoTen && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.hoTen}</p>
            )}
          </div>
        </div>

        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='m@example.com'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? 'border-destructive' : ''}
          />
          <div className='h-5'>
            {formik.touched.email && formik.errors.email && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.email}</p>
            )}
          </div>
        </div>

        <div className='space-y-1'>
          <Label htmlFor='soDT'>Phone Number</Label>
          <Input
            id='soDT'
            type='tel'
            placeholder='0123456789'
            name='soDT'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.soDT}
            className={formik.touched.soDT && formik.errors.soDT ? 'border-destructive' : ''}
          />
          <div className='h-5'>
            {formik.touched.soDT && formik.errors.soDT && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.soDT}</p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-1'>
            <Label htmlFor='soDT'>Password</Label>
            <Input
              id='soDT'
              type='password'
              name='soDT'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.matKhau}
              className={formik.touched.soDT && formik.errors.soDT ? 'border-destructive' : ''}
            />
            <div className='h-5'>
              {formik.touched.soDT && formik.errors.soDT && (
                <p className='text-sm font-medium text-destructive'>{formik.errors.soDT}</p>
              )}
            </div>
          </div>
          <div className='space-y-1'>
            <Label htmlFor='confirm_password'>Confirm Password</Label>
            <Input
              id='confirm_password'
              type='password'
              name='confirm_password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
              className={formik.touched.confirm_password && formik.errors.confirm_password ? 'border-destructive' : ''}
            />
            <div className='h-5'>
              {formik.touched.confirm_password && formik.errors.confirm_password && (
                <p className='text-sm font-medium text-destructive'>{formik.errors.confirm_password}</p>
              )}
            </div>
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
