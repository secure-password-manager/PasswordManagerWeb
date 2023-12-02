import * as React from "react";
import { Tab, Box, Grid, AppBar, Stack, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import Logo from "./Logo";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
      }}
      alignItems="center"
    >
      <AppBar>
        <Toolbar>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
