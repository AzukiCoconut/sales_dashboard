// Import necessary dependencies from React, MUI (Material-UI), and MUI Data Grid
import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

// NOT USED IN THIS PROJECT
// Define a React functional component named DataGridCustomToolbar
const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (
    // Container for MUI Data Grid toolbar components
    <GridToolbarContainer>
      {/* Custom layout component for flexible spacing */}
      <FlexBetween width='100%'>
        <FlexBetween>
          {/* Button to toggle display of columns in the Data Grid */}
          <GridToolbarColumnsButton />
          {/* Selector for adjusting density (number of rows displayed) */}
          <GridToolbarDensitySelector />
          {/* Button for exporting Data Grid data */}
          <GridToolbarExport />
        </FlexBetween>
        {/* Textfield for searching within the Data Grid */}
        <TextField
          label='Search...'
          sx={{ mb: "0.5rem", width: "15rem" }}
          // Callback to update searchInput state on text input change
          onChange={(e) => setSearchInput(e.target.value)}
          // Value for the controlled TextField component
          value={searchInput}
          // Standard variant for the TextField
          variant='standard'
          // InputProps for additional customization, such as end adornment
          InputProps={{
            // Adornment positioned at the end of the TextField
            endAdornment: (
              <InputAdornment position='end'>
                {/* IconButton for triggering the search action */}
                <IconButton
                  onClick={() => {
                    // Call setSearch with current searchInput value and clear input
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  {/* Search icon from MUI Icons */}
                  <Search />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

// Export the DataGridCustomToolbar component as the default export
export default DataGridCustomToolbar;
