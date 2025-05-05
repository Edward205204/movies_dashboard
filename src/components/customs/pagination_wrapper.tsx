import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PaginationEllipsis,
  PaginationNext
} from '@/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage?: (page: number) => void;
  className?: string;
}

const PaginationWrapper: React.FC<PaginationProps> = ({ goToPage, currentPage, totalPages, className = 'mt-8' }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      if (goToPage) {
        goToPage(page);
      }
    }
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={currentPage <= 1 ? 'opacity-50 pointer-events-none' : ''}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink onClick={() => handlePageChange(index + 1)} isActive={index + 1 === currentPage}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            className={currentPage >= totalPages ? 'opacity-50 pointer-events-none' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationWrapper;
