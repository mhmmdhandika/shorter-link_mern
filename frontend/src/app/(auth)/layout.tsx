import Providers from '@/providers/Providers';
import { Poppins } from '@next/font/google';
import '@/app/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full'>
      <head />
      <body className={`${poppins.className} h-full`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
