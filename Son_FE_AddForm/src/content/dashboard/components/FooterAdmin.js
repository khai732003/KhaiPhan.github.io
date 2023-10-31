import React from "react";
import { Box, Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box
      component="Footer"
      className="footer"
      sx={{
        mt: "auto",
        p: 2,
        backgroundColor: "dimgray",
        minHeight: "10vh", 
        display: "flex",
        flexDirection: "column", 
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography align="center">2023 Staff Management</Typography>
    </Box>
  );
};

export default Footer;
