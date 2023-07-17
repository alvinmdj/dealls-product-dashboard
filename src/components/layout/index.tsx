import { ReactNode } from 'react';
import MainNav from './main-nav';
import SideNav from './side-nav';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
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
