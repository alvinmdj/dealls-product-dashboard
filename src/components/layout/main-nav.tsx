import { inter } from '@/components/layout';
import { navItems } from '@/components/layout/side-nav';
import { buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MainNav = () => {
  const router = useRouter();

  return (
    <nav
      className={`block md:hidden p-4 pb-3 bg-primary text-primary-foreground ${inter.className}`}
    >
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-primary text-primary-foreground"
        >
          <SheetHeader>
            <SheetTitle className="text-primary-foreground">
              Admin Dashboard
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-2">
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
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MainNav;
