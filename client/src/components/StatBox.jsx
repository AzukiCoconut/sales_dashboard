// Import necessary dependencies from React, MUI (Material-UI), and custom components
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

// Define a functional component named StatBox
const StatBox = ({ title, value, increase, icon, description }) => {
  // Access the theme object using the useTheme hook
  const theme = useTheme();

  // Return JSX for rendering the StatBox component
  return (
    <Box
      gridColumn='span 2'
      gridRow='span 1'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      p='1.25rem 1rem'
      flex='1 1 100%'
      backgroundColor={theme.palette.background.alt}
      borderRadius='0.55rem'
    >
      {/* Flex container for title and icon */}
      <FlexBetween>
        {/* Title of the StatBox */}
        <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {/* Icon associated with the StatBox */}
        {icon}
      </FlexBetween>

      {/* Numeric value displayed in the StatBox */}
      <Typography
        variant='h3'
        fontWeight='600'
        sx={{ color: theme.palette.secondary[200] }}
      >
        {value}
      </Typography>
      
      {/* Flex container for additional information and description */}
      <FlexBetween gap='1rem'>
        {/* Display of increase information */}
        <Typography
          variant='h5'
          fontStyle='italic'
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        {/* Description of the StatBox */}
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

// Export the StatBox component as the default export
export default StatBox;
