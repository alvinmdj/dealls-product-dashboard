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
import { fetchProductList } from '@/configs/api/product';
import { TProductList } from '@/configs/types/product';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Input } from '../ui/input';

const productTableHeads = [
  'Product Name',
  'Brand',
  'Price',
  'Stock',
  'Category',
];

const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const productList = useQuery<TProductList, Error>({
    queryKey: ['todos'],
    queryFn: fetchProductList,
  });

  // handle pagination data
  const productsPerPage = 4;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.data?.products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  function handlePagination(type: 'prev' | 'next') {
    if (type === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      type === 'next' &&
      productList.data &&
      currentPage !== productList.data.total / productsPerPage
    ) {
      setCurrentPage(currentPage + 1);
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
            {currentProducts?.map((product) => (
              <TableRow key={product.id}>
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
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <p className="text-sm">
            Page {currentPage} / {productList.data.total / productsPerPage}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePagination('next')}
            disabled={currentPage === productList.data.total / productsPerPage}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductTable;
