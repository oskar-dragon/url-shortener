import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
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
        <button
          type="button"
          onClick={() => onPreviousPage()}
          disabled={!canPreviousPage}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onNextPage()}
          disabled={!canNextPage}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
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
            <button
              type="button"
              onClick={() => onPreviousPage()}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {pagesToShow.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                type="button"
                className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
              >
                {currentPage === page ? `+${page}` : page}
              </button>
            ))}

            <button
              onClick={() => onNextPage()}
              disabled={!canNextPage}
              type="button"
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
