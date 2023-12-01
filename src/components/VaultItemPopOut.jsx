import React, { useState } from "react";
import {
  ContentCopy,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";

import AlertSnackbar from "./AlertSnackbar";

export default function VaultItemPopOut(props) {
  const {
    handleClosePopOut,
    handleTogglePassword,
    open,
    showPassword,
    vaultItem,
  } = props;

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCopyPassword = () => {
    if (vaultItem.password) {
      navigator.clipboard.writeText(vaultItem.password);
      setOpenSnackbar(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClosePopOut}
      fullWidth
      maxWidth="sm">
      <DialogTitle>Account Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            defaultValue={vaultItem.name}
            variant="outlined"
            label="Account Name"
            inputProps={{ readOnly: true }}></TextField>
          <TextField
            defaultValue={vaultItem.url}
            variant="outlined"
            label="URL"
            inputProps={{ readOnly: true }}></TextField>
          <TextField
            defaultValue={vaultItem.username}
            variant="outlined"
            label="Username"
            inputProps={{ readOnly: true }}></TextField>
          <TextField
            defaultValue={vaultItem.password}
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      onMouseDown={handleTogglePassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password copy"
                      onClick={handleCopyPassword}
                      onMouseDown={handleCopyPassword}>
                      <ContentCopy />
                    </IconButton>
                  </InputAdornment>
                </>
              ),
            }}></TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClosePopOut}>Close</Button>
      </DialogActions>
      <AlertSnackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        duration={2000}
        message={"Password Copied"}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        severity={"success"}
      />
    </Dialog>
  );
}
