// Import necessary dependencies from React and MUI (Material-UI)
import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";

// Define a functional component named Breakdown
const Breakdown = () => {
  // Return JSX for rendering the Breakdown component
  return (
    <Box m='1.5rem 2.5rem'>
      {/* Header component with title and subtitle */}
      <Header title='BREAKDOWN' subtitle='Breakdown of Sales By Category' />

      {/* Box containing styling for the BreakdownChart */}
      <Box mt='40px' height='75vh'>
        {/* BreakdownChart component rendering sales breakdown by category */}
        <BreakdownChart />
      </Box>
    </Box>
  );
};

// Export the Breakdown component as the default export
export default Breakdown;
