import ProductTable from '@/components/data-table/product-table';
import Layout from '@/components/layout';
import ProductChart from '@/components/product-chart';
import { fetchProductList } from '@/configs/api/product';
import { TProductList } from '@/configs/types/product';
import { useQuery } from '@tanstack/react-query';

const ProductListPage = () => {
  const productList = useQuery<TProductList, Error>({
    queryKey: ['productList'],
    queryFn: fetchProductList,
  });

  return (
    <Layout>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Product List
      </h1>
      <ProductTable productList={productList} />
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
        Product Chart
      </h2>
      {productList.data && (
        <ProductChart products={productList.data.products} />
      )}
    </Layout>
  );
};

export default ProductListPage;
