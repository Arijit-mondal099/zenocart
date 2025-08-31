import { BaggageClaim, ChevronLeft, CircleCheck, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { decreaseQuantity, fetchCartItems, increaseQuantity, removeItemFromCart, updateCartItemQuantity } from "../features/cartSlice";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const { guestId, user } = useSelector((store) => store.auth);
  const { cartItems } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = user ? user._id : null;

  const handleRemeveCartItem = (itemData) => {
    dispatch(removeItemFromCart(itemData))
      .unwrap()
      .then(() => toast.success("Item removed successfully"))
      .catch(() => toast.error("Something went wrong try again!"))
  }

  const handelIncreaseItemQuantity = (productId, color, size, qty) => {
    const quantity = qty + 1;
    dispatch(increaseQuantity({ productId, color, size }));
    dispatch(updateCartItemQuantity({ productId, color, size, quantity, userId, guestId }))
      .then(() => toast.success("Item quantity updated"))
      .catch(() => toast.error("Something went wrong please try again!"))
  }

  const handelDecreaseItemQuantity = (productId, color, size, qty) => {
    const quantity = qty - 1;
    dispatch(decreaseQuantity({ productId, color, size }));
    dispatch(updateCartItemQuantity({ productId, color, size, quantity, userId, guestId }))
      .then(() => toast.success("Item quantity updated"))
      .catch(() => toast.error("Something went wrong please try again!"))
  }

  const handleNavigateCheckoutPage = () => {
    if ( user ) navigate("/checkout");
    else navigate("/login?redirect=cart")
  }
  
  useEffect(() => {
    dispatch(fetchCartItems({ userId, guestId }));
  }, [dispatch, userId, guestId]);

  return (
    <div className="min-h-screen">
      <div
        className="mb-4 flex items-center text-gray-500 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
        Back
      </div>

      {cartItems && cartItems?.products?.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Products */}
          <div className="flex-1 bg-gray-900 p-2 sm:p-4 rounded-lg border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <BaggageClaim className="h-6 w-6 text-white" />
              <h2 className="text-xl font-semibold text-white uppercase">
                Your Cart
              </h2>
            </div>

            <div className="space-y-2">
              {cartItems.products.map(
                ({ name, color, image, size, quantity, price, productId }, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-4 border border-gray-800 py-4 px-2 sm:p-4 rounded hover:scale-98 hover:bg-gray-800 transition-all duration-300"
                  >
                    {/* Product Image */}
                    <img
                      src={image}
                      alt={name}
                      className="w-20 h-20 object-cover rounded"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="text-white mb-4">
                        <h3 className="text-sm sm:text-lg font-semibold capitalize">
                          {name}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-0.5">
                          <span className="uppercase">Size: {size}</span>|
                          <span className="capitalize">Color: {color}</span>
                        </p>
                      </div>

                      <div className="flex gap-1 items-center">
                        <button 
                          className="p-1.5 rounded-md bg-gray-400 flex items-center justify-center cursor-pointer"
                          onClick={() => handelIncreaseItemQuantity(productId, color, size, quantity)}
                        >
                          <Plus className="h-4 w-4 text-white" />
                        </button>

                        <p className="p-1.5 text-white rounded-md border border-gray-500 w-7 h-7 flex items-center justify-center">
                          {quantity}
                        </p>

                        <button 
                          className="p-1.5 rounded-md bg-gray-400 flex items-center justify-center cursor-pointer"
                          onClick={() => handelDecreaseItemQuantity( productId, color, size, quantity)}
                        >
                          <Minus className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-lg font-bold text-white">₹{price}</p>

                      <button 
                        className="p-2 border border-red-500 text-red-500 rounded-full cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300"
                        onClick={() => handleRemeveCartItem({ productId, size, color, guestId, userId })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Side: Checkout */}
          <div className="w-full lg:w-1/3 bg-gray-900 p-4 rounded-lg border border-gray-800 h-fit text-white">
            <div className="flex items-center gap-2 mb-4">
              <CircleCheck className="w-6 h-6" />
              <h2 className="text-xl font-semibold uppercase">Checkout</h2>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(cartItems?.totalPrice || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span>Total</span>
                <span className="text-xl font-extrabold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(cartItems?.totalPrice || 0)}
                </span>
              </div>
              <button
                className="mt-4 w-full p-2.5 text-black font-bold rounded-lg bg-white transition-all cursor-pointer hover:scale-95 duration-300 capitalize"
                onClick={handleNavigateCheckoutPage}
              >
                proceed to checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <ShoppingCart className="w-16 h-16 text-white mb-4 animate-bounce" />
          <p className="text-2xl font-bold text-white mb-1">
            Your cart is empty
          </p>
          <p className="text-gray-400 text-center mb-6">
            Looks like you haven’t added anything to your cart yet.
          </p>
          <Link
            to="/collections/all"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 py-2.5 rounded-xl bg-white text-blcak font-semibold hover:scale-95 transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
