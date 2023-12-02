import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import castle from "../assets/castle.jpg";
import security_img from "../assets/security_strategy.png";

export default function MediaCard() {
  return (
    <Card sx={{}}>
      <CardContent>
        <CardMedia sx={{ height: 700 }} image={castle} title="castle">
          <Typography>Welcome!</Typography>
          <Typography sx={{ width: 550 }}>
            Key Fortress is a web-based password manager. It securely and
            conveniently gives users access to their passwords by implementing
            session-based authentication that either grants or denies access to
            their password vault. JavaScript/React powers the application on the
            frontend and Python/Django on the backend and is supported by AWS
            infrastructure. Our application employs client-side encryption and
            encryption at rest, ensuring the utmost protection for sensitive
            user data. We also provide a password strength meter that provides
            instant feedback on the strength of your chosen passwords. In
            contrast, a built-in random password generator ensures the creation
            of formidable, hacker-resistant passwords. As an extra layer of
            defense, our Pwned Password checker scans and verifies passwords to
            ensure they have not been compromised.
          </Typography>
        </CardMedia>
      </CardContent>
      <CardContent sx={{ backgroundColor: "#52796F", height: 400 }}>
        <Typography> Key Features</Typography>
        <Typography>
          Client side encryption using AES-256 and encryption at rest for
          sensitive user data
        </Typography>
        <Typography>
          Unlimited accounts can be stored in user’s vault
        </Typography>
        <Typography> Accounts are organized in collections</Typography>
        <Typography>
          Pwned Password checker to ensure passwords are not compromised
        </Typography>
        <Typography>
          Password strength meter to indicate the strength of a chosen password
        </Typography>
        <Typography>
          Random password generator for creating strong passwords
        </Typography>
        <Typography>RESTful API Design</Typography>
      </CardContent>
      <CardContent sx={{ backgroundColor: "#354F52", height: 1500 }}>
        <Typography> Security Strategy</Typography>
        <Typography>
          Key Fortress uses a “Zero-Knowledge” strategy involving multiple
          layers of protection.
        </Typography>
        <Typography>
          The service never learns or stores the user’s master password, which
          is required to encrypt and decrypt the user’s data.
        </Typography>
        <Typography>
          {" "}
          All encryption and decryption of user data happens on the client using
          a random symmetric key generated when the user signs up.
        </Typography>
        <Typography>
          his symmetric key is encrypted and stored on the server, using a
          master key derived from the user’s email and master password.
        </Typography>
        <Typography>
          To authenticate to the server, the client derives a hash from the
          master password and the master key, so that the master password is
          never sent over the network.
        </Typography>
        <Typography>
          On the server, the master password hash is hashed again before being
          stored in the database.
        </Typography>
        <Typography>
          The client communicates with the server over HTTPS, and the database
          uses an additional layer of encryption.
        </Typography>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          image={security_img}
        />
      </CardContent>
    </Card>
  );
}
