import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  TriangleAlert,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import toast from "react-hot-toast";
import { clearCart } from "../features/cartSlice";
import { useEffect } from "react";
import { fetchOrders } from "../features/orderSlice";
import { formatDate } from "../lib/date";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const { orders, loading } = useSelector((store) => store.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutUser())
      .then(() => {
        dispatch(clearCart());
        toast.success("User logout successfully");
        navigate("/");
      })
      .catch(() => {
        toast.error("Something went wrong please try again!");
      });
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    user && (
      <div className="min-h-screen">
        <div
          className="mb-4 flex items-center text-gray-500 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
          Back
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4">
          {/* profile data */}
          <div className="mt-4 bg-gray-900 border border-gray-900 rounded-lg p-4 h-96">
            <div className="flex justify-between items-center gap-2">
              <p className="text-lg font-semibold text-white capitalize">
                Hii, {user?.name?.split(" ")[0]}
              </p>

              {user?.role === "admin" && (
                <div className="text-xs font-semibold text-white bg-green-600 py-2 px-3 rounded-lg hover:scale-95 transition-all duration-300">
                  <Link to={"/admin"}>Admin Dashboard</Link>
                </div>
              )}
            </div>

            <hr className="text-gray-800 my-4" />

            <div className="mb-4 space-y-1">
              <p className="text-sm font-semibold text-gray-500">Full Name</p>
              <p className="text-sm font-medium text-gray-200 p-2 border border-gray-200 rounded-lg bg-gray-800">
                {user?.name}
              </p>
            </div>
            <div className="mb-4 space-y-1">
              <p className="text-sm font-semibold text-gray-500">
                Email Address
              </p>
              <p className="text-sm font-medium text-gray-200 p-2 border border-gray-200 rounded-lg bg-gray-800">
                {user?.email}
              </p>
            </div>

            <hr className="text-gray-800 my-4" />

            <div className="flex gap-4 flex-col">
              <div className="flex items-center gap-2 text-sm font-medium text-red-500">
                <TriangleAlert className="h-5 w-5" />
                Denger Zone
              </div>

              <button
                className="flex items-center justify-center gap-2 w-full p-2.5 border border-red-500 bg-gray-900 rounded-lg text-red-500 text-sm font-medium hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* order data */}
          <div className="mt-4 bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-lg text-white font-semibold">
              <ShoppingBag className="w-5 h-5" />
              My Orders
            </div>

            <hr className="text-gray-800 my-4" />

            {/* scroll container */}
            {!loading ? (
              <div className="w-full overflow-x-auto">
                {orders && orders?.length > 0 ? (
                  <div className="w-6xl lg:w-full">
                    <div className="grid grid-cols-[0.8fr_2fr_2fr_3fr_1fr_1fr_1fr] text-sm font-bold text-white">
                      <p>IMAGE</p>
                      <p>ORDER ID</p>
                      <p>CREATED</p>
                      <p>ADDRESS</p>
                      <p>ITEMS</p>
                      <p>PRICE</p>
                      <p>STATUS</p>
                    </div>

                    <div className="space-y-2 mt-4">
                      {orders?.map((item) => (
                        <div
                          key={item._id}
                          onClick={() => navigate(`/order-details/${item._id}`)}
                          className="grid grid-cols-[0.8fr_2fr_2fr_3fr_1fr_1fr_1fr] items-center text-sm text-white odd:bg-gray-800 hover:bg-gray-700 p-1 rounded-lg transition-all duration-300 cursor-pointer"
                        >
                          <img
                            src={item.orderItems[0].image}
                            alt={item._id}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <p className="font-semibold">#{item.paymentDetails.orderId}</p>
                          <p>{formatDate(item.createdAt)}</p>
                          <p>{item.shippingAddress.address}</p>
                          <p>{item.orderItems.reduce((acc, pro) => acc + pro.quantity, 0)}</p>
                          <p>₹{item.totalPrice}</p>
                          <p className={`py-1 px-3 rounded-full ${item.status === "cancelled" ? "bg-red-600" : "bg-green-600"} capitalize`}>
                            {item.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10">
                    <ShoppingCart className="w-16 h-16 text-white mb-4 animate-bounce" />
                    <p className="text-white text-2xl font-semibold tracking-tight">
                      You have no orders yet.
                    </p>
                    <p className="text-gray-600 text-sm mt-1 mb-6">
                      Start shopping to see your orders here.
                    </p>
                    <Link
                      to="/collections/all"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className="px-6 py-2 rounded-xl bg-white text-blcak font-semibold hover:scale-95 transition-all duration-300"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4">
                <div className="w-full h-10 bg-gray-400 animate-pulse rounded-lg" />
                <div className="w-full h-10 bg-gray-400 animate-pulse rounded-lg" />
                <div className="w-full h-10 bg-gray-400 animate-pulse rounded-lg" />
                <div className="w-full h-10 bg-gray-400 animate-pulse rounded-lg" />
                <div className="w-full h-10 bg-gray-400 animate-pulse rounded-lg" />
                <div className="w-full h-10 bg-gray-400 animate-pulse rounded-lg" />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
