import { useState } from "react";
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
    setAnchorEl(null);
    dialogState(false);
  };

  // Collections Form
  const [collectionName, setCollectionName] = useState("");
  const onSaveCollection = () => {
    console.log(collectionName);
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
  const [collectionID, setCollectionID] = useState("");

  const handleCollectionChange = (event) => {
    setCollectionID(event.target.value);
  };

  const onSaveVaultItem = () => {
    console.log("status");
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
        >
          <DialogTitle>Add a new collection</DialogTitle>
          <DialogContent>
            <TextField
              label="Collection Name"
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
                  onChange={(event) => setItemName(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="URL"
                  value={endpoint}
                  onChange={(event) => setEndpoint(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                {" "}
                <TextField
                  label="Password"
                  value={password}
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
                    value={collectionID}
                    onChange={handleCollectionChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
