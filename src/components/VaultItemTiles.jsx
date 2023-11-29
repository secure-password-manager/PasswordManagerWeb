import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  Box,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import NewItemForm from "./NewItemForm";
import VaultItemPopOut from "./VaultItemPopOut";

export default function VaultItemTiles({ items, collections }) {
  const itemsArray = Object.keys(items).map((item) => items[item].data);
  const [open, openValue] = useState(false);
  const [vaultItem, setValue] = useState(0);

  const openPopup = (event, vaultItem) => {
    setValue(vaultItem);
    openValue(true);
  };

  function closePopup() {
    openValue(false);
  }

  return (
    <>
      <Box sx={{}}>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          maxWidth={500}
          ml={2}
        >
          <NewItemForm collections={collections} />
        </Box>
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
        <>
          {open && (
            <VaultItemPopOut
              vaultItem={vaultItem}
              open={open}
              closePopup={closePopup}
            />
          )}
        </>
      </Box>
    </>
  );
}
