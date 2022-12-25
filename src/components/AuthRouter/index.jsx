import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = ({ redirect = "/" } = {}) => {
  const { user } = useAuth();
  const { state } = useLocation();
  if (user) return <Navigate to={state?.redirect || redirect} />;

  return <Outlet />;
};

export default AuthRoute;
