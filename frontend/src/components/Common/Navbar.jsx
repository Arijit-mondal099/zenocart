import { useState } from "react";
import { Search, ShoppingCart, X } from "lucide-react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/appSlice";
import { MenuSvg } from "../../assets";
import { navLinks } from "../../lib/constant";
import { fetchProducts } from "../../features/productSlice";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const { openSidebar } = useSelector((store) => store.app);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const gender = searchParams.get("gender");
  const category = searchParams.get("category");
  const activeKey = gender ? `gender:${gender}` : category ? `category:${category}` : "";

  const handleSerach = (e) => {
    e.preventDefault();
    dispatch(fetchProducts({ search: searchItem }));
    navigate(`/collections/all?search=${searchItem}`);
  };

  return (
    <nav className="w-full py-4 px-2 sm:px-8 md:px-16 lg:px-24">
      <div className="flex items-center justify-between">
        {/* App logo */}
        <Link to={"/"} className="flex items-center justify-center gap-1 group">
          <div className="bg-white p-1.5 rounded-lg">
            <ShoppingCart className="h-5 w-5 text-black font-bold" />
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            <span className="text-2xl md:text-3xl">Z</span>eno<span className="text-2xl md:text-3xl">C</span>art
          </h1>
        </Link>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-700 border border-gray-200 py-1 px-2 rounded-full bg-gray-50">
          <div className="flex gap-2 flex-wrap">
            {navLinks.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                end
                className={`px-3 py-1 rounded-full hover:underline transition-all duration-200 ${
                  activeKey === item.key ? "bg-gray-800 text-white" : ""
                }`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center gap-2 sm:gap-4 text-gray-700">
          {/* search btn */}
          <button
            onClick={() => setShowSearch(true)}
            className="cursor-pointer bg-white p-2 rounded-full group"
          >
            <Search className="w-5 h-5 text-black group-hover:scale-115 transition-all duration-200" />
          </button>

          {/* user cart */}
          <button
            className="relative cursor-pointer bg-white p-2 rounded-full group"
            onClick={() => {
              navigate("/cart");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ShoppingCart className="w-5 h-5 text-black group-hover:scale-115 transition-all duration-200" />
          </button>

          {/* user profile */}
          {user && user._id ? (
            <button
              onClick={() => {
                navigate("/profile");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hidden lg:flex text-center cursor-pointer bg-white p-2 rounded-full group"
            >
              <p className="w-5 h-5 text-black font-medium text-xl group-hover:scale-115 transition-all duration-200 flex items-center justify-center">
                {user?.name[0].toUpperCase()}
              </p>
            </button>
          ) : (
            <Link
              to={"/login"}
              className="hidden lg:block bg-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-70 transition-all duration-300 cursor-pointer"
            >
              login
            </Link>
          )}

          {/* hamburger button */}
          <div
            className="lg:hidden p-2 rounded-full bg-gradient-to-r bg-white h-9 w-9 flex items-center justify-center"
            onClick={() => dispatch(toggleSidebar())}
          >
            <MenuSvg openNavigation={openSidebar} />
          </div>
        </div>
      </div>

      {/* search section */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-2 sm:p-6">
          <form
            onSubmit={handleSerach}
            className="flex items-center justify-center w-full p-2"
          >
            <input
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search here"
              className="outline-none px-4 py-2 rounded-md rounded-r-none border border-gray-200 bg-gray-100 border-r-0 w-full max-w-md"
            />

            <button
              type="submit"
              className="border border-l-0 p-2 rounded-md rounded-l-none border-gray-200 bg-gray-100 cursor-pointer"
            >
              <Search className="w-6 h-6 text-gray-600" />
            </button>
          </form>

          <X
            className="h-6 w-6 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
            onClick={() => setShowSearch(false)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
