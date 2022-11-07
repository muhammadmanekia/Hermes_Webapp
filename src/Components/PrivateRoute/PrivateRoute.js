import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ userAuth, children }) => {
  return userAuth ? children : <Navigate to="/signin" />; // conditional statement to navigate to signin if not authenticated
};

export default PrivateRoute;
