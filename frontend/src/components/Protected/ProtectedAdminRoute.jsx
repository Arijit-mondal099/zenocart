import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children, user }) => {
  if (user && user.role === "admin") return children;
  return <Navigate to={"/login"} />;
};

export default ProtectedAdminRoute;
