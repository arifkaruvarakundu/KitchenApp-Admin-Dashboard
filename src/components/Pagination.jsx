import { useState } from 'react';

const Pagination = ({ currentPage, setCurrentPage, totalItems, rowsPerPage }) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  if (totalPages <= 1) return null; // hide if only 1 page

  let startPage = currentPage - 1;
  if (startPage <= 0) startPage = 1;
  let endPage = startPage + 2;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - 2);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex gap-2 items-center">
      <button
        className="rounded-md dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 dark:text-whiteSecondary text-blackPrimary py-1 px-3 hover:border-gray-500 disabled:opacity-50"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pageNumbers.map(number => {
        const isActive = currentPage === number;

        return (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`rounded-md border border-gray-600 py-1 px-3 focus:outline-none focus:ring-2 focus:ring-amber-300 hover:border-gray-500 transition-all duration-200
              ${isActive
                ? 'bg-blackPrimary text-whiteSecondary dark:bg-whiteSecondary dark:text-blackPrimary'
                : 'bg-whiteSecondary text-blackPrimary dark:bg-blackPrimary dark:text-whiteSecondary'}
            `}
          >
            {number}
          </button>
        );
      })}

      <button
        className="rounded-md dark:bg-blackPrimary bg-whiteSecondary border border-gray-600 dark:text-whiteSecondary text-blackPrimary py-1 px-3 hover:border-gray-500 disabled:opacity-50"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
