import { useNavigate } from "react-router-dom";
import ProductGridSkeleton from "../skeletonLoading/ProductGridSkeleton";
import { BrushCleaning, Frown } from "lucide-react";

const ProductsGrid = ({ products, loading }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
      {loading ? (
        <ProductGridSkeleton />
      ) : products && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="group border border-gray-800 w-full h-95 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleProductClick(product._id)}
          >
            <div className="w-full overflow-hidden">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-80 object-cover group-hover:scale-110 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col gap-1 items-start justify-center px-4 py-2 bg-gray-800">
              <p className="text-sm text-white font-semibold capitalize">{product.name}</p>
              <p className="flex items-center gap-2">
                <span className="text-sm text-white font-semibold">
                  ₹{product.discountPrice}
                </span>
                <span className="line-through text-xs text-gray-400">
                  ₹{product.price}
                </span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center flex-col gap-6 col-span-4">
          <Frown className="w-8 h-8 text-white mt-20 animate-bounce" />

          <p className="text-center text-gray-600 flex flex-col">
            <span>Oops! No products match your filters.</span>
            <span>Try adjusting your search or removing some filters.</span>
          </p>

          <button
            className="flex items-center gap-2 text-white border border-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:scale-95 transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/collections/all")}
          >
            <BrushCleaning className="h-4 w-4" />
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
