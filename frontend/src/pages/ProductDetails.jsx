import { ChevronLeft, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, fetchSimilarProducts } from "../features/productSlice";
import { addItemToCart } from "../features/cartSlice";
import toast from "react-hot-toast";
import SimilarProducts from "../components/Products/SimilarProducts";
import ProductDetailsSkeleton from "../components/skeletonLoading/ProductDetailsSkeleton";

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { selectedProduct, similarProducts, loading } = useSelector((store) => store.product);
  const { user, guestId } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const userId = user ? user._id : null;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size!");
      return;
    }

    const cartData = {
      userId,
      guestId,
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
    dispatch(fetchProductDetails(id));
    dispatch(fetchSimilarProducts(id));
  }, [id, dispatch]);

  useEffect(() => {
    setMainImage(selectedProduct?.images?.[0]);
  }, [selectedProduct]);

  return (
    <div>
      <div
        className="mb-4 flex items-center text-gray-500 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
        Back
      </div>

      {loading ? (
        <ProductDetailsSkeleton />
      ) : (
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center py-8">
          <div className="flex justify-center flex-col md:flex-row gap-4">
            {/* left thumbles images */}
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
                    src={image.url}
                    alt="product-thumble-image"
                    className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* main thumble image */}
            <div className="w-full sm:w-1/2 rounded-lg overflow-hidden border border-gray-600">
              <img
                src={mainImage?.url}
                alt="thuble-image"
                className="w-md h-[400px] sm:h-[500px] object-cover hover:scale-110 transition-all duration-300"
              />
            </div>

            {/* mobile thumbles images */}
            <div className="md:hidden flex gap-2 flex-row md:flex-col">
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
                    alt="product-thumble-image"
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

              {/* prodct price section */}
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

              {/* product sizes section */}
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
              
              {/* add to cart btn */}
              <button
                className="w-full bg-white text-black px-2 py-2 rounded-lg text-sm font-bold mt-4 cursor-pointer hover:scale-95 transition-all duration-300"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
               
              {/* aditional details of product */}
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

      <SimilarProducts
        similarProducts={similarProducts}
        loading={loading}
        key={"similar-products"}
      />
    </div>
  );
};

export default ProductDetails;
