import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../Assets/logoWhite.png";
import ReCAPTCHA from "react-google-recaptcha";
import usersSecurity from "../../Data/usersSecurity.json";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../Components/Auth/Auth";
import { Alert } from "@mui/material";

const theme = createTheme(); // mui theme, allows the website to have a standard for styling

export default function SignUp(props) {
  const [recaptcha, setRecaptcha] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validUsername, setValidUsername] = useState(true);
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [err, setErr] = useState(null);
  const { signUp } = useUserAuth();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await signUp(data.email, data.password, data);
      navigate("/");
    } catch (err) {
      setErr(err.message);
    }
  };

  const setEmail = (e) => {
    if (e.target.value.includes("@")) {
      setData({ ...data, email: e.target.value });
      console.log(data);
    }
    return;
  };

  const setUsername = (e) => {
    setValidUsername(true);
    setData({ ...data, username: e.target.value });
  };

  const setPassword = (e) => {
    setData({ ...data, password: e.target.value });
  };

  const confirmPasswordHandler = (e) => {
    console.log(e.target.value);
    if (data.password !== e.target.value) {
      setConfirmPassword(false);
    } else {
      setConfirmPassword(true);
    }
  };

  const lastNameHandler = (e) => {
    if (e.target.value.length > 0) {
      setValidLastName(true);
    }
    setData({ ...data, lastName: e.target.value });
  };

  const firstNameHandler = (e) => {
    if (e.target.value.length > 0) {
      setValidFirstName(true);
    }
    setData({ ...data, firstName: e.target.value });
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
            <Typography fontSize={55} color="white" textAlign={"center"}>
              Take Your College Life To The Next Level!
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => firstNameHandler(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => lastNameHandler(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    id="username"
                    autoFocus
                    helperText={
                      validUsername ? null : "username should be > 5 characters"
                    }
                    onChange={(e) => setUsername(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    helperText={
                      validPassword
                        ? null
                        : "password should include at least: 8 characters, 1 numbers, 1 special symbol"
                    }
                    onChange={(e) => setPassword(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    id="confirm_password"
                    helperText={
                      confirmPassword ? null : "password doesn't match"
                    }
                    onChange={(e) => confirmPasswordHandler(e)}
                  />
                </Grid>
              </Grid>
              <ReCAPTCHA
                style={{ textAlign: "-webkit-center", marginTop: "10px" }}
                sitekey="6LcxVCAjAAAAAF4a5aq0C1yh_kw1ViJCCCjAKuR6"
                onChange={() => setRecaptcha(false)} // adds recaptcha to the signup page
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={recaptcha || !confirmPassword}
                onClick={() => usersSecurity.push(data)}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
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
