import * as React from "react";
import { Card, Box, CardMedia, Stack, Typography } from "@mui/material";
import darkRook from "../assets/DarkRook.png";

export default function KeyFeaturesCard() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10, pb: 10 }}>
      <Card
        sx={{
          backgroundColor: "#e5e9e2",
          height: "auto",
          width: "90%",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="h3"
            color="#2F3E46"
            gutterBottom
            sx={{ pl: 5, pt: 5 }}
          >
            Key Features
          </Typography>
          <Typography variant="h6" color="#2F3E46" gutterBottom>
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
    </Box>
  );
}
