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
import { deleteCollections } from "../common/ServerAPI";
import { deleteCollection } from "../common/stateMutation";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import IconButton from "@mui/material/IconButton";
import { Container } from "@mui/system";

const drawerWidth = 240;

const SideBar = ({ collections, setCollections, setItems }) => {
  const handleOnClick = (event) => {
    console.log(event);
  };

  const handleDeleteCollection = async (uuid) => {
    try {
      const response = await deleteCollections(uuid);
      deleteCollection({ uuid: uuid }, setCollections, setItems);
    } catch (error) {
      console.log(error);
    }
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
                    secondaryAction={
                      <IconButton
                        onClick={() => handleDeleteCollection(collection.uuid)}
                      >
                        <DeleteTwoToneIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton onClick={handleOnClick}>
                      <ListItemText primary={collection.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </div>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Toolbar />
    </Box>
  );
};

export default SideBar;
