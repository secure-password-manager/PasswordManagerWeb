import * as React from "react";
import {
  Box,
  Typography,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { deleteCollections } from "../common/ServerAPI";
import { deleteCollection } from "../common/stateMutation";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import IconButton from "@mui/material/IconButton";
import AlertSnackbar from "./AlertSnackbar";

const drawerWidth = 240;

const handleDeleteCollection = async (
  uuid,
  navigate,
  setCollections,
  setDeleteError,
  setItems
) => {
  try {
    const response = await deleteCollections(uuid);
    deleteCollection({ uuid: uuid }, setCollections, setItems);
  } catch (error) {
    if (error.response.status === 403) {
      setDeleteError(true);
      setTimeout(() => {
        navigate("/login-signup");
      }, 2000);
      return;
    }
  }
};

const renderDeleteIcon = ({
  collection,
  setCollections,
  setItems,
  navigate,
  setDeleteError,
}) => {
  if (collection.name !== "Default") {
    return (
      <IconButton
        onClick={() =>
          handleDeleteCollection(
            collection.uuid,
            navigate,
            setCollections,
            setDeleteError,
            setItems
          )
        }
      >
        <DeleteTwoToneIcon />
      </IconButton>
    );
  }
  return null;
};

const SideBar = ({ collections, setCollections, setItems }) => {
  const [deleteError, setDeleteError] = React.useState(false);
  const navigate = useNavigate();
  const handleOnClick = (event) => {
    console.log(event);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <NavBar />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", paddingLeft: 2 }}>
          <List>
            <Typography sx={{ fontSize: "h5.fontSize" }}>
              Collections
            </Typography>
            <div>
              {collections.map((collection) => {
                return (
                  <ListItem
                    key={collection.uuid}
                    secondaryAction={renderDeleteIcon({
                      collection,
                      navigate,
                      setCollections,
                      setItems,
                      setDeleteError,
                    })}
                  >
                    <ListItemButton onClick={handleOnClick}>
                      <ListItemText primary={collection.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </div>
          </List>
          <AlertSnackbar
            open={deleteError}
            setOpen={setDeleteError}
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
            duration={2000}
            message={"Please sign in again to continue"}
            severity={"error"}
          />
          <Divider />
        </Box>
      </Drawer>
      <Toolbar />
    </Box>
  );
};

export default SideBar;
