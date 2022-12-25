import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = ({ redirect = "/" } = {}) => {
  const { user } = useAuth();
  if (!user) return <Navigate to={redirect} />;
  return <Outlet />;
};

export default PrivateRouter;
