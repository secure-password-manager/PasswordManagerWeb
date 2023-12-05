import * as React from "react";
import { Card, Box, CardMedia, Stack, Typography } from "@mui/material";
import darkRook from "../assets/DarkRook.png";

export default function KeyFeaturesCard() {
  return (
    <Card sx={{ backgroundColor: "#52796F", height: "auto" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h2"
          color="#CAD2C5"
          gutterBottom
          sx={{ pl: 5, pt: 5 }}
        >
          Key Features
        </Typography>
        <Typography variant="h6" color="#CAD2C5" gutterBottom>
          <ul>
            <li>
              Client side encryption using AES-256 and encryption at rest for
              sensitive user data
            </li>
            <li>Unlimited accounts can be stored in user’s vault</li>
            <li>Accounts are organized in collections</li>
            <li>
              Pwned Password checker to ensure passwords are not compromised
            </li>
            <li>
              Password strength meter to indicate the strength of a chosen
              password
            </li>
            <li> Random password generator for creating strong passwords</li>
            <li>RESTful API Design</li>
          </ul>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            mr: 3,
            mb: 1,
          }}
        >
          <CardMedia
            component="img"
            height="auto"
            image={darkRook}
            title="darkrook"
          />
        </Box>
      </Stack>
    </Card>
  );
}
