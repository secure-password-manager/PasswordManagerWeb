import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

export default function VaultItemTiles({ items }) {
  const itemsArray = Object.keys(items).map((item) => items[item].data);
  const [open, openValue] = useState(false);
  const [vaultItem, setValue] = useState(0);

  const openPopup = (event, value) => {
    openValue(true);
    setValue(value);
  };

  const closePopup = () => {
    openValue(false);
  };

  return (
    <>
      <List>
        {itemsArray.map((vaultItem) => (
          <ListItem key={vaultItem.name}>
            <Card sx={{ width: 500 }}>
              <ListItemButton onClick={() => openPopup(event, vaultItem)}>
                <ListItemText
                  primary={vaultItem.name}
                  secondary={vaultItem.username}
                />
                <DeleteTwoToneIcon />
              </ListItemButton>
            </Card>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle>Vault Item Details</DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              defaultValue={vaultItem.name}
              variant="outlined"
              label="Account Name"
            ></TextField>
            <TextField
              defaultValue={vaultItem.url}
              variant="outlined"
              label="URL"
            ></TextField>
            <TextField
              defaultValue={vaultItem.username}
              variant="outlined"
              label="Username"
            ></TextField>
            <TextField
              defaultValue={vaultItem.password}
              variant="outlined"
              label="Password"
            ></TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
