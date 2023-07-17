import ProductTable from '@/components/data-table/product-table';
import Layout from '@/components/layout';

const ProductListPage = () => {
  return (
    <Layout>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Product List
      </h1>
      <ProductTable />
    </Layout>
  );
};

export default ProductListPage;
