import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import routes from "../constants/routes";

export interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <>{children}</>;
  }

  return <Navigate to={routes.auth} />;
};

export default PrivateRoute;
