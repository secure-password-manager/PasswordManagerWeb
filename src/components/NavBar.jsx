import * as React from "react";
import { Tab, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tab label="Home" onClick={() => navigate("/")} />
        <Tab label="Dashboard" onClick={() => navigate("/dashboard")} />
        <Tab label="Log in/Sign Up" onClick={() => navigate("/login-signup")} />
      </Box>
    </Box>
  );
}
