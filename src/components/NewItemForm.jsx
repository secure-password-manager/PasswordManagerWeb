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
  Grid,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  getCollections,
  postCollections,
  getUserKey,
  postVaultItem,
} from "../common/ServerAPI";
import { useNavigate } from "react-router-dom";

// TODO: extract these out to common file
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
const NewItemForm = () => {
  // Menu related Items
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
  const onSaveCollection = async () => {
    if (collectionName === "") {
      setCollectionError(requiredFieldsError);
      return;
    } else {
      setCollectionError(clearError);
    }

    try {
      let response = await postCollections(collectionName);
      setCollectionName("");
      handleDialogClose(setCollectionsDialogOpen);
      (prevData) => [...prevData, data1];
      setCollectionArray((currentCollections) => [
        ...currentCollections,
        response.data,
      ]);
      // Get new vault collection items
      getVaultCollections();
    } catch (error) {
      networkErrorHandler(error);
      return;
    }
  };

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
  const [collectionArray, setCollectionArray] = useState([]);
  const [defaultCollectionsID, setDefaultCollectionID] = useState("");

  const [symmetricKey, setSymmetricKey] = useState("");

  const handleCollectionChange = (event) => {
    setCollectionID(event.target.value);
  };

  const getUserItems = async () => {
    try {
      let collectionResponse = await getCollections(getCollections);
      let keyResponse = await getUserKey();
      setCollectionArray(collectionResponse.data);
      setSymmetricKey(keyResponse.data.encrypted_symmetric_key);
      for (let i = 0; i < collectionResponse.data.length; i++) {
        let collection = collectionResponse.data[i];
        if (collection.name == "Default") {
          setDefaultCollectionID(collection.uuid);
          setCollectionID(collection.uuid);
        }
      }
    } catch (error) {
      networkErrorHandler(error);
    }
  };

  useEffect(() => {
    getUserItems();
  }, []);

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

    console.log(vaultItemObject);
    // try {
    //   let response = await postVaultItem(
    //     vaultItemObject,
    //     symmetricKey,
    //     collectionID
    //   );
    // } catch (error) {
    //   networkErrorHandler(error);
    // }
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
  };

  const networkErrorHandler = (error) => {
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
            <Grid
              container
              justifyContent="space-between"
              spacing={1}
              padding={1}
            >
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  value={itemName}
                  error={itemNameError.status}
                  helperText={itemNameError.message}
                  onChange={(event) => setItemName(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="URL"
                  value={endpoint}
                  error={endpointError.status}
                  helperText={endpointError.message}
                  onChange={(event) => setEndpoint(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Username"
                  value={username}
                  error={usernameError.status}
                  helperText={usernameError.message}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                {" "}
                <TextField
                  label="Password"
                  value={password}
                  error={passwordError.status}
                  helperText={passwordError.message}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} marginTop={1} sx={{ minWidth: "375px" }}>
                <FormControl sx={{ minWidth: "375px" }}>
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
                    {collectionArray.map((collection) => {
                      return (
                        <MenuItem value={collection.uuid} key={collection.uuid}>
                          {collection.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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
