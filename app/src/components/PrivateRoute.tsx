import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Provera tokena u localStorage
  const token = localStorage.getItem("token");

  // Ako nema tokena, preusmeri na /auth
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // Ako postoji token, prikazi rutu
  return <Outlet />;
};

export default PrivateRoute;
