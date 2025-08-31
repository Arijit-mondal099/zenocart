import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pagination } = useSelector((store) => store.product);
  const { currentPage, totalPages } = pagination;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    // lessthan equalto 5
    if ( totalPages <= maxVisible ) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } 
    // getter than 5 pages
    else {
      if (currentPage <= 3) { // 1 2 (3) 4 ... 8 
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) { // 1 ... 5 (6) 7 8
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else { // 1 ... 6 (7) 8 ... 12
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-10 mb-5">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => {
          handlePageChange(currentPage - 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="p-2 border border-white text-white rounded disabled:opacity-20 bg-gray-700 hover:scale-95 transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 text-white">
            <MoreHorizontal size={18} />
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => {
              handlePageChange(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-3 py-1 border border-white rounded font-semibold ${
              currentPage === page
                ? "bg-white text-black"
                : "text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => {
          handlePageChange(currentPage + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="p-2 border border-white text-white rounded disabled:opacity-20 bg-gray-700 hover:scale-95 transition-all duration-300 cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
