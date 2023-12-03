import React, { useState } from "react";
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
import { Container } from "@mui/system";
import VaultItemTiles from "./VaultItemTiles";

const drawerWidth = 240;

const SideBar = (props) => {
  const { items, setItems, collections } = props;
  const [collectionName, setCollectionName] = useState("");
  const [collectionUuid, setCollectionUuid] = useState("");
  const [showAll, setShowAll] = useState(true);
  const itemsArray = Object.keys(items).map((item) => items[item]);

  const handleOnClick = (event) => {
    itemsArray.filter(
      (item) => item.vault_collection === event.currentTarget.dataset.uuid
    );
    setShowAll(false);
    setCollectionUuid(event.currentTarget.dataset.uuid);
    setCollectionName(event.currentTarget.dataset.name);
  };

  return (
    <>
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
                    <ListItem key={collection.uuid}>
                      <ListItemButton
                        onClick={(event) => handleOnClick(event)}
                        data-uuid={collection.uuid}
                        data-name={collection.name}
                      >
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
      <Box sx={{ paddingLeft: 35 }}>
        <>
          {showAll ? (
            <VaultItemTiles
              itemsArray={Object.values(items)}
              setItems={setItems}
            />
          ) : (
            <>
              <Typography
                sx={{
                  fontSize: "h6.fontSize",
                  paddingLeft: 2,
                }}
              >
                {collectionName}
              </Typography>
              <VaultItemTiles
                itemsArray={Object.values(items).filter(
                  (item) => item.vault_collection === collectionUuid
                )}
                setItems={setItems}
              />
            </>
          )}
        </>
      </Box>
    </>
  );
};

export default SideBar;
