import React from "react";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Box, Typography } from "@mui/material";
import VaultItemTiles from "../components/VaultItemTiles";

import { collections, items } from "../config/data/splitSampleData";

function DashboardPage() {
  return (
    <>
      <NavBar />
      <SideBar collections={collections} />
      <Typography
        sx={{
          paddingLeft: 35,
          fontSize: "h4.fontSize",
        }}
      >
        Dashboard
      </Typography>
      <Box sx={{ paddingLeft: 35 }}>
        <VaultItemTiles items={items} />
      </Box>
    </>
  );
}

export default DashboardPage;
