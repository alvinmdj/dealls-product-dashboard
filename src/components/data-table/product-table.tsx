import Pagination from '@/components/data-table/pagination';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchAllCategories, fetchProductList } from '@/configs/api/product';
import { TProduct, TProductList } from '@/configs/types/product';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import Dropdown from './dropdown';

const productTableHeads = [
  'Product Name',
  'Brand',
  'Price',
  'Stock',
  'Category',
];

const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);

  const productList = useQuery<TProductList, Error>({
    queryKey: ['productList'],
    queryFn: fetchProductList,
  });

  const productCategories = useQuery<string[], Error>({
    queryKey: ['productCategories'],
    queryFn: fetchAllCategories,
  });

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

  const handleSearchByProductName = (keyword: string) => {
    setSearchKeyword(keyword.toLowerCase());
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategories((prevState) => {
      const isChecked = prevState.includes(category);

      if (isChecked) {
        return prevState.filter((cat) => cat !== category);
      } else {
        return [...prevState, category];
      }
    });
  };

  const filterProducts = useCallback(
    (searchKeyword: string, categories: string[]) => {
      const filtered =
        productList.data?.products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchKeyword) &&
            (!categories.length || categories.includes(product.category))
        ) || [];
      setFilteredProducts(filtered);
      setCurrentPage(1);
    },
    [productList.data?.products]
  );

  const productsPerPage = 4;
  const totalPage = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      filterProducts(searchKeyword, selectedCategories);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [filterProducts, searchKeyword, selectedCategories]);

  return (
    <>
      <div className="flex flex-wrap gap-2 pt-4">
        <Input
          placeholder="Search product name..."
          value={searchKeyword}
          onChange={(e) => handleSearchByProductName(e.target.value)}
          className="max-w-sm"
        />
        <Dropdown title="Categories">
          <div className="flex flex-col gap-2">
            <p className="text-sm">Filter by categories</p>
            {!!productCategories.data &&
              productCategories.data.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox
                    id={cat}
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={() => handleCategoryFilter(cat)}
                  />
                  <Label htmlFor={cat}>{cat}</Label>
                </div>
              ))}
          </div>
        </Dropdown>
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
            {!!currentProducts.length &&
              currentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category}</TableCell>
                </TableRow>
              ))}
            {productList.data && !currentProducts.length && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Product not found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!!productList.data && (
        <Pagination
          handlePagination={handlePagination}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      )}
    </>
  );
};

export default ProductTable;
