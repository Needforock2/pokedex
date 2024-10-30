import React, { useState, useEffect, useCallback } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface Props {
  totalItems: number;
  currentPage: number;
  handlePaginator: (offset: number) => void;
}

export default function Paginator({ handlePaginator, totalItems, currentPage  }: Props) {

  const [pageRange, setPageRange] = useState<number[]>([]);
  const totalPages = totalItems < 1 ? 1 : Math.ceil(totalItems / 20);


  const calculatePageRange = useCallback((page: number) => {

    if( page ===1 && totalPages === 1){
      return [1]
    }
    if (page <= 6) {
      return Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1);
    }
    
    const startPage = Math.max(page - 4, 1);
    const endPage = Math.min(page + 5, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [totalPages]);

  useEffect(() => {

    setPageRange(calculatePageRange(currentPage));
  }, [currentPage, totalPages, calculatePageRange]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, page: number) => {
    e.preventDefault()
    handlePaginator(page);
  };

  return (
    <div data-testid='paginator-wrapper' className="flex items-center justify-between  border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={(e) => handleClick(e, currentPage-1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
       
   
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
              >
                {currentPage}
              </button>
        <button
          onClick={(e) => handleClick(e, currentPage+1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 flex-col gap-2 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentPage*20-19}</span> to{" "}
            <span className="font-medium">{totalItems < 20 ? totalItems :currentPage*20}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={(e) => handleClick(e, currentPage-1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage === 1}
            >
              <MdChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>

            {pageRange.map((page) => (
              <button
                key={page}
                onClick={(e) => handleClick(e, page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  page === currentPage
                    ? "bg-indigo-600 bg-red text-white"
                    : "text-gray-900 hover:bg-gray-50"
                } ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={(e) => handleClick(e, currentPage+1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage === totalPages}
            >
              <MdChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}