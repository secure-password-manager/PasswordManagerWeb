import React, { useState } from "react";
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
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { deleteCollections } from "../common/ServerAPI";
import { deleteCollection } from "../common/stateMutation";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import IconButton from "@mui/material/IconButton";
import AlertSnackbar from "./AlertSnackbar";
import VaultItemTiles from "./VaultItemTiles";

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
    console.log(error);
    if (error.response.status === 403) {
      setDeleteError(true);
      setTimeout(() => {
        navigate("/login-signup");
      }, 2000);
      return;
    } else {
      setDeleteError(true);
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

const SideBar = (props) => {
  const { items, setItems, collections, setCollections } = props;
  const [collectionName, setCollectionName] = useState("");
  const [collectionUuid, setCollectionUuid] = useState("");
  const [showAll, setShowAll] = useState(true);
  const itemsArray = Object.keys(items).map((item) => items[item]);
  const [deleteError, setDeleteError] = useState(false);
  const navigate = useNavigate();

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
          <Box sx={{ overflow: "auto", paddingLeft: 2, paddingTop: 10 }}>
            <List>
              <Typography sx={{ fontSize: "h5.fontSize" }}>
                COLLECTIONS
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
            <AlertSnackbar
              open={deleteError}
              setOpen={setDeleteError}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              duration={2000}
              message={"Failed to delete item"}
              severity={"error"}
            />
            <Divider />
          </Box>
        </Drawer>
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
