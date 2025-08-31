import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import Hearder from "../Common/Hearder";
import Sidebar from "../Common/Sidebar";
import { useSelector } from "react-redux";

const UserLayout = () => {
  const { openSidebar } = useSelector((store) => store.app);

  return (
    <>
      {/* Header section */}
      <Hearder />
      {openSidebar && <Sidebar />}

      {/* Main content section */}
      <main className="w-full px-2 sm:px-8 md:px-16 lg:px-24 py-8">
        <Outlet />
      </main>

      {/* Footer section */}
      <Footer />
    </>
  );
};

export default UserLayout;
