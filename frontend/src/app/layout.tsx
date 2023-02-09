import Providers from '@/providers/Providers';

function RootLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
export default RootLayout;
