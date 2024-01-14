// Import necessary dependencies from React and MUI (Material-UI) libraries
import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";

// Define a functional component named Overview
const Overview = () => {
  // State to manage the selected view (initially set to 'units')
  const [view, setView] = useState("units");

  // Return JSX for rendering the Overview component
  return (
    <Box m='1.5rem 2.5rem'>
      {/* Header component with title and subtitle */}
      <Header title='OVERVIEW' subtitle='Overview of general revenue and profit' />
      <Box height='75vh'>
        {/* Form control for selecting the view (Sales or Units) */}
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          {/* Dropdown menu to select the view with options 'Sales' and 'Units' */}
          <Select
            value={view}
            label='View'
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value='sales'>Sales</MenuItem>
            <MenuItem value='units'>Units</MenuItem>
          </Select>
        </FormControl>
        {/* OverviewChart component to display the chart based on the selected view */}
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

// Export the Overview component as the default export
export default Overview;
