import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestSellingProducts } from "../../features/productSlice.js";
import { addItemToCart } from "../../features/cartSlice.js";
import {
  BestSellerSkeleton,
  BestSellerSkeletonGrid,
} from "../skeletonLoading/BestSellerSkeleton.jsx";

const BestSeller = () => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { bestSellingProducts = [], loading } = useSelector(
    (store) => store.product
  );
  const { user, guestId } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const userId = user ? user._id : null;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size!");
      return;
    }

    const cartData = {
      userId: userId || null,
      guestId: guestId || null,
      productId: selectedProduct._id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    };

    dispatch(addItemToCart(cartData))
      .unwrap()
      .then(() => toast.success("Product added to cart"))
      .catch(() => toast.error("Error Please try again later!"));
  };

  useEffect(() => {
    dispatch(fetchBestSellingProducts());
  }, [dispatch]);

  useEffect(() => {
    if (bestSellingProducts.length > 0) {
      setSelectedProduct(bestSellingProducts[0]);
    }
  }, [bestSellingProducts]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  return (
    <div className="space-y-8 pt-25">
      <h2 className="text-2xl md:text-4xl font-bold text-white text-center">
        Best Seller
      </h2>

      {loading ? (
        <BestSellerSkeleton />
      ) : (
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
          <div className="flex justify-center flex-col md:flex-row gap-4">
            {/* left thumbnails for large screen */}
            <div className="hidden md:flex gap-2 flex-row md:flex-col">
              {selectedProduct?.images?.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    mainImage === image ? "border-gray-200" : "border-gray-600"
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={image?.url}
                    alt="product-thumbnail"
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* main image */}
            <div className="w-full sm:w-1/2 rounded-lg overflow-hidden border border-gray-800">
              {mainImage ? (
                <img
                  src={mainImage?.url}
                  alt="product-main"
                  className="w-md h-[400px] sm:h-[500px] object-cover hover:scale-110 transition-all duration-300"
                />
              ) : (
                <div className="w-full h-[400px] sm:h-[500px]" />
              )}
            </div>

            {/* mobile thumbnails */}
            <div className="md:hidden flex gap-2 flex-row md:flex-col">
              {selectedProduct?.images?.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    mainImage === image ? "border-gray-200" : "border-border-gray-600"
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={image?.url}
                    alt="product-thumbnail"
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* product details */}
            <div className="flex flex-col w-full max-w-sm">
              <h4 className="text-lg font-bold text-white tracking-tight capitalize">
                {selectedProduct?.name}
              </h4>

              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-white">
                  ₹{selectedProduct?.discountPrice}
                </p>
                <p className="text-xs text-gray-400 line-through">
                  ₹{selectedProduct?.price}
                </p>
              </div>

              <div className="text-sm text-gray-400 capitalize">
                {selectedProduct?.description}
              </div>

              {/* product color section */}
              <div className="pt-2">
                <p className="text-sm font-semibold text-white">Color:</p>
                <div className="flex items-center gap-2 pt-1">
                  {selectedProduct?.colors?.map((color, index) => (
                    <div
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                        selectedColor === color
                          ? "border-gray-200"
                          : "border-gray-600"
                      }`}
                      style={{ backgroundColor: color }}
                      key={index}
                    />
                  ))}
                </div>
              </div>

              {/* product size section */}
              <div className="pt-2">
                <p className="text-sm font-semibold text-white">Size:</p>
                <div className="flex items-center gap-2 pt-1">
                  {selectedProduct?.sizes?.map((s, index) => (
                    <div
                      onClick={() => setSelectedSize(s)}
                      className={`w-7 h-7 rounded-lg text-xs border-2 border-gray-600 cursor-pointer flex items-center justify-center font-semibold ${
                        selectedSize === s
                          ? "bg-gray-200 text-black border-gray-200"
                          : "bg-black text-white border-grray-600"
                      }`}
                      key={index}
                    >
                      {s.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>

              {/* quantity toggle btns */}
              <div className="pt-2">
                <p className="text-sm font-semibold text-white">Quantity:</p>
                <div className="flex gap-1 items-center pt-1">
                  <div
                    className="p-1.5 rounded-md bg-gray-400 flex items-center justify-center cursor-pointer"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  <p className="p-1.5 text-white rounded-md border border-gray-500 w-7 h-7 flex items-center justify-center">
                    {quantity}
                  </p>
                  <div
                    className="p-1.5 rounded-md bg-gray-400 flex items-center justify-center cursor-pointer"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    <Minus className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-white text-black px-2 py-2 rounded-lg text-sm font-bold mt-4 cursor-pointer hover:scale-95 transition-all duration-300"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>

              {/* products additional details */}
              <div className="pt-4">
                <p className="text-sm font-semibold text-white">
                  Characteristics:
                </p>
                <div className="grid grid-cols-2 gap-1 mt-2 text-sm font-medium text-gray-400 capitalize">
                  <p>Brand</p>
                  <p>{selectedProduct?.brand}</p>
                  <p>Material</p>
                  <p>{selectedProduct?.material}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl md:text-2xl font-bold text-white text-center pt-25">
        You May Also Like
      </h2>

      {loading ? (
        <BestSellerSkeletonGrid />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-6xl mx-auto gap-2">
          {(bestSellingProducts || []).map((product) => (
            <div
              className={`w-full rounded-lg overflow-hidden border border-gray-800 ${
                product?.name === selectedProduct?.name && "opacity-50"
              }`}
              key={product?._id}
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={product?.images?.[0]?.url}
                alt={product?.name || "product"}
                className="w-full h-full object-cover hover:scale-110 transition-all duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
