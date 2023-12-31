import { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  Stack,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  postCollections,
  postVaultItem,
  decryptItems,
} from "@/common/ServerAPI";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "@/common/useGlobalStore";
import PasswordField from "./PasswordField";
import { base64ToArrayBuffer } from "../lib/encryption";
import { createCollection, setItem } from "@/common/stateMutation";

const errorMessages = {
  empty: "",
  required: "Missing required fields",
};

const clearError = {
  status: false,
  message: errorMessages.empty,
};

const requiredFieldsError = {
  status: true,
  message: errorMessages.required,
};

// Receive collections for vault items as props
const NewItemForm = ({ collections, setCollections, setItems }) => {
  // Menu related Items
  const symmetricKey = useGlobalStore((state) => state.symmetricKey);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Common Dialog Items
  const [collectionsDialogOpen, setCollectionsDialogOpen] = useState(false);
  const [vaultDialogOpen, setVaultDialogOpen] = useState(false);

  const handleDialogClickOpen = (dialogState) => {
    dialogState(true);
  };

  const handleDialogClose = (dialogState) => {
    handleMenuClose();
    clearAllErrors();
    clearAllInputs();
    dialogState(false);
  };

  const navigate = useNavigate();
  // Collections Form
  const [collectionName, setCollectionName] = useState("");
  const [collectionError, setCollectionError] = useState(clearError);

  // Vault Items
  // 'name': Google
  // 'url': 'https://google.com',
  // 'username': 'alice@example.com',
  // 'password': 'UZG4TJp1jEzJcFaXlRsi'
  const [itemName, setItemName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [itemNameError, setItemNameError] = useState(clearError);
  const [endpointError, setEndpointError] = useState(clearError);
  const [passwordError, setPasswordError] = useState(clearError);
  const [usernameError, setUserNameError] = useState(clearError);

  const [collectionID, setCollectionID] = useState("");
  const [defaultCollectionsID, setDefaultCollectionID] = useState("");

  const handleCollectionChange = (event) => {
    setCollectionID(event.target.value);
  };

  const getDefaultCollections = () => {
    if (collections && collections.length) {
      for (let i = 0; i < collections.length; i++) {
        let collection = collections[i];
        if (collection.name === "Default") {
          setDefaultCollectionID(collection.uuid);
          setCollectionID(collection.uuid);
        }
      }
    }
  };

  useEffect(() => {
    getDefaultCollections();
  }, [collections]);

  const onSaveVaultItem = async () => {
    let errorStatus = false;
    errorStatus = isNullCheck(itemName, setItemNameError);
    errorStatus = isNullCheck(password, setPasswordError);
    errorStatus = isNullCheck(endpoint, setEndpointError);
    errorStatus = isNullCheck(username, setUserNameError);

    if (errorStatus) {
      return;
    }

    let vaultItemObject = {
      name: itemName,
      url: endpoint,
      username: username,
      password: password,
    };
    let vaultItemString = JSON.stringify(vaultItemObject);
    try {
      let response = await postVaultItem(
        vaultItemString,
        symmetricKey,
        collectionID
      );

      var vaultItemDecrypted = await decryptItems(
        [response.data],
        base64ToArrayBuffer(symmetricKey)
      );
      setItem(vaultItemDecrypted[0], setItems);
      handleDialogClose(setCollectionsDialogOpen);
    } catch (error) {
      networkErrorHandler(error);
    }
  };

  // TODO: Extract out as a callback, for now save and close module
  const onSaveCollection = async () => {
    if (collectionName === "") {
      setCollectionError(requiredFieldsError);
      return;
    } else {
      setCollectionError(clearError);
    }

    try {
      let response = await postCollections(collectionName);
      createCollection(response.data, setCollections);
      handleDialogClose(setCollectionsDialogOpen);
    } catch (error) {
      networkErrorHandler(error);
      return;
    }
  };

  const isNullCheck = (field, errorHandler) => {
    if (field === "") {
      errorHandler(requiredFieldsError);
      return true;
    }
    return false;
  };

  const clearAllErrors = () => {
    setCollectionError(clearError);
    setItemNameError(clearError);
    setEndpointError(clearError);
    setPasswordError(clearError);
    setUserNameError(clearError);
  };

  const clearAllInputs = () => {
    setItemName("");
    setEndpoint("");
    setPassword("");
    setUserName("");
    setCollectionName("");
    setCollectionID(defaultCollectionsID);
  };

  const networkErrorHandler = (error) => {
    if (!error || !error.response || !error.response.status) {
      console.log(error);
      return;
    }

    if (error.response.status === 403) {
      alert("Please sign in again to continue");
      navigate("/login-signup");
      return;
    }

    if (error.response.status === 400) {
      alert("Failed to access data, try again later");
      window.location.reload();
      return;
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleMenuClick}>
        New
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => handleDialogClickOpen(setCollectionsDialogOpen)}
        >
          Collections
        </MenuItem>
        <Dialog
          open={collectionsDialogOpen}
          onClose={() => handleDialogClose(setCollectionsDialogOpen)}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              event.stopPropagation();
            }
          }}
        >
          <DialogTitle>Add a new collection</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Collection Name"
              error={collectionError.status}
              helperText={collectionError.message}
              value={collectionName}
              onChange={(event) => setCollectionName(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogClose(setCollectionsDialogOpen)}>
              Cancel
            </Button>
            <Button onClick={onSaveCollection}>Save</Button>
          </DialogActions>
        </Dialog>
        <MenuItem onClick={() => handleDialogClickOpen(setVaultDialogOpen)}>
          Vault Items
        </MenuItem>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={vaultDialogOpen}
          onClose={() => handleDialogClose(setVaultDialogOpen)}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              event.stopPropagation();
            }
          }}
        >
          <DialogTitle>Add a new vault item</DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField
                label="Name"
                value={itemName}
                error={itemNameError.status}
                helperText={itemNameError.message}
                onChange={(event) => setItemName(event.target.value)}
              />
              <TextField
                label="URL"
                value={endpoint}
                error={endpointError.status}
                helperText={endpointError.message}
                onChange={(event) => setEndpoint(event.target.value)}
              />
              <TextField
                label="Username"
                value={username}
                error={usernameError.status}
                helperText={usernameError.message}
                onChange={(event) => setUserName(event.target.value)}
              />{" "}
              <PasswordField
                password={password}
                passwordError={passwordError}
                handlePasswordChange={(newPassword) => setPassword(newPassword)}
              ></PasswordField>
              <FormControl>
                <InputLabel id="CollectionSelctor">
                  Select a collection
                </InputLabel>
                <Select
                  labelId="CollectionSelctor"
                  label="CollectionSelctor"
                  defaultValue={defaultCollectionsID}
                  value={collectionID}
                  onChange={handleCollectionChange}
                >
                  {collections.map((collection) => {
                    return (
                      <MenuItem value={collection.uuid} key={collection.uuid}>
                        {collection.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogClose(setVaultDialogOpen)}>
              Cancel
            </Button>
            <Button onClick={onSaveVaultItem}>Save</Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
};

export default NewItemForm;
