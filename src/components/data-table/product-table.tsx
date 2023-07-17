import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LIMIT, fetchProductList } from '@/configs/api/product';
import { TProductList } from '@/configs/types/product';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Input } from '../ui/input';

const productTableHeads = [
  '#',
  'Product Name',
  'Brand',
  'Price',
  'Stock',
  'Category',
];

const ProductTable = () => {
  const [skip, setSkip] = useState(0);

  const productList = useQuery<TProductList, Error>({
    queryKey: ['todos', skip],
    queryFn: () => fetchProductList(skip),
    keepPreviousData: true,
  });

  function handlePagination(type: 'prev' | 'next') {
    if (type === 'prev' && skip > 0) {
      setSkip(skip - LIMIT);
    } else if (
      type === 'next' &&
      productList.data &&
      skip + LIMIT !== productList.data.total
    ) {
      setSkip(skip + LIMIT);
    }
  }

  return (
    <>
      <div className="flex pt-4">
        <Input
          placeholder="Search product name..."
          // value={}
          // onChange={}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border mt-4">
        <Table>
          <TableCaption>Product list</TableCaption>
          <TableHeader>
            <TableRow>
              {productTableHeads.map((head) => (
                <TableHead key={head}>{head}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {productList.isError && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  {productList.error.message}
                </TableCell>
              </TableRow>
            )}
            {productList.data?.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {!!productList.data && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePagination('prev')}
            disabled={skip === 0}
          >
            Previous
          </Button>
          <p className="text-sm">
            Page {(productList.data.skip + LIMIT) / LIMIT} /{' '}
            {productList.data.total / LIMIT}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePagination('next')}
            disabled={
              productList.data.skip + productList.data.limit ===
              productList.data.total
            }
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductTable;
