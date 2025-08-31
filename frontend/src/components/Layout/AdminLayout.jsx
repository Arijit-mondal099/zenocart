import { Outlet } from "react-router-dom";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminSidebar from "../Admin/AdminSidebar";

const AdminLayout = () => {

  return (
    <>
      {/* navbar */}
      <AdminNavbar />

      <main className="h-screen w-full pt-16 flex gap-2">
        {/* sidebar */}
        <AdminSidebar />

        {/* content */}
        <div className="w-full p-2 md:p-4 md:pr-24 overflow-y-auto">
          {<Outlet />}
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
