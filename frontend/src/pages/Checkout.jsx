import { BookOpenText, ChevronLeft, CircleCheck, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCheckoutSession } from "../features/checkoutSlice";
import { clearCart } from "../features/cartSlice"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-hot-toast";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const { cartItems } = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const initRazorpay = async (order, checkoutId) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "ZenoCart Payment",
      description: "Order payment",
      order_id: order.id,

      handler: async function (response) {
        try {
          // *** RAZORPAY PAYMENT VERIFICATION ***
          const verifyRes = await axiosInstance.put(
            "/api/checkout/verify-payment",
            { 
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature, 
            }
          );

          // *** FINANIZED ORDER ***
          if ( verifyRes.status === 200 ) {
            const res = await axiosInstance.post(`/api/checkout/${checkoutId}/finalize`);
            dispatch(clearCart()); // clear cart data LS
            toast.success("Order successfully!");
            console.log(res.data.value._id)
            navigate(`/order-confirmation/${res.data.value._id}`);
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment verification failed!");
        }
      },

      prefill: {
        name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        email: user?.email,
        contact: shippingAddress.phone,
      },
      theme: {
        color: "#0f172a",
        backdrop_color: "#000000",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handlePay = async (checkoutId) => {
    try {
      const res = await axiosInstance.post(`/api/checkout/${checkoutId}/create-payment`);
      if (res.data.success) {
        initRazorpay(res.data.value, checkoutId);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating payment!");
    }
  };

  const handleOnlinePayment = async (e) => {
    e.preventDefault();

    for (const key in shippingAddress) {
      if (!shippingAddress[key]) {
        toast.error("Please fill all fields!");
        return;
      }
    }

    // *** CREATE CHECKOUT SECTION ***
    try {
      const checkoutData = {
        checkoutItems: cartItems.products,
        shippingAddress,
        paymentMethod: "razorpay",
        totalPrice: cartItems.totalPrice,
      };

      const newSession = await dispatch(createCheckoutSession(checkoutData)).unwrap();

      // *** CREATE RAZORPAY PAYMENT ****
      handlePay(newSession._id);
    } catch (error) {
      console.error(error.message);
      toast.error("Checkout session failed!");
    }
  };

  return (
    <div className="min-h-screen">
      <div
        className="mb-4 flex items-center text-gray-500 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
        Back to Cart Page
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* left side section */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 lg:col-span-2 p-4">
          <div className="flex items-center gap-2 mb-4 text-white">
            <CircleCheck className="w-6 h-6" />
            <h2 className="text-xl font-semibold uppercase">checkout</h2>
          </div>

          <hr className="text-gray-800 mb-2" />

          <div className="space-y-2 mb-4">
            <p className="text-lg font-medium text-white">Contact Details</p>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">Email</p>
              <div className="flex items-center gap-2 text-gray-200 border border-gray-200 rounded-lg py-2.5 px-2 bg-gray-800">
                <Mail className="h-5 w-5" />
                <p className="text-sm">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-medium text-white">Deilvery</p>

            <form className="space-y-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">First Name</p>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full border text-white border-gray-400 py-2 px-2 rounded-lg focus:outline-none"
                    name="firstName"
                    value={shippingAddress.firstName}
                    onChange={handleChangeAddress}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Last Name</p>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full border border-gray-400 text-white py-2 px-2 rounded-lg focus:outline-none"
                    name="lastName"
                    value={shippingAddress.lastName}
                    onChange={handleChangeAddress}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-400">Address</p>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full border border-gray-400 text-white py-2 px-2 rounded-lg focus:outline-none"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleChangeAddress}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">City</p>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    className="w-full border border-gray-400 text-white py-2 px-2 rounded-lg focus:outline-none"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleChangeAddress}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Postal Code</p>
                  <input
                    type="text"
                    placeholder="Enter your postal code"
                    className="w-full border border-gray-400 text-white py-2 px-2 rounded-lg focus:outline-none"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleChangeAddress}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-400">Country</p>
                <input
                  type="text"
                  placeholder="Enter your country"
                  className="w-full border border-gray-400 text-white py-2 px-2 rounded-lg focus:outline-none"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleChangeAddress}
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-400">Phone</p>
                <input
                  type="text"
                  placeholder="Enter your phone"
                  className="w-full border border-gray-400 text-white py-2 px-2 rounded-lg focus:outline-none"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleChangeAddress}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-2 text-black font-semibold rounded-lg bg-white text-lg hover:scale-98 cursor-pointer transition-all duration-300 mt-5"
                onClick={handleOnlinePayment}
              >
                Pay ₹{cartItems?.totalPrice}
              </button>
            </form>
          </div>
        </div>

        {/* right side section */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
          <div className="flex items-center gap-2 mb-4 text-white">
            <BookOpenText className="w-6 h-6" />
            <h2 className="text-xl font-semibold uppercase">Order Summary</h2>
          </div>

          <hr className="text-gray-900 mb-2" />

          <div className="space-y-2">
            {cartItems?.products?.map(({ color, image, name, price, size }) => (
              <div
                key={name}
                className="border border-gray-800 rounded-lg p-2 flex gap-2 hover:scale-95 hover:bg-gray-700 transition-all duration-300"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="space-y-2">
                  <p className="text-sm font-medium text-white capitalize">
                    {name}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-gray-400 capitalize">
                    <span>Size: {size}</span>|<span>Color: {color}</span>
                  </p>
                  <p className="text-sm font-bold text-white">₹{price}</p>
                </div>
              </div>
            ))}
          </div>

          <hr className="text-gray-800 my-2" />

          <div className="space-y-2 mt-5">
            <div className="flex items-center justify-between gap-4 text-sm text-white">
              <p>Subtotal</p>
              <p className="font-bold">₹{cartItems?.totalPrice}</p>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm text-white">
              <p>Shipping</p>
              <p className="font-bold">FREE</p>
            </div>

            <hr className="text-gray-800 my-2" />

            <div className="flex items-center justify-between gap-4 text-sm text-white">
              <p>Total</p>
              <p className="font-bold">₹{cartItems?.totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
