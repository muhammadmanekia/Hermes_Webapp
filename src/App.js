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
  const url = useLocation(); // Grab the current URL
  const [userAuth, setUserAuth] = useState(false); // set initial user Auth value as false

  const setUserAuthHandler = (bool) => {
    // Method for a change in user authentication boolean
    setUserAuth(bool);
    console.log(userAuth);
  };

  return (
    <div>
      {url.pathname.includes("signin") || // Navbar visible on every page but the sign in and sign up
      url.pathname.includes("signup") ? null : (
        <Navbar />
      )}

      <Routes>
        {/* Routing Starts Here [BTW, since this is JSX, I can only comment like this] */}
        <Route
          path="/"
          element={
            <PrivateRoute userAuth={userAuth}>
              {" "}
              {/* Parent to Home page, makes sure that the user has signed in before they can access the homepage */}
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
