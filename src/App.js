import "./App.css";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import SignIn from "./Pages/Signin/Signin";
import { useLocation } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import React, { useState } from "react";
import Messages from "./Pages/Messages/Messages";
import UserProfile from "./Pages/Profile/Profile";
import { UserAuthContextProvider } from "./Components/Auth/Auth";
import Settings from "./Pages/Settings/Settings";

function App() {
  const url = useLocation(); // Grab the current URL

  return (
    <div>
      {url.pathname.includes("signin") || // Navbar visible on every page but the sign in and sign up
      url.pathname.includes("signup") ? null : (
        <Navbar />
      )}
      <UserAuthContextProvider>
        <Routes>
          {/* Routing Starts Here [BTW, since this is JSX, I can only comment like this] */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                {/* Parent to Home page, makes sure that the user has signed in before they can access the homepage */}
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile/user/:id" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
