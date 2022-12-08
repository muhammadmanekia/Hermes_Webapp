import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../Components/Auth/Auth";

function Settings() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      style={{ marginTop: "auto", marginBottom: "auto", textAlign: "center" }}
    >
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default Settings;
