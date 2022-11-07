import "./App.css";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import SignIn from "./Pages/Signin/Signin";
import { useLocation } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import React, { useState } from "react";

function App() {
  const url = useLocation();
  const [userAuth, setUserAuth] = useState(false);

  const setUserAuthHandler = (bool) => {
    setUserAuth(bool);
    console.log(userAuth);
  };

  return (
    <div>
      {url.pathname.includes("signin") ||
      url.pathname.includes("signup") ? null : (
        <Navbar />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute userAuth={userAuth}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={<Signup setUserAuth={setUserAuthHandler} />}
        />
        <Route
          path="/signin"
          element={<SignIn setUserAuth={setUserAuthHandler} />}
        />
      </Routes>
    </div>
  );
}

export default App;
