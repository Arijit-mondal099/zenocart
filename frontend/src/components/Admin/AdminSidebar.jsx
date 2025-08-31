import { CalendarCheck, CirclePlus, Gift, LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleAdminSidebar } from "../../features/appSlice.js";
import { useEffect } from "react";

const AdminSidebar = () => {
  const { adminSidebar } = useSelector((store) => store.app);
  const dispath = useDispatch();

  useEffect(() => {
    if (adminSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [adminSidebar]);

  return (
    <div
      className={`absolute h-full w-64 sm:w-md border-r bg-gray-900 border-gray-800 space-y-6 px-4 py-4
        ${adminSidebar ? "translate-x-0" : "-translate-x-[150%]"}
        transition-transform duration-300 md:translate-x-0 md:static z-20 md:pl-24
      `}
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center text-xs text-black bg-white font-bold rounded-full">
          AM
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium text-white">Arijit Mondal</p>
          <p className="text-xs font-normal text-gray-400">
            arijitm717@gmail.com
          </p>
        </div>
      </div>

      <hr className="text-gray-800" />

      <div className="flex-1 flex flex-col">
        <div className="flex justify-center gap-4 flex-col w-full">
          <NavLink
            to={"/admin/users"}
            className={({ isActive }) =>
              `border border-gray-600 rounded-lg px-2 py-2.5 hover:scale-95 transition-all duration-300 text-white ${
                isActive ? "bg-green-600" : "bg-gray-800"
              }`
            }
            onClick={() => dispath(toggleAdminSidebar())}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <User className="w-5 h-5" />
              Users
            </div>
          </NavLink>

          <NavLink
            to={"/admin/products"}
            className={({ isActive }) =>
              `border border-gray-600 rounded-lg px-2 py-2.5 hover:scale-95 transition-all duration-300 text-white ${
                isActive ? "bg-green-600" : "bg-gray-800"
              }`
            }
            onClick={() => dispath(toggleAdminSidebar())}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Gift className="w-5 h-5" />
              Products
            </div>
          </NavLink>

          <NavLink
            to={"/admin/create"}
            className={({ isActive }) =>
              `border border-gray-600 rounded-lg px-2 py-2.5 hover:scale-95 transition-all duration-300 text-white ${
                isActive ? "bg-green-600" : "bg-gray-800"
              }`
            }
            onClick={() => dispath(toggleAdminSidebar())}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CirclePlus className="h-5 w-5" />
              Add New Product
            </div>
          </NavLink>

          <NavLink
            to={"/admin/orders"}
            className={({ isActive }) =>
              `border border-gray-600 rounded-lg px-2 py-2.5 hover:scale-95 transition-all duration-300 text-white ${
                isActive ? "bg-green-600" : "bg-gray-800"
              }`
            }
            onClick={() => dispath(toggleAdminSidebar())}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CalendarCheck className="w-5 h-5" />
              Orders
            </div>
          </NavLink>

          <button className="w-full border border-red-500 px-2 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
