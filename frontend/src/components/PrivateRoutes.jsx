import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const { auth } = useAuth();
  //   console.log({ auth });

  if (auth === undefined) return "loading...";

  return auth === true ? <Outlet /> : <Navigate to="/auth" />;
}

export default PrivateRoutes;
