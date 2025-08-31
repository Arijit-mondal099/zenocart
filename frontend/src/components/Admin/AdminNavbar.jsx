import { ShoppingCart, Store } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MenuSvg } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { toggleAdminSidebar } from "../../features/appSlice";

const AdminNavbar = () => {
  const { adminSidebar } = useSelector((store) => store.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <nav className="fixed z-50 bg-gray-900/70 backdrop-blur-md top-0 w-full py-4 px-2 sm:px-8 md:px-16 lg:px-24 border-b border-gray-800">
      <div className="flex items-center justify-between">
        {/* App logo */}
        <Link to={"/admin"} className="flex items-center justify-center gap-1 group">
          <div className="bg-white p-1.5 rounded-lg">
            <ShoppingCart className="h-5 w-5 text-black font-bold" />
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            <span className="text-2xl md:text-3xl">Z</span>eno
            <span className="text-2xl md:text-3xl">C</span>art
          </h1>
        </Link>

        {/* Nav buttons */}
        <div className="flex items-center gap-2 sm:gap-4 text-gray-700">
          {/* admin page button */}
          <div
            className="flex cursor-pointer bg-white p-2 rounded-full text-black group"
            onClick={() => navigate("/")}
          >
            <Store className="w-5 h-5 group-hover:scale-125 transition-all duration-300" />
          </div>

          {/* hamburger button */}
          <div
            className="md:hidden p-2 rounded-full bg-white h-9 w-9 flex items-center justify-center"
            onClick={() => dispatch(toggleAdminSidebar())}
          >
            <MenuSvg openNavigation={adminSidebar} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
