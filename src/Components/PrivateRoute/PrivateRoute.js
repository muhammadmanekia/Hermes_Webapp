import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ userAuth, children }) => {
  return userAuth ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
