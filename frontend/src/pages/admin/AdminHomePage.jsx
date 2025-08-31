import { Ban, Box, Car, CheckCheck, CircleDashed, ListMinus, Users, Zap } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchOrdersInfo, fetchProducts, fetchUsers } from "../../features/adminSlice";

const AdminHomePage = () => {
  const { totalSells, totalUsers, totalProducts, totalOrders, orders, totalCompletedOrders, totalPendingOrders, totalCancelledOrders } =
    useSelector((store) => store.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchOrdersInfo());
  }, [dispatch]);

  return (
    <div className="w-full space-y-5 md:space-y-8 pb-10">
      <h1 className="text-2xl md:text-4xl font-bold text-white pt-2">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4">
        <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-800 hover:scale-95 transition-all duration-300">
          <div className="p-2 text-white rounded-lg">
            <Zap className="w-20 h-20 text-blue-600" />
          </div>

          <div className="space-y-0.5">
            <p className="text-white text-lg font-semibold">Revenue</p>
            <p className="text-2xl text-white font-bold tracking-tight">
              ₹{totalSells.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-900 hover:scale-95 transition-all duration-300">
          <div className="p-2 text-white rounded-lg">
            <Car className="w-20 h-20 text-green-600" />
          </div>

          <div className="space-y-0.5">
            <p className="text-white text-lg font-semibold">Total Orders</p>
            <p className="text-2xl text-white font-bold tracking-tight">
              {totalOrders}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-800 hover:scale-95 transition-all duration-300">
          <div className="p-2 text-white rounded-lg">
            <Box className="w-20 h-20 text-yellow-600" />
          </div>

          <div className="space-y-0.5">
            <p className="text-white text-lg font-semibold">Total Products</p>
            <p className="text-2xl text-white font-bold tracking-tight">
              {totalProducts}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-800 hover:scale-95 transition-all duration-300">
          <div className="p-2 text-white rounded-lg">
            <Users className="w-20 h-20 text-cyan-600" />
          </div>

          <div className="space-y-0.5">
            <p className="text-white text-lg font-semibold">Total Users</p>
            <p className="text-2xl text-white font-bold tracking-tight">
              {totalUsers}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-800 hover:scale-95 transition-all duration-300">
          <div className="p-2 text-white rounded-lg">
            <CheckCheck className="w-20 h-20 text-cyan-600"  />
          </div>

          <div className="space-y-0.5">
            <p className="text-white text-lg font-semibold">Total Completed Orders</p>
            <p className="text-2xl text-white font-bold tracking-tight">
              {totalCompletedOrders}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-800 hover:scale-95 transition-all duration-300">
          <div className="p-2 text-white rounded-lg">
            <CircleDashed className="w-20 h-20 text-cyan-600" />
          </div>

          <div className="space-y-0.5">
            <p className="text-white text-lg font-semibold">Total Pending Orders</p>
            <p className="text-2xl text-white font-bold tracking-tight">
              {totalPendingOrders}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-800 hover:scale-95 transition-all duration-300">
          <div className="p-2 text-white rounded-lg">
            <Ban className="w-20 h-20 text-red-600" />
          </div>

          <div className="space-y-0.5">
            <p className="text-white text-lg font-semibold">Total Cancelled Orders</p>
            <p className="text-2xl text-white font-bold tracking-tight">
              {totalCancelledOrders}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1 text-white mb-6">
          <ListMinus className="h-8 w-8" />
          <span className="text-2xl font-bold">Recent Orders</span>
        </div>

        <div className="overflow-x-auto">
          <div className="space-y-1 min-w-2xl md:w-full border border-gray-800 bg-gray-900 rounded-lg p-4">
            {/* headeing */}
            <div className="grid gap-2 grid-cols-[2fr_1fr_1fr_1fr] bg-gray-800 px-2 py-4 rounded-md text-sm font-bold text-gray-200">
              <p>ORDER ID</p>
              <p>USER</p>
              <p>TOTAL PRICE</p>
              <p>STATUS</p>
            </div>

            {/* body */}
            <div className="space-y-1">
              {orders?.slice(0, 5)?.map((item) => (
                  <div
                    className="grid gap-2 grid-cols-[2fr_1fr_1fr_1fr] even:bg-gray-800 px-2 py-4 rounded-md text-sm text-gray-200 hover:bg-gray-700 transition-all duration-200"
                    key={item?._id}
                  >
                    <p>#{item?.paymentDetails?.orderId}</p>
                    <p className="capitalize">{item?.user?.name}</p>
                    <p className="font-semibold">₹{item?.totalPrice}</p>
                    <p className="font-semibold text-sm">
                      {item?.isDelivered ? (
                        <span className="text-green-500">Delivered 🎉</span>
                      ) : (
                        item?.status === "cancelled" ? (
                          <span className="text-red-500">Cancelled 🚫</span>
                        ) : (
                          <span className="text-yellow-500">Pending ⏳</span>
                        )
                      )}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
