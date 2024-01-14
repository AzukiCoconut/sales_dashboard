// Import necessary dependencies from MUI (Material-UI) and React
import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

// Define a functional component named Header
const Header = ({ title, subtitle }) => {
  // Access the theme object using the useTheme hook
  const theme = useTheme();

  // Return JSX for rendering the header
  return (
    <Box>
      {/* Typography component for the main title */}
      <Typography
        variant='h2'
        color={theme.palette.secondary[100]}
        fontWeight='bold'
        sx={{ mb: "5px" }} // Additional styles using the sx prop
      >
        {title}
      </Typography>
      {/* Typography component for the subtitle */}
      <Typography variant='h5' color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

// Export the Header component as the default export
export default Header;
