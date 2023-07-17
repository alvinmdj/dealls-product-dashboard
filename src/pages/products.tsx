import ProductTable from '@/components/data-table/product-table';
import Layout from '@/components/layout';

const ProductListPage = () => {
  return (
    <Layout>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Product List Page
      </h1>
      <ProductTable />
      {/* <DataTable columns={columns} data={products.data.products} /> */}
    </Layout>
  );
};

export default ProductListPage;
