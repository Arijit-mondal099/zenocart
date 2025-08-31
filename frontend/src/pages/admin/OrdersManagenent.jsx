import { ChevronLeft, ListMinus } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders, updateOrderStatus } from "../../features/adminSlice";
import toast from "react-hot-toast";

const OrdersManagenent = () => {
  const { orders } = useSelector((store) => store.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdateOrderStatus = (e, orderId) => {
    const status = e.target.value;
    dispatch(updateOrderStatus({ orderId, status }))
      .unwrap()
      .then(() => toast.success("Order status updated"))
      .catch(() => toast.error("Something went wrong!"));
  };

  const handleMarkOrderDelivered = (orderId) => {
    dispatch(updateOrderStatus({ orderId, status: "delivered" }))
      .unwrap()
      .then(() => toast.success("Order delivered successfully"))
      .catch(() => toast.error("Something went wrong!"));
  }

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="space-y-6 pb-10">
      <div
        className="flex items-center text-gray-400 cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        <ChevronLeft />
        Back to dashboard
      </div>

      <div className="space-y-4">
        <p className="text-3xl md:text-4xl font-bold text-white pb-6">
          Order Management
        </p>

        <div className="overflow-x-auto">
          <div className="space-y-1 min-w-4xl md:w-full p-4 border border-gray-800 bg-gray-900 rounded-lg">
            <div className="flex items-center gap-2 text-white mb-6">
              <ListMinus />
              <p className="text-lg font-bold">Orders list</p>
            </div>
            <div className="grid grid-cols-5 items-center gap-2 text-sm text-gray-200 font-bold px-2 py-4 bg-gray-800 rounded-md">
              <div>ORDER ID</div>
              <div>CUSTOMER</div>
              <div>TOTAL PRICE</div>
              <div>STATUS</div>
              <div>ACTION</div>
            </div>

            {orders.map((order) => (
              <div
                key={order?._id}
                className="grid grid-cols-5 items-center gap-2 text-sm text-gray-200 even:bg-gray-800 px-2 py-2.5 rounded-md hover:bg-gray-700 transition-all duration-200"
              >
                <div>#{order?.paymentDetails?.orderId}</div>
                <div className="capitalize">{order?.user?.name}</div>
                <div>₹{order?.totalPrice}</div>
                <div>
                  <select
                    disabled={order?.isDelivered || order?.status === "cancelled"}
                    name="status"
                    value={order?.status}
                    className="px-2 py-1 border border-gray-800 bg-gray-700 rounded-md disabled:opacity-25"
                    onChange={(e) => handleUpdateOrderStatus(e, order._id)}
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  {order.isDelivered ? (
                    <p className="text-lg font-semibold text-green-500">Delivered 🎉</p>
                  ) : (
                    order?.status === "cancelled" ? (
                      <p className="text-lg font-semibold text-red-500">Cancelled 🚫</p>
                    ) : (
                      <button 
                        className="bg-green-600 px-2 py-1 rounded-md text-white text-sm cursor-pointer hover:scale-95 transition-all duration-300 disabled:opacity-25"
                        onClick={() => handleMarkOrderDelivered(order?._id)}
                      >
                        Mark as Delivered
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersManagenent;
