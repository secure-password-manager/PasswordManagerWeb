import * as React from "react";
import { Tab, Box, Grid, AppBar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import Logo from "./Logo";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <AppBar>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
        alignItems="center"
      >
        <Stack direction="row">
          <Logo />
          <Tab
            sx={{ paddingLeft: 5 }}
            label="Home"
            onClick={() => navigate("/")}
          />
          <Tab label="Dashboard" onClick={() => navigate("/dashboard")} />
          <Tab
            label="Log in/Sign Up"
            onClick={() => navigate("/login-signup")}
          />
        </Stack>
      </Box>
    </AppBar>
  );
}
