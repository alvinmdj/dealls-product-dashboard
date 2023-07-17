import Pagination from '@/components/data-table/pagination';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchUserById } from '@/configs/api/user';
import { TCart, TCartList } from '@/configs/types/cart';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const cartTableHeads = [
  'Product Name',
  'Quantity',
  'Price',
  'Total',
  'Discount',
  'Final Price',
];

type CartTableProps = {
  cartList: UseQueryResult<TCartList, Error>;
};

const CartTable = ({ cartList }: CartTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentCart = cartList.data?.carts[currentPage - 1];
  const currentUserId = currentCart?.userId || 0;

  const user = useQuery<TUser, Error>({
    queryKey: ['singleUser', currentUserId],
    queryFn: () => fetchUserById(currentUserId),
  });

  const userFullName = user.data
    ? `${user.data?.firstName} ${user.data?.lastName}`
    : 'Loading...';

  function handlePagination(type: 'prev' | 'next') {
    if (type === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      type === 'next' &&
      cartList.data &&
      currentPage !== cartList.data.total
    ) {
      setCurrentPage(currentPage + 1);
    }
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Cart #{currentCart?.id || 1}
      </h1>
      <CartDetailCard userFullName={userFullName} currentCart={currentCart} />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4">
        Products
      </h3>
      <div className="rounded-md border">
        <Table>
          <TableCaption>Cart products</TableCaption>
          <TableHeader>
            <TableRow>
              {cartTableHeads.map((head) => (
                <TableHead key={head}>{head}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartList.isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {cartList.isError && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  {cartList.error.message}
                </TableCell>
              </TableRow>
            )}
            {currentCart?.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.total}</TableCell>
                <TableCell>{product.discountPercentage}%</TableCell>
                <TableCell className="font-bold">
                  {product.discountedPrice}
                </TableCell>
              </TableRow>
            ))}
            {!cartList.data?.carts.length && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Product not found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!!cartList.data && (
        <Pagination
          handlePagination={handlePagination}
          currentPage={currentPage}
          totalPage={cartList.data.total}
        />
      )}
    </>
  );
};

export default CartTable;

const CartDetailCard = ({
  userFullName,
  currentCart,
}: {
  userFullName: string;
  currentCart: TCart | undefined;
}) => (
  <>
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4">
      Details
    </h3>
    <Card>
      {currentCart && (
        <CardContent className="pt-6 grid sm:grid-cols-2 gap-4">
          <p>User: {userFullName}</p>
          <p># of items: {currentCart.totalProducts}</p>
          <p>Total amount: {currentCart.total}</p>
          <p>Discounted total amount: {currentCart.discountedTotal}</p>
        </CardContent>
      )}
    </Card>
  </>
);
