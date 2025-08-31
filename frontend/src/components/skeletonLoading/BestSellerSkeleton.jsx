export const BestSellerSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
      <div className="flex justify-center flex-col md:flex-row gap-4 animate-pulse w-full">
        {/* left thumbnails */}
        <div className="hidden md:flex gap-2 flex-col">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-20 h-20 rounded-lg bg-gray-200" />
          ))}
        </div>

        {/* main image */}
        <div className="w-full sm:w-1/2 rounded-lg overflow-hidden border border-gray-200">
          <div className="w-full h-[400px] sm:h-[500px] bg-gray-200" />
        </div>

        {/* details */}
        <div className="flex flex-col w-full max-w-sm gap-3">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-5 w-24 bg-gray-200 rounded" />
          <div className="h-20 w-full bg-gray-200 rounded" />
          <div className="h-5 w-28 bg-gray-200 rounded" />
          <div className="h-7 w-48 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-300 rounded mt-2" />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="h-5 w-full bg-gray-200 rounded" />
            <div className="h-5 w-full bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const BestSellerSkeletonGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-6xl mx-auto gap-2 animate-pulse">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="w-full h-70 bg-gray-200 rounded-lg border border-gray-200"
      />
    ))}
  </div>
);
