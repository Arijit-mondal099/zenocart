import { Link, NavLink, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/appSlice";
import { useEffect } from "react";
import { navLinks } from "../../lib/constant";

const Sidebar = () => {
  const { openSidebar } = useSelector((store) => store.app);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const gender = searchParams.get("gender");
  const category = searchParams.get("category");
  const activeKey = gender ? `gender:${gender}` : category ? `category:${category}` : "";

  useEffect(() => {
    if (openSidebar) {
      document.body.style.overflow = "hidden"; // disables scroll
    } else {
      document.body.style.overflow = ""; // resets it to default
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openSidebar]);

  return (
    <div className="lg:hidden fixed inset-0 z-40 mt-15.5">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm mt-16"
        onClick={() => dispatch(toggleSidebar())}
      />

      <div
        className="absolute top-0 right-0 w-64 h-full bg-gray-900 backdrop-blur-md border-l border-gray-800 z-50 p-4 flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* user profile */}
        {user && user._id ? (
          <NavLink
            to={"/profile"}
            className="pt-6 flex items-center gap-2"
            onClick={() => dispatch(toggleSidebar())}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white p-2 text-white font-medium">
              <p className="text-black flex items-center justify-center text-lg">
                {user?.name[0].toUpperCase()}
              </p>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm font-medium text-white capitalize">Hi, {user?.name}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </NavLink>
        ) : (
          <Link
            to={"/login"}
            className="bg-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-70 transition-all duration-300 cursor-pointer text-center"
            onClick={() => dispatch(toggleSidebar())}
          >
            login
          </Link>
        )}

        <hr className="text-gray-800" />

        <div className="flex flex-col justify-center items-center gap-4 text-sm font-medium text-white">
          {navLinks.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              end
              onClick={() => dispatch(toggleSidebar())}
              className={`p-2 border border-gray-800 rounded-lg w-full ${
                activeKey === item.key && "bg-white text-black"
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
