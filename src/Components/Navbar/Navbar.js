import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import logo from "../../Assets/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import { useLocation } from "react-router-dom";

const navItems = ["home", "messages", "profile", "settings"];

// focusing on the sidebar and the top bar (called AppBar)
const Navbar = (props) => {
  var currentProfile = "Temoc"; // just for testing
  const location = useLocation(); // get url

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      {/* TopBar Appbar start */}
      {location.pathname === "/" ? (
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
              <img src={logo} width="70" alt="" />
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
      ) : null}

      {/* sidebar navbar start */}
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
                      to="/" // home doesn't have a name, because we want the users to land on this page directly
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
                        .join("") // link to your own profile. will be used in creating profile pages further into the project
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
                    to={`/${item}`} // messages will be "/messsages", settings will be "/settings"
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
