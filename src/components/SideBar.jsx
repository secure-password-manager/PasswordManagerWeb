import * as React from "react";
import {
  Box,
  Typography,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const drawerWidth = 240;

export default function ({ collections }) {
  const handleOnClick = (event) => {
    console.log(event);
  };

  return (
    <Box sx={{ display: "flex" }}>
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
        <Box sx={{ overflow: "auto", paddingLeft: 2, paddingTop: 5 }}>
          <Typography sx={{ fontSize: "h5.fontSize" }}>COLLECTIONS</Typography>
          <List>
            {collections.map((collections) => {
              return (
                <ListItem key={collections.name}>
                  <ListItemButton onClick={handleOnClick}>
                    <ListItemText primary={collections.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Toolbar />
    </Box>
  );
}
