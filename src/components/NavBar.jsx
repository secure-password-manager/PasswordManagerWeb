import React, { useState } from "react";
import { Tab, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutAccount } from "@/common/ServerAPI"
import { useGlobalStore } from "@/common/useGlobalStore";
import SnackBar from "./SnackBar";

export default function NavBar() {
  const navigate = useNavigate();
  const symmetricKey = useGlobalStore((state) => state.symmetricKey);
  const { deleteSymmetricKey } = useGlobalStore();
  const [snackBarMessaage, setSnackBarMessage] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutAccount();
      deleteSymmetricKey();
      localStorage.removeItem("key-fortress");
      navigate("/login-signup");
    } catch(err) {
      setSnackBarMessage("Please sign in and try again.")
      setOpenSnackbar(true);
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
      <SnackBar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        duration={2000}
        message={snackBarMessaage}
        open={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
    </Box>
  );
}
