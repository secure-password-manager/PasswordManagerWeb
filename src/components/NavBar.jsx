import React from "react";
import { Tab, Box, Grid, AppBar, Stack, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { logoutAccount } from "@/common/ServerAPI"
import { useGlobalStore } from "@/common/useGlobalStore";

export default function NavBar() {
  const navigate = useNavigate();
  const symmetricKey = useGlobalStore((state) => state.symmetricKey);
  const { deleteSymmetricKey } = useGlobalStore();

  const handleLogout = async () => {
    deleteSymmetricKey();
    localStorage.removeItem("key-fortress");
    try {
      await logoutAccount();
      navigate("/login-signup");
    } catch(err) {
      navigate("/login-signup");
    }
  }

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
          {symmetricKey && (
          <Tab label="Dashboard" onClick={() => navigate("/dashboard")} />
        )}
        {symmetricKey ? (
          <Tab label="Log Out" onClick={handleLogout} />
        ) : (
          <Tab
            label="Log in/Sign Up"
            onClick={() => navigate("/login-signup")}
          />
        )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
