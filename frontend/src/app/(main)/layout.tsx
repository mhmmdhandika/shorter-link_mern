import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
    <html lang='en'>
      <head />
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}