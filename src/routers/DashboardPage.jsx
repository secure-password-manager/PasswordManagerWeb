import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { Box, Typography } from "@mui/material";
import VaultItemTiles from "../components/VaultItemTiles";
import { getUserData } from "../common/ServerAPI";

function DashboardPage() {
  const location = useLocation();
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState({});
  
  const symmetricKey = location.state.symmetricKey;

  useEffect(() => {
      getUserData(symmetricKey).then((data) => {
          setCollections(data.collections);
          setItems(data.items);
      })
  },[]);

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
