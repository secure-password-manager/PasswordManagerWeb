import React, { useState } from "react";
import { Tab, Tabs, TextField, Stack, Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const errorMessages = {
  mismatch: "Passwords do not match",
  empty: "",
  invalidEmail: "Email is invalid",
  passwordLength: "Password must be 12 character minimum.",
};

const clearError = {
  status: false,
  message: errorMessages.empty,
};

const emailRegEx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function LoginForm() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(clearError);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(clearError);

  const [passwordVerification, setPasswordVerification] = useState("");
  const [passwordVerificationError, setPasswordVerificationError] =
    useState(clearError);

  const navigate = useNavigate();

  const handleTabChange = (event, tabIndex) => {
    setCurrentTabIndex(tabIndex);
    setEmail("");
    setPassword("");
    setPasswordVerification("");
    setEmailError(clearError);
    setPasswordError(clearError);
    setPasswordVerificationError(clearError);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!emailRegEx.test(event.target.value)) {
      setEmailError({ status: true, message: errorMessages.invalidEmail });
    } else {
      setEmailError(clearError);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 12) {
      setPasswordError({
        status: true,
      });
    } else {
      setPasswordError(clearError);
    }
  };

  const handlePasswordVerificationChange = (event) => {
    setPasswordVerification(event.target.value);
    if (event.target.value !== password) {
      setPasswordVerificationError({
        status: true,
        message: errorMessages.mismatch,
      });
    } else {
      setPasswordVerificationError(clearError);
    }
  };

  const onLogin = (event) => {
    event.preventDefault();
    alert("Welcome " + email);
  };

  const onCreateAccount = (event) => {
    event.preventDefault();

    // Null check
    if (password === "" || passwordVerification === "" || email === "") {
      alert("Missing required fields");
      return;
    }

    // Same Password
    if (passwordVerification !== password) {
      setPasswordVerificationError({
        status: true,
        message: errorMessages.mismatch,
      });
      return;
    }

    // Status Check
    if (
      passwordError.status ||
      passwordVerificationError.status ||
      passwordError.status
    ) {
      console.log("Can't save");
      return;
    }

    // Handle api call here
    console.log("save");
    navigate("/dashboard");
  };

  return (
    <Container
      sx={{
        width: "25%",
        border: "1px solid gray",
        minWidth: "200px",
      }}
    >
      <Tabs
        value={currentTabIndex}
        sx={{ borderBottom: 1 }}
        onChange={handleTabChange}
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      {currentTabIndex === 0 && (
        <form onSubmit={onLogin}>
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              <TextField
                onChange={handleEmailChange}
                value={email}
                type="email"
                id="email-login"
                label="Email"
                variant="outlined"
              />
              <TextField
                onChange={handlePasswordChange}
                value={password}
                type="password"
                id="password-login"
                label="Password"
                variant="outlined"
                helperText=""
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "25%", float: "right" }}
              >
                Login
              </Button>
            </Stack>
          </Box>
        </form>
      )}
      {currentTabIndex === 1 && (
        <form onSubmit={onCreateAccount}>
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              <TextField
                error={emailError.status}
                onChange={handleEmailChange}
                value={email}
                id="email-signup"
                label="Email"
                variant="outlined"
                helperText={emailError.message}
              />
              <TextField
                error={passwordError.status}
                onChange={handlePasswordChange}
                value={password}
                type="password"
                id="password-signup"
                label="Password"
                variant="outlined"
                helperText={errorMessages.passwordLength}
              />
              <TextField
                error={passwordVerificationError.status}
                onChange={handlePasswordVerificationChange}
                value={passwordVerification}
                type="password"
                id="password-verify"
                label="Verify Password"
                variant="outlined"
                helperText={passwordVerificationError.message}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "25%", float: "right" }}
              >
                Sign Up
              </Button>
            </Stack>
          </Box>
        </form>
      )}
    </Container>
  );
}

export default LoginForm;
