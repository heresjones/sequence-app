// HomePage.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import myImage from "./img/oldmansequence.png"; // replace with the actual path to your image

const HomePage = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">Welcome to My Sequence Page</Typography>
      <img
        src={myImage}
        alt="Descriptive alt text"
        style={{ maxWidth: "50%", height: "auto" }}
      />
    </Box>
  );
};

export default HomePage;
