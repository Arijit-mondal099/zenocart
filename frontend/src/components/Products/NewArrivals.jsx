import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewArrivals } from "../../features/productSlice";
import NewArrivalsSkeleton from "../skeletonLoading/NewArrivalsSkeleton";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const { newArrivals, loading } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(fetchNewArrivals());
  }, [dispatch]);

  return (
    <div className="flex items-center flex-col mt-25">
      {/* New arrivals header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl tracking-tight text-white font-bold mb-2">
          Explore New Arrivals
        </h2>
        <p className="text-sm text-gray-400">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion
        </p>
      </div>

      {/* New arrivals */}
      <div className="relative py-4 w-full">
        {/* left and right scroll btn */}
        <div
          onClick={() => scroll("left")}
          className="absolute z-20 left-5 bottom-1/2 p-2 bg-white rounded-full cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </div>
        <div
          onClick={() => scroll("right")}
          className="absolute z-20 right-5 bottom-1/2 p-2 bg-white rounded-full cursor-pointer shadow-md"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </div>

        {/* products container */}
        <div
          className="flex items-center gap-6 overflow-x-auto scrollbar-hide px-4"
          ref={scrollRef}
        >
          {loading ? (
            <NewArrivalsSkeleton />
          ) : (
            newArrivals.map((product) => (
              <div
                key={product._id}
                className="relative min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] bg-gray-900 rounded-lg overflow-hidden border border-gray-800 group flex-shrink-0"
              >
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-[400px] object-cover group-hover:scale-110 transition-all duration-300"
                />

                <div className="absolute left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm text-white px-4 py-4">
                  <Link 
                    to={`/product/${product._id}`} 
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="block"
                  >
                    <h4 className="text-lg font-semibold truncate hover:underline capitalize">
                      {product.name}
                    </h4>
                    <p className="text-sm mt-1">₹{product.price}</p>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
