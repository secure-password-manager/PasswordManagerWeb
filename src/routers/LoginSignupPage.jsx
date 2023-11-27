import React from "react";
import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";

function LoginSignupPage() {
  return (
    <>
      <NavBar />
      <h1>Account Page</h1>
      <LoginForm></LoginForm>
    </>
  );
}

export default LoginSignupPage;
