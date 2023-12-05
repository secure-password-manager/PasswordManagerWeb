import * as React from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import security_img from "../assets/security_img.png";
import darkRook from "../assets/DarkRook.png";

export default function SecurityStaregyCard() {
  return (
    <Card sx={{ backgroundColor: "#354F52", height: "auto" }}>
      <Typography
        variant="h2"
        color="#84A98C"
        gutterBottom
        sx={{ pl: 5, pt: 5 }}
      >
        Security Strategy
      </Typography>
      <Typography variant="h6" color="#84A98C" gutterBottom sx={{ mx: 5 }}>
        <p>
          Key Fortress uses a “Zero-Knowledge” strategy involving multiple
          layers of protection.
        </p>
        The service never learns or stores the user’s master password, which is
        required to encrypt and decrypt the user’s data.
        <p>
          All encryption and decryption of user data happens on the client using
          a random symmetric key generated when the user signs up.
        </p>
        <p>
          This symmetric key is encrypted and stored on the server, using a
          master key derived from the user’s email and master password.
        </p>
        <p>
          To authenticate to the server, the client derives a hash from the
          master password and the master key, so that the master password is
          never sent over the network.
        </p>
        <p>
          On the server, the master password hash is hashed again before being
          stored in the database. * The client communicates with the server over
          HTTPS, and the database uses an additional layer of encryption.
        </p>
      </Typography>
      <CardMedia
        component="img"
        height="auto"
        sx={{ objectFit: "contain" }}
        image={security_img}
      />
      <Box
        sx={{
          width: "50%",
          justifyContent: "flex-end",
          display: "flex",
          mb: 2,
        }}
      >
        <CardMedia
          component="img"
          height="auto"
          sx={{ objectFit: "scale-down", width: "auto" }}
          image={darkRook}
          pb={1}
        />
      </Box>
    </Card>
  );
}
