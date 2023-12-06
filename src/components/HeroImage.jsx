import * as React from "react";
import { Card, Box, CardMedia, Stack, Typography } from "@mui/material";
import castle from "../assets/castle.jpg";

export default function HeroImageCard() {
  return (
    <Box sx={{ pt: 15, display: "flex", justifyContent: "center", gap: 4 }}>
      <Card sx={{ width: "90%", height: 500 }}>
        <Stack direction="row">
          <CardMedia
            sx={{ height: 600, width: "auto" }}
            image={castle}
            title="castle"
          >
            <Typography sx={{ px: 15 }} variant="h2">
              Welcome!
            </Typography>
          </CardMedia>
          <Box sx={{ px: 5, py: 5, backgroundColor: "#e5e9e2" }}>
            <Typography variant="h4" gutterBottom>
              Trust Key Fortress to guard your passwords.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ pt: 5 }}>
              It securely and conveniently stores and retrieves your passwords
              with zero-knowledge end-to-end encryption.
            </Typography>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
