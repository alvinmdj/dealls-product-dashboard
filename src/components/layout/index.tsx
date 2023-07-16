import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import MainNav from './main-nav';
import SideNav from './side-nav';

export const inter = Inter({ subsets: ['latin'] });

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={inter.className}>
      <MainNav />
      <div className="flex gap-4">
        <SideNav />
        <main className="flex-1 min-h-screen p-2">{children}</main>
      </div>
    </div>
  );
};

export default Layout;