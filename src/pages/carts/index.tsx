import CartTable from '@/components/data-table/cart-table';
import Layout from '@/components/layout';
import { fetchCartList } from '@/configs/api/cart';
import { TCartList } from '@/configs/types/cart';
import { useQuery } from '@tanstack/react-query';

const CartListPage = () => {
  const cartList = useQuery<TCartList, Error>({
    queryKey: ['cartList'],
    queryFn: fetchCartList,
  });

  return (
    <Layout>
      <CartTable cartList={cartList} />
    </Layout>
  );
};

export default CartListPage;
