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
import { Container } from "@mui/system";

const drawerWidth = 240;

export default function ({ collections }) {
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
              {collections.map((collections) => {
                return (
                  <ListItem key={collections.name}>
                    <ListItemButton onClick={handleOnClick}>
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
  );
}
