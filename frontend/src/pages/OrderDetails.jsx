import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchOrderById } from "../features/orderSlice";
import { formatDate } from "../lib/date";

const OrderDetails = () => {
  const { order, loading } = useSelector((store) => store.order);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center space-y-6 pt-20">
        <div className="w-full max-w-xl h-4 rounded-lg animate-pulse bg-gray-400 " />
        <div className="w-full max-w-4xl h-[50vh] animate-pulse bg-gray-400 rounded-lg" />
      </div>
    );
  }

  console.log(order)

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto space-y-5">
      <div
        className="mb-10 flex items-center text-gray-500 cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <ChevronLeft />
        Back to my orders
      </div>

      <h2 className="text-2xl lg:text-4xl font-bold text-white text-center">
        Order Details
      </h2>

      {order ? (
        <div className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 lg:p-4 space-y-10">
          {/* order details */}
          <div className="flex justify-between flex-wrap gap-2">
            <div className="space-y-0.5">
              <p className="text-xl font-bold text-white">
                Order ID: {order?.paymentDetails?.orderId}
              </p>
              <p className="text-sm font-medium text-gray-200">
                Order Date: {formatDate(order?.createdAt)}
              </p>
              {order?.deliveredAt && <p className="text-sm font-medium text-gray-200">
                Delivered At: {formatDate(order?.deliveredAt)}
              </p>}
              {order?.cancelledAt && <p className="text-sm font-medium text-gray-200">
                Cancelled At: {formatDate(order?.cancelledAt)}
              </p>}
            </div>

            <div className="space-y-0.5 text-center">
              <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500 text-white">
                Approved
              </div>

              <div
                className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                  order?.status === "cancelled" ? "bg-red-600" : "bg-yellow-500"
                }`}
              >
                {order?.status}
              </div>
            </div>
          </div>

          {/* order information */}
          <div className="grid grid-cols-2">
            <div className="space-y-0.5">
              <p className="text-lg font-semibold text-white">Payment Info</p>
              <div className="text-sm font-medium text-white flex flex-col sm:flex-row">
                Payment Method:
                <div className="flex">
                  <img
                    src="https://cdn.brandfetch.io/idkF-POU5R/w/163/h/163/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1751118783668"
                    alt="razorpay"
                    className="w-4 h-4 sm:ml-2"
                  />
                  <span className="capitalize">{order?.paymentMethod}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-white capitalize">
                Status: {order?.paymentStatus}
              </p>
            </div>

            <div className="space-y-0.5">
              <p className="text-lg font-semibold text-white">Shipping Info</p>
              <p className="text-sm font-medium text-white">
                Shipping Method: Standared
              </p>
              <div className="text-sm font-medium text-white capitalize">
                <p>Address: {order?.shippingAddress?.address}</p>
                <p>City: {order?.shippingAddress?.city}</p>
                <p>Country: {order?.shippingAddress?.country}</p>
                <p>Postal Code: {order?.shippingAddress?.postalCode}</p>
              </div>
            </div>
          </div>

          {/* order products */}
          <div className="space-y-1 overflow-x-auto">
            <p className="text-lg font-semibold text-white">Products</p>

            <div className="border border-gray-800 rounded-lg w-2xl md:w-full">
              {/* data header */}
              <div className="grid gap-4 grid-cols-[4fr_1fr_1fr_1fr] py-2 px-2 border-b border-gray-800 text-xs md:text-sm font-semibold text-white">
                <p>Name</p>
                <p>Unit Price</p>
                <p>Quantity</p>
                <p>Total</p>
              </div>

              {/* data body */}
              <div className="space-y-2 p-2">
                {order?.orderItems?.map((item) => (
                  <div
                    key={item.productId}
                    className="grid gap-4 grid-cols-[4fr_1fr_1fr_1fr] items-center text-sm text-white font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-15 h-15 rounded-md object-cover"
                      />
                      <p className="text-sm font-medium capitalize">
                        {item.name}
                      </p>
                    </div>

                    <p>₹{item.price / item.quantity}</p>
                    <p>{item.quantity}</p>
                    <p>₹{item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-white font-semibold text-lg mt-4 mb-2">
              Total Price: ₹{order?.totalPrice}
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl border border-gray-600 rounded-lg space-y-2 text-center px-4 py-8 bg-gray-800 mt-20">
          <p className="text-4xl mb-6 animate-bounce">😟</p>
          <p className="text-2xl font-bold text-red-600 mb-6">
            🚫 No Order Data Found – Try Again
          </p>

          <Link
            to={"/profile"}
            className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-semibold hover:underline"
          >
            Back to profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
