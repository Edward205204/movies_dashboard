import { Film } from 'lucide-react';
import { LoginForm } from '@/components/login-form';
import { ModeToggle } from '@/components/mode-toggle';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { LoginFormSchema, LoginFormSchemaType } from '@/utils/zod.schema';
import { useMutation } from '@tanstack/react-query';
import loginRequest from '@/APIs/auth.api';
import { ThemeProviderContext } from '@/context/theme-provider';
import { useContext } from 'react';
import { setAccessTokenToLS } from '@/utils/auth';
import { useNavigate } from 'react-router';
import path from '@/constants/path';
import { AppContext } from '@/context/app.context';
import roles from '@/constants/roles';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const { theme } = useContext(ThemeProviderContext);
  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const formik = useFormik<LoginFormSchemaType>({
    initialValues: {
      taiKhoan: '',
      matKhau: ''
    },
    validationSchema: toFormikValidationSchema(LoginFormSchema),
    onSubmit: (values) => {
      useLoginMutation.mutate(values);
    }
  });
  const useLoginMutation = useMutation({
    mutationFn: (values: LoginFormSchemaType) => {
      return loginRequest(values);
    },
    onSuccess: (data) => {
      const { content } = data.data;
      if (content.maLoaiNguoiDung === roles.KhachHang) {
        toast.error('You do not have permission to access this page');
        return;
      }
      setAccessTokenToLS(content.accessToken);
      setIsAuthenticated(true);
      navigate(path.home);
    },
    onError: (error) => {
      console.error('Login failed:', error);
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
            <LoginForm formik={formik} />
          </div>
        </div>
      </div>
      <div className='relative hidden bg-muted lg:block' style={{ width: '952px', height: '933px' }}>
        {theme === 'light' ? (
          <img src='/bg_login.png' alt='Image' className='absolute inset-0 h-full w-full object-cover ' />
        ) : (
          <img src='/light_bg_login.png' alt='Image' className='absolute inset-0 h-full w-full object-cover ' />
        )}
      </div>
    </div>
  );
}
