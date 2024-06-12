import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import routes from "../constants/routes.ts";

export interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to={`${routes.monitoring}`} state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default PublicRoute;
