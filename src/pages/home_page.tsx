import { Link } from 'react-router';
import { Film, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-white text-black overflow-hidden'>
      <div className='flex flex-col items-center gap-6'>
        <div className='flex items-center gap-4'>
          <Film className='w-16 h-16 text-black' />
          <span className='text-5xl font-extrabold tracking-tight'>Movie & User Admin</span>
        </div>
        <p className='text-xl text-gray-700 max-w-xl text-center'>
          Chào mừng bạn đến với hệ thống quản lý phim và người dùng.
          <br />
          Hãy chọn chức năng bên dưới để bắt đầu quản trị!
        </p>
        <div className='flex gap-6 mt-4'>
          <Link
            to='/movies'
            className='flex items-center gap-2 border border-black rounded-lg px-6 py-3 text-lg font-semibold hover:bg-black hover:text-white transition-colors'
          >
            <Film className='w-6 h-6' />
            Movie Management
          </Link>
          <Link
            to='/users'
            className='flex items-center gap-2 border border-black rounded-lg px-6 py-3 text-lg font-semibold hover:bg-black hover:text-white transition-colors'
          >
            <Users className='w-6 h-6' />
            User Management
          </Link>
        </div>
      </div>
    </div>
  );
}
