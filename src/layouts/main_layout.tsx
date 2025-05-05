import Header from '@/components/customs/header';
import Aside from '@/components/customs/aside';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex flex-1'>
        <Aside />
        <main className='flex-1 overflow-auto p-4 md:p-6'>{children}</main>
      </div>
    </div>
  );
}
