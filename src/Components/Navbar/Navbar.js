import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import logo from "../../Images/smallLogo.png";
import { Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import logo from "../../Assets/logo.png";
import SearchBar from "../SearchBar/SearchBar";
const navItems = ["home", "messages", "profile", "settings"];

const Navbar = (props) => {
  var currentProfile = "Cameron Longhorn";
  return (
    <Box sx={{ display: "flex", flexGrow: 1, marginBottom: 20 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            margin: 20,
            marginLeft: 40,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center" }}>
            <img src={logo} width="70" />
            <Typography
              fontSize={20}
              color="black"
              fontWeight={700}
              fontFamily={"Verdana, Arial, Helvetica, sans-serif"}
            >
              Hermes
            </Typography>
          </div>
          <SearchBar />
        </div>
      </AppBar>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar style={{ marginTop: "auto", marginBottom: "auto" }}>
          <Typography
            variant="h6"
            component="div"
            color={"#000"}
            // sx={{ flexGrow: 1 }}
          >
            <Link to="/">
              {/* <img src={logo} alt="logo" width={120} style={{ padding: 12 }} /> */}
            </Link>
          </Typography>
          <Box sx={{ display: "grid", alignItems: "center" }}>
            {navItems.map((item) =>
              item === "home" || item === "profile" ? (
                item === "home" ? (
                  <Button
                    key={item}
                    sx={{
                      marginTop: 10,
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        color: "black",
                        textAlign: "left",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: 16,
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <HomeOutlinedIcon sx={{ fontSize: 40, padding: 1 }} />
                      {item}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    key={item}
                    sx={{
                      marginTop: 10,
                    }}
                  >
                    <Link
                      to={`/profile/user/${currentProfile
                        .split(" ")
                        .join("")
                        .toLowerCase()}`}
                      style={{
                        color: "black",
                        textAlign: "left",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: 16,
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <AccountCircleOutlinedIcon
                        sx={{ fontSize: 40, padding: 1 }}
                      />
                      {item}
                    </Link>
                  </Button>
                )
              ) : (
                <Button
                  key={item}
                  sx={{
                    marginTop: 10,
                  }}
                >
                  <Link
                    to={`/${item}`}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      fontWeight: "500",
                      fontSize: 16,
                      alignSelf: "center",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    {item.includes("settings") ? (
                      <SettingsIcon sx={{ fontSize: 40, padding: 1 }} />
                    ) : (
                      <ForumOutlinedIcon sx={{ fontSize: 40, padding: 1 }} />
                    )}
                    {item}
                  </Link>
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </Drawer>
    </Box>
  );
};

export default Navbar;
