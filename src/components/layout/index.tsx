import MainNav from '@/components/layout/main-nav';
import SideNav from '@/components/layout/side-nav';
import Head from 'next/head';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Dealls Dashboard</title>
        <meta
          name="description"
          content="Dealls Dashboard for Products and Carts"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainNav />
      <div className="flex gap-4">
        <SideNav />
        <div className="flex-1 min-h-[calc(100vh-58.4px)] md:min-h-screen p-2 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
