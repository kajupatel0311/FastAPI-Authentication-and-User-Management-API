import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { getAccessToken } from "../services/tokenService";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({
  children,
}: ProtectedRouteProps) {

  useAuth();

  const token = getAccessToken();

  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  return children;

}

export default ProtectedRoute;
