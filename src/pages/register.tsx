import { Film } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { RegisterForm } from '@/components/register_form';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { RegisterSchema } from '@/utils/zod.schema';
import { RegisterSchemaType } from '@/utils/zod.schema';
import { ThemeProviderContext } from '@/context/theme-provider';
import { useContext } from 'react';

export default function LoginPage() {
  const { theme } = useContext(ThemeProviderContext);
  const formik = useFormik<RegisterSchemaType>({
    initialValues: {
      taiKhoan: '',
      maNhom: 'GP01',
      hoTen: '',
      email: '',
      soDT: '',
      matKhau: '',
      confirm_password: ''
    },
    validationSchema: toFormikValidationSchema(RegisterSchema),
    onSubmit: (values) => {
      console.log('Form values:', values);
    }
  });
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex items-center justify-between'>
          <div className='flex justify-center gap-2 md:justify-start'>
            <a href='#' className='flex items-center gap-2 font-medium'>
              <div className='flex items-center gap-2'>
                <Film className='h-6 w-6' />
                <span className='text-lg font-bold'>Movie Admin</span>
              </div>
            </a>
          </div>
          <ModeToggle />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <RegisterForm formik={formik} />
          </div>
        </div>
      </div>
      <div className='relative hidden bg-muted lg:block' style={{ width: '952px', height: '933px' }}>
        {theme === 'light' ? (
          <img src='/bg_register.png' alt='Image' className='absolute inset-0 h-full w-full object-cover ' />
        ) : (
          <img src='/light_bg_register.png' alt='Image' className='absolute inset-0 h-full w-full object-cover ' />
        )}
      </div>
    </div>
  );
}
