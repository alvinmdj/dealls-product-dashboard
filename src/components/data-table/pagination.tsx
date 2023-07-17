import { Button } from '@/components/ui/button';

type PaginationProps = {
  handlePagination: (type: 'prev' | 'next') => void;
  currentPage: number;
  totalPage: number;
};

const Pagination = ({
  handlePagination,
  currentPage,
  totalPage,
}: PaginationProps) => {
  return (
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
        Page {currentPage} / {totalPage}
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePagination('next')}
        disabled={currentPage === totalPage}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
