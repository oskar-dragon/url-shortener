import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from 'components/elements';
import { getPageNeighbours } from 'features/links';
import React, { useMemo } from 'react';

type PaginationProps = {
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPageChange: (index: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  currentPage: number;
  totalPages: number;
  resultsCount: number;
};

function Pagination({
  currentPage,
  totalPages,
  canPreviousPage,
  canNextPage,
  onPreviousPage,
  onNextPage,
  onPageChange,
  resultsCount,
}: PaginationProps) {
  const pagesToShow = useMemo(
    () => getPageNeighbours(totalPages, currentPage),
    [totalPages, currentPage],
  );

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-2 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPreviousPage()}
          isDisabled={!canPreviousPage}
        >
          Previous
        </Button>
        <Button size="sm" variant="outline" onClick={() => onNextPage()} isDisabled={!canNextPage}>
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-700">
            Showing <span className="font-medium">{currentPage}</span> to{' '}
            <span className="font-medium">{totalPages}</span> of{' '}
            <span className="font-medium">{resultsCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Button
              size="xs"
              variant="outline"
              isDisabled={!canPreviousPage}
              onClick={() => onPreviousPage()}
              className="rounded-r-none flex justify-center items-center"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>

            {pagesToShow.map((page) => (
              <Button
                size="sm"
                variant={page === currentPage ? 'lightBlue' : 'outline'}
                onClick={() => onPageChange(page)}
                className="rounded-none hidden items-center border px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
              >
                {page}
              </Button>
            ))}

            <Button
              size="xs"
              variant="outline"
              isDisabled={!canNextPage}
              onClick={() => onNextPage()}
              className="rounded-l-none  flex justify-center items-center"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
