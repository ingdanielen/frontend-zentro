import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className={`flex items-center justify-center gap-4 select-none ${className}`}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border flex items-center gap-2 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft size={20} /> Previous
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          // Show first, last, current, and neighbors; ellipsis for gaps
          if (
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 1 ||
            (currentPage <= 3 && page <= 3) ||
            (currentPage >= totalPages - 2 && page >= totalPages - 2)
          ) {
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-nightBlue text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          }
          // Ellipsis logic
          if (
            (page === currentPage - 2 && currentPage > 3) ||
            (page === currentPage + 2 && currentPage < totalPages - 2)
          ) {
            return <span key={page} className="px-2">...</span>;
          }
          return null;
        })}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border flex items-center gap-2 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        Next <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination; 