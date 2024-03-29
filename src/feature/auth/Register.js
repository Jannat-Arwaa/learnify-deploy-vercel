import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserRegister,
  registrationClean,
} from "../../state/reducers/auth/registerSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";
import { theme } from "../../Theme/AppTheme";
const defaultTheme = createTheme();
const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, success, error, errorMessage } = useSelector(
    (state) => state.register
  );
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrorMessage] = useState("");
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const data = {
      name,
      email,
      address,
      role: "student",
      password,
      phone,
      language,
    };
    if (name === "" || language === "" || phone === "") {
      setErrorMessage("name, phone and language required fields.");
    } else if (email === "" || password === "") {
      setErrorMessage("Email and password are required fields.");
    } else if (!isValidEmail(email)) {
      setErrorMessage("Invalid email address format.");
    } else {
      dispatch(createUserRegister(data));
    }
  };
  useEffect(() => {
    // Check if registration was successful
    if (success) {
      // Display a success toast
      toast.success("Account Created Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      const timer = setTimeout(() => {
        dispatch(registrationClean());
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (error) {
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(registrationClean());
    }
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [success, error, errMsg, navigate, dispatch, errorMessage]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          marginTop: { xs: 4, sm: 4, md: 8 },
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ToastContainer />
        {isLoading ? (
          <Loader />
        ) : (
          <Container
            component="main"
            maxWidth="xs"
            className="border rounded shadow-md"
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                "& > *": { my: 2 },
                alignItems: "center",
                mx: "auto",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <Box component="form" noValidate sx={{ mt: 6 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="Name"
                      required
                      fullWidth
                      id="Name"
                      label="Name"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="Phone"
                      label="Phone"
                      name="Phone"
                      autoComplete="family-name"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <select
                      name="Gender"
                      className="w-full h-12 border rounded p-2"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option>Select Language </option>
                      <option>Bangla </option>
                      <option>English </option>
                      <option>Hindhi </option>
                      <option>French</option>
                    </select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: `${theme.buttonColor}` }}
                  className="h-12"
                  onClick={submitForm}
                >
                  Register
                </Button>
                <Grid container justifyContent="flex-end" className="mb-4">
                  <Grid item>
                    <Link to="/login" variant="body2">
                      Already have an account?{" "}
                      <span className="text-blue-500 ">Login</span>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Register;
