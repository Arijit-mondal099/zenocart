const ProductGridSkeleton = () => {
  return (
    <>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="group border border-gray-600 w-full h-95 rounded-lg overflow-hidden animate-pulse"
          >
            {/* Image placeholder */}
            <div className="w-full h-80 bg-gray-200"></div>

            {/* Text placeholder */}
            <div className="flex flex-col gap-2 px-4 py-2">
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProductGridSkeleton;
