import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import VaultItemTiles from "@/components/VaultItemTiles";
import NewItemForm from "@/components/NewItemForm";
import { getUserData } from "@/common/ServerAPI";
import { useGlobalStore } from "@/common/useGlobalStore";

function DashboardPage() {
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState({});
  const symmetricKey = useGlobalStore((state) => state.symmetricKey);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData(symmetricKey)
      .then((data) => {
        setCollections(data.collections);
        setItems(data.items);
      })
      .catch((error) => {
        if(error.response && error.response.status) {
          if(error.response.status === 403) {
            navigate('/login-signup');
          }
        }
      }
    );
  }, [symmetricKey]);

  return (
    <>
      <NavBar />
      <SideBar collections={collections} />
      <Box sx={{display: "flex", justifyContent: "space-between"}} maxWidth={750} ml={2}>
        <Typography
          sx={{
            paddingLeft: 35,
            fontSize: "h4.fontSize",
          }}>
          Dashboard
        </Typography>
        <NewItemForm collections={collections} />
      </Box>
      <Box sx={{ paddingLeft: 35 }}>
        <VaultItemTiles items={items} collections={collections} />
      </Box>
    </>
  );
}

export default DashboardPage;
