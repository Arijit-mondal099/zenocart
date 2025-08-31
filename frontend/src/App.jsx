import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedinUser } from "./features/authSlice";
import { Loader } from "lucide-react";

import UserLayout from "./components/Layout/UserLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderConfim from "./pages/OrderConfim";
import OrderDetails from "./pages/OrderDetails";
import AdminHomePage from "./pages/admin/AdminHomePage";
import UsersManagement from "./pages/admin/UsersManagement";
import ProductsManagement from "./pages/admin/ProductsManagement";
import OrdersManagenent from "./pages/admin/OrdersManagenent";
import EditProductPage from "./pages/admin/EditProductPage";
import ProtectedAdminRoute from "./components/Protected/ProtectedAdminRoute";
import AddProduct from "./pages/admin/AddProduct";

const App = () => {
  const { user, authChecking } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedinUser());
  }, [dispatch]);

  if (authChecking) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader className="w-6 h-6 md:w-8 md:h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Routes>
        {/* User layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="profile" element={user ? <Profile /> : <Navigate to={"/login"} />} />
          <Route path="checkout" element={user ? <Checkout /> : <Navigate to={"/login"} />} />
          <Route path="order-confirmation/:id" element={user ? <OrderConfim /> : <Navigate to={"/login"} />} />
          <Route path="order-details/:id" element={user ? <OrderDetails /> : <Navigate to={"/login"} />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
        </Route>

        {/* Admin layout */}
        <Route 
          path="/admin" 
          element={
            <ProtectedAdminRoute user={user}>
              <AdminLayout />
            </ProtectedAdminRoute>
          } 
        >
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="orders" element={<OrdersManagenent />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="create" element={<AddProduct />} />
          <Route path="products/:id" element={<EditProductPage />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
