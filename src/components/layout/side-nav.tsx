import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const navItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Products',
    href: '/products',
  },
  {
    name: 'Carts',
    href: '/carts',
  },
];

const SideNav = () => {
  const router = useRouter();

  return (
    <aside className="hidden md:flex flex-col gap-2 w-1/4 h-auto bg-primary p-2">
      <p className="leading-7 text-primary-foreground text-center">
        Admin Dashboard
      </p>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            router.pathname === item.href && 'bg-slate-300'
          )}
        >
          {item.name}
        </Link>
      ))}
    </aside>
  );
};

export default SideNav;
