import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../features/orderSlice";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../lib/date";

const OrderConfim = () => {
  const { order, loading } = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const { id } = useParams();

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); // 10 day
    return orderDate.toLocaleDateString();
  };

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

  return order ? (
    <div className="min-h-screen flex flex-col items-center gap-6 pt-16">
      <h2 className="flex items-center gap-1 text-2xl lg:text-4xl font-bold text-white text-center">
        Order Confirmed! 🎉
      </h2>

      <div className="w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-lg p-2 lg:p-4 space-y-10">
        {/* order details */}
        <div className="flex justify-between flex-wrap gap-2">
          <div className="space-y-0.5">
            <p className="text-sm sm:text-xl font-bold text-white">
              Order ID: {order?.paymentDetails?.orderId}
            </p>
            <p className="text-xs sm:text-sm font-medium text-gray-200">
              Order Date: {formatDate(order?.createdAt)}
            </p>
          </div>

          <div className="text-xs sm:text-sm text-gray-200 font-medium">
            Estimated Delivery: {calculateEstimatedDelivery(order?.createdAt)}
          </div>
        </div>

        {/* checkout items */}
        <div className="flex flex-col gap-3 ">
          {order?.orderItems?.map((item) => (
            <div
              key={item?.productId}
              className="flex justify-between items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-16 sm:w-20 h-16 sm:h-20 rounded-lg border border-gray-200"
                />
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-lg font-semibold text-white capitalize">
                    {item?.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium">
                    <span className="capitalize">{item.color}</span> |{" "}
                    <span className="uppercase">{item.size}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-0.5">
                <p className="text-sm sm:text-lg font-semibold text-white">
                  ₹{item?.price}
                </p>
                <p className="text-xs sm:text-sm font-medium text-white">
                  Qty: {item?.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-white font-semibold text-sm sm:text-lg text-right -mt-6">
          Total Price: ₹{order?.totalPrice}
        </p>

        {/* payment info */}
        <div className="grid grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm sm:text-lg font-semibold text-white">
              Payment
            </p>
            <div className="text-sm font-medium text-gray-400 capitalize flex">
              <img
                src="https://cdn.brandfetch.io/idkF-POU5R/w/163/h/163/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1751118783668"
                alt="razorpay"
                className="w-4 h-4"
              />
              <span>{order?.paymentMethod}</span>
            </div>
          </div>
          <div className="text-xs sm:text-sm font-medium text-gray-400">
            <p className="text-sm sm:text-lg font-semibold text-white">
              Delivery
            </p>
            <p>{order?.shippingAddress?.address}</p>
            <p>
              {order?.shippingAddress?.city}, {order?.shippingAddress?.country}
            </p>
            <p>{order?.shippingAddress?.postalCode}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-full">
      <div className="w-full max-w-xl mx-auto mt-20 bg-gray-800 text-center px-4 py-8 rounded-lg border border-gray-600">
        <p className="text-4xl mb-6 animate-bounce">😟</p>
        <p className="text-2xl font-bold text-red-600 mb-6">
          🚫 No Order Confirm Data Found – Try Again
        </p>

        <Link
          to={"/cart"}
          className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-semibold hover:underline"
        >
          Back to cart
        </Link>
      </div>
    </div>
  );
};

export default OrderConfim;
