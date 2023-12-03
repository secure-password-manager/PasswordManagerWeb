import React from "react";
import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";
import { Stack } from "@mui/material";

function LoginSignupPage() {
  return (
    <>
      <Stack spacing={20} alignItems="center">
        <NavBar />
        <LoginForm></LoginForm>
      </Stack>
    </>
  );
}

export default LoginSignupPage;
