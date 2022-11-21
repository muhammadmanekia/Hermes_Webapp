import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../Assets/logoWhite.png";
import { useNavigate } from "react-router-dom";
import usersSecurity from "../../Data/usersSecurity.json";
import { Alert } from "@mui/material";

const theme = createTheme();

export default function SignIn(props) {
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget); // Object used to easily create key value pairs. Allows the programmer to post data to API easily
    usersSecurity.map((user) => {
      // check for user authenticity
      if (
        user.username === data.get("username") &&
        user.password === data.get("password")
      ) {
        props.setUserAuth(true); //remove the barrier and allow the user to navigate to the homepage
        navigate("/");
      } else {
        setAlert(true); // if incorrect user name or password, send an alert
      }
      return null; //<-- to avoid a warning
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={8}
          direction="column"
          style={{ backgroundColor: "blue", height: "102vh" }}
        >
          <div
            style={{
              margin: "20px",
              marginTop: "25%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px",
              }}
            >
              <img src={logo} width="180" alt="" />
              <Typography
                fontSize={100}
                color="white"
                fontFamily={"Verdana, Arial, Helvetica, sans-serif"}
              >
                Hermes
              </Typography>
            </div>
            <Typography fontSize={65} color="white" textAlign={"center"}>
              Welcome Back!
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={4}
          direction="column"
          style={{ padding: "10px", marginTop: "auto", marginBottom: "auto" }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              >
                {alert ? (
                  <Alert
                    variant="filled"
                    severity="error"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  >
                    Your Username or Password is Incorrect
                  </Alert>
                ) : null}
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
