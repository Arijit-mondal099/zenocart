import { useNavigate } from "react-router-dom";

const SimilarProducts = ({ similarProducts, loading }) => {
  const navigate = useNavigate();

  const handleClick = (productId) => {
    navigate(`/product/${productId}`)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // similar skeleton loading component
  const SimilarProductsSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 animate-pulse w-full">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="w-full h-64 bg-gray-200 rounded-lg"></div>
        ))}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-center flex-col max-w-6xl mx-auto py-16">
        <h4 className="text-2xl md:text-4xl font-bold text-white">
          Similar Products
        </h4>

        {loading ? (
          <SimilarProductsSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {similarProducts?.map((product) => (
              <div
                key={product._id}
                className="relative rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => handleClick(product._id)}
              >
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-2 z-10">
                  <h4 className="text-sm font-semibold capitalize text-white hover:underline">
                    {product.name}
                  </h4>
                  <p className="text-white text-xs">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarProducts;
