import Layout from '@/components/layout';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Layout>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        Hi, admin.
      </h1>
      <Link
        href="https://github.com/alvinmdj/dealls-product-dashboard"
        target="_blank"
        className={buttonVariants({ variant: 'default' })}
      >
        <Image
          src="/github-mark-white.svg"
          alt=""
          width={16}
          height={16}
          className="mr-2"
        />
        Source code
      </Link>
    </Layout>
  );
}
