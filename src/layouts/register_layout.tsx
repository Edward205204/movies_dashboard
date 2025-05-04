import Footer from '@/components/shared/footer';
import { RegisterHeader } from '@/components/shared/register_header';

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RegisterHeader />
      {children}
      <Footer />
    </>
  );
}
