const NewArrivalsSkeleton = () => {
  return (
    <>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="relative min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] bg-white rounded-lg overflow-hidden border border-gray-200 group flex-shrink-0"
          >
            {/* Image skeleton */}
            <div className="w-full h-[400px] bg-gray-300 animate-pulse" />

            {/* Text skeleton */}
            <div className="absolute left-0 right-0 bottom-0 bg-black/20 px-4 py-4">
              <div className="h-5 w-3/4 bg-gray-400 rounded animate-pulse mb-2" />
              <div className="h-4 w-1/4 bg-gray-400 rounded animate-pulse" />
            </div>
          </div>
        ))}
    </>
  );
};

export default NewArrivalsSkeleton;
