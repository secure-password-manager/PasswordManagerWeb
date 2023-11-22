import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import { collections, items } from "../config/data/splitSampleData";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Box, Typography } from "@mui/material";
import VaultItemTiles from "../components/VaultItemTiles";
import NewItemForm from "../components/NewItemForm";

function DashboardPage() {
  const location = useLocation();
  const symmetricKey = location.state.symmetricKey;
  console.log(`symmetric key from location state: ${symmetricKey}`);

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
