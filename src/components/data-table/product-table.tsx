import Dropdown from '@/components/data-table/dropdown';
import Pagination from '@/components/data-table/pagination';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchAllCategories } from '@/configs/api/product';
import { TProduct, TProductList } from '@/configs/types/product';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

const productTableHeads = [
  'Product Name',
  'Brand',
  'Price',
  'Stock',
  'Category',
];

type ProductTableProps = {
  productList: UseQueryResult<TProductList, Error>;
};

const ProductTable = ({ productList }: ProductTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [hasPerformedFilter, setHasPerformedFilter] = useState(false);

  const productCategories = useQuery<string[], Error>({
    queryKey: ['productCategories'],
    queryFn: fetchAllCategories,
  });

  const productBrands = Array.from(
    new Set(productList.data?.products.map((product) => product.brand))
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
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
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

  const handleBrandFilter = (brand: string) => {
    setSelectedBrands((prevState) => {
      const isChecked = prevState.includes(brand);

      if (isChecked) {
        return prevState.filter((b) => b !== brand);
      } else {
        return [...prevState, brand];
      }
    });
  };

  const filterProducts = useCallback(
    (
      searchKeyword: string,
      categories: string[],
      brands: string[],
      priceRange: number[]
    ) => {
      const filtered =
        productList.data?.products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchKeyword) &&
            (!categories.length || categories.includes(product.category)) &&
            (!brands.length || brands.includes(product.brand)) &&
            product.price >= priceRange[0] &&
            product.price <= priceRange[1]
        ) || [];
      setFilteredProducts(filtered);
      setHasPerformedFilter(true);
      setCurrentPage(1);
      window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    },
    [productList.data?.products]
  );

  const productsPerPage = 4;
  const totalPage = Math.ceil(filteredProducts.length / productsPerPage) || 1;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      filterProducts(
        searchKeyword,
        selectedCategories,
        selectedBrands,
        priceRange
      );
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [
    filterProducts,
    searchKeyword,
    selectedCategories,
    selectedBrands,
    priceRange,
  ]);

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
        <Dropdown title="Brands">
          <div className="flex flex-col gap-2">
            <p className="text-sm">Filter by brands</p>
            {!!productBrands &&
              productBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandFilter(brand)}
                  />
                  <Label htmlFor={brand}>{brand}</Label>
                </div>
              ))}
          </div>
        </Dropdown>
        <Dropdown title="Price Range">
          <div className="flex flex-col">
            <p className="text-sm">Filter by price range</p>
            <div className="flex justify-between mt-2">
              <p className="text-sm font-semibold">{priceRange[0]}</p>
              <p className="text-sm font-semibold">{priceRange[1]}</p>
            </div>
            <ReactSlider
              className="w-full h-8"
              thumbClassName="h-6 w-6 leading-6 text-center bg-primary rounded-full cursor-grab mt-1"
              trackClassName="h-1/4 top-1/2 -translate-y-1/2 rounded-full bg-gray-200"
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              min={0}
              max={2000}
              step={10}
              ariaLabel={['Lower thumb', 'Upper thumb']}
              ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
              renderThumb={(props) => <div {...props} />}
              pearling
            />
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
            {hasPerformedFilter && !currentProducts.length && (
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
