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
import { useUserAuth } from "../../Components/Auth/Auth";
import { ErrorOutline } from "@mui/icons-material";

const theme = createTheme();

export default function SignIn(props) {
  const { logIn } = useUserAuth();
  const [err, setErr] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await logIn(data.email, data.password);
      navigate("/");
    } catch (err) {
      setErr(err.message);
      console.log(err);
    }
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
                label="Email"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => setData({ ...data, email: e.target.value })}
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
                onChange={(e) => setData({ ...data, password: e.target.value })}
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
                {err ? (
                  <Alert
                    variant="filled"
                    severity="error"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  >
                    {err}
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
