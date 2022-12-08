import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../Auth/Auth";

const PrivateRoute = ({ userAuth, children }) => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children; // conditional statement to navigate to signin if not authenticated
};

export default PrivateRoute;
