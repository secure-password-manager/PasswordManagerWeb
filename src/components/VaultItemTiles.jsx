import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import VaultItemPopOut from "./VaultItemPopOut";
import AlertSnackbar from "./AlertSnackbar";
import { deleteVaultItem } from "@/common/ServerAPI";
import { deleteItem } from "@/common/stateMutation.jsx";

export default function VaultItemTiles(props) {
  const { itemsArray, setItems } = props;
  const [open, setOpen] = useState(false);
  const [vaultItem, setVaultItem] = useState({});
  const [collection, setCollection] = useState({});
  const [loading, setLoading] = useState(itemsArray.map(() => false));
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarMessaage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("error");
  const navigate = useNavigate();

  const openPopOut = (event, vaultItem, collection) => {
    setVaultItem(vaultItem);
    setCollection(collection);
    setOpen(true);
  };

  const handleClosePopOut = () => {
    setOpen(false);
    setShowPassword(false);
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const networkErrorHandler = (error) => {
    if (error.response.status === 403) {
      setSnackBarMessage("Please sign in again to continue");
      setSnackBarSeverity("warning");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/login-signup");
      }, 2000);
      return;
    }

    if (error.response.status === 400 || error.response.status === 404) {
      setSnackBarMessage("Failed to access data, try again later");
      setSnackBarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleListClick = async (event) => {
    const listItem = event.target.closest("li");

    if (listItem) {
      const vaultItemIndex = Array.from(listItem.parentNode.children).indexOf(
        listItem
      );
      const vaultItem = itemsArray[vaultItemIndex];
      const deleteClicked = event.target.closest("button");
      if (deleteClicked) {
        await handleDeleteVaultItem(vaultItem, vaultItemIndex);
      } else {
        openPopOut(event, vaultItem.data, vaultItem.vault_collection_name);
      }
    }
  };

  const loadingStates = (vaultItemIndex, isLoading) => {
    const updatedLoadingStates = [...loading];
    updatedLoadingStates[vaultItemIndex] = isLoading;
    setLoading(updatedLoadingStates);
  };

  const handleDeleteVaultItem = async (vaultItem, vaultItemIndex) => {
    try {
      loadingStates(vaultItemIndex, true);
      await deleteVaultItem(vaultItem.uuid);
      deleteItem(vaultItem, setItems);
      loadingStates(vaultItemIndex, false);
    } catch (error) {
      loadingStates(vaultItemIndex, false);
      networkErrorHandler(error);
    }
  };

  return (
    <>
      <List onClick={(event) => handleListClick(event)}>
        {itemsArray.map((vaultItem, i) => (
          <ListItem key={vaultItem.data.name} sx={{ maxWidth: 500 }}>
            <Card sx={{ width: 500 }}>
              <ListItemButton>
                <ListItemText
                  primary={vaultItem.data.name}
                  secondary={vaultItem.data.username}
                />
                <IconButton>
                  {loading[i] ? (
                    <CircularProgress size="1rem" />
                  ) : (
                    <DeleteTwoToneIcon />
                  )}
                </IconButton>
              </ListItemButton>
            </Card>
          </ListItem>
        ))}
      </List>
      <VaultItemPopOut
        handleClosePopOut={handleClosePopOut}
        open={open}
        handleTogglePassword={handleTogglePassword}
        showPassword={showPassword}
        vaultItem={vaultItem}
        collection={collection}
      />
      <AlertSnackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        duration={2000}
        message={snackBarMessaage}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        severity={snackBarSeverity}
      />
    </>
  );
}
