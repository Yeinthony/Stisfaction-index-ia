import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

export const ProtectedRoute = ({
  redirectTo = "/login",
  children,
}) => {

  const {isLogged} = useUser();

  if (!isLogged) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
