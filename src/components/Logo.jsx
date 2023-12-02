import React from "react";
import logo2 from "../assets/logo2.png";
import { CardMedia } from "@mui/material";

function Logo() {
  return (
    <>
      <CardMedia
        sx={{ objectFit: "scale-down", py: 1, height: 50 }}
        image={logo2}
        component="img"
      />
    </>
  );
}

export default Logo;
