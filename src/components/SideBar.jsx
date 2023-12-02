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
  const [filterItems, setFilterItems] = useState({});
  const [showAll, setShowAll] = useState(true);
  const itemsArray = Object.keys(items).map((item) => items[item]);

  const handleOnClick = (event) => {
    let output = itemsArray.filter(
      (item) => item.vault_collection_name == event.target.outerText
    );
    setFilterItems(output);
    setShowAll(false);
    setCollectionName(event.target.outerText);
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
                {collections.map((collections) => {
                  return (
                    <ListItem key={collections.name}>
                      <ListItemButton onClick={(event) => handleOnClick(event)}>
                        <ListItemText primary={collections.name} />
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
            <VaultItemTiles items={items} setItems={setItems} />
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
              <VaultItemTiles items={filterItems} setItems={setItems} />
            </>
          )}
        </>
      </Box>
    </>
  );
};

export default SideBar;
