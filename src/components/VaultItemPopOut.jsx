import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
} from "@mui/material";

export default function VaultItemPopOut({ vaultItem, open, closePopup }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>Account Details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            defaultValue={vaultItem.name}
            variant="outlined"
            label="Account Name"
            inputProps={{ readOnly: true }}
          ></TextField>
          <TextField
            defaultValue={vaultItem.url}
            variant="outlined"
            label="URL"
            inputProps={{ readOnly: true }}
          ></TextField>
          <TextField
            defaultValue={vaultItem.username}
            variant="outlined"
            label="Username"
            inputProps={{ readOnly: true }}
          ></TextField>
          <TextField
            defaultValue={vaultItem.password}
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            inputProps={{ readOnly: true }}
            onClick={() => setShowPassword(!showPassword)}
          ></TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closePopup()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
