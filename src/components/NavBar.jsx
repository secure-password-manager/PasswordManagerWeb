import React from "react";
import { Tab, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tab label="Home" onClick={() => navigate("/")} />
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
      </Box>
    </Box>
  );
}
