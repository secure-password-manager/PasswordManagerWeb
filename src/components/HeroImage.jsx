import * as React from "react";
import { Card, Box, CardMedia, Stack, Typography } from "@mui/material";
import castle from "../assets/castle.jpg";

export default function HeroImageCard() {
  return (
    <Card sx={{ pt: 7, width: "100%" }}>
      <Stack direction="row">
        <CardMedia
          sx={{ height: "auto", width: "auto" }}
          image={castle}
          title="castle"
        >
          <Typography sx={{ px: 15 }} variant="h2">
            Welcome!
          </Typography>
        </CardMedia>
        <Box sx={{ px: 5, py: 5, backgroundColor: "#CAD2C5" }}>
          <Typography variant="h3" gutterBottom>
            Key Fortress is a web-based password manager.
          </Typography>
          <Typography variant="h5" gutterBottom>
            It securely and conveniently gives users access to their passwords
            by implementing session-based authentication that either grants or
            denies access to their password vault.
          </Typography>
          <Typography>
            JavaScript/React powers the application on the frontend and
            Python/Django on the backend and is supported by AWS infrastructure.
            Our application employs client-side encryption and encryption at
            rest, ensuring the utmost protection for sensitive user data. We
            also provide a password strength meter that provides instant
            feedback on the strength of your chosen passwords. In contrast, a
            built-in random password generator ensures the creation of
            formidable, hacker-resistant passwords. As an extra layer of
            defense, our Pwned Password checker scans and verifies passwords to
            ensure they have not been compromised.
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
