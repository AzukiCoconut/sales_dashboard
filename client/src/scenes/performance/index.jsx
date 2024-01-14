// Import necessary dependencies from React, MUI (Material-UI), and state/api
import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetUserPerformanceQuery } from "state/api";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";

// Define a functional component named Performance
const Performance = () => {
  // Access MUI theme
  const theme = useTheme();
  // Retrieve the user ID from the Redux store
  const userId = useSelector((state) => state.global.userId);
  // Fetch performance data using the useGetUserPerformanceQuery hook
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  // Define columns for the DataGrid component
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    }
  ];

  // Return JSX for rendering the Performance component
  return (
    <Box m='1.5rem 2.5rem'>
      {/* Header component with title and subtitle */}
      <Header
        title='PERFORMANCE'
        subtitle='Track your Affiliate Sales Performance Here'
      />
      <Box
        mt='40px'
        height='75vh'
        sx={{
          // Styling for DataGrid components using MUI theme
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none"
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`
          }
        }}
      >
        {/* DataGrid component to display performance data in a table */}
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

// Export the Performance component as the default export
export default Performance;
