const ProductDetailsSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto flex items-center justify-center py-8 animate-pulse">
      <div className="flex justify-center flex-col md:flex-row gap-4 w-full">
        <div className="hidden md:flex gap-2 flex-col">
          <div className="w-20 h-20 bg-gray-200 rounded-lg" />
          <div className="w-20 h-20 bg-gray-200 rounded-lg" />
        </div>

        <div className="w-full sm:w-1/2 h-[500px] bg-gray-200 rounded-lg" />

        <div className="flex flex-col w-full max-w-sm gap-4">
          <div className="w-3/4 h-6 bg-gray-200 rounded" />
          <div className="w-1/2 h-5 bg-gray-200 rounded" />
          <div className="w-full h-20 bg-gray-200 rounded" />
          <div className="w-1/2 h-8 bg-gray-200 rounded" />
          <div className="w-full h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
