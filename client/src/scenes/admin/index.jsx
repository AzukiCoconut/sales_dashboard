// Import necessary dependencies from React, MUI (Material-UI), and custom components
import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useQuery } from "@apollo/client";
import { GET_ADMINS } from "../../utils/queries";

// Define a functional component named Admin
const Admin = () => {
  // Access the theme object using the useTheme hook
  const theme = useTheme();

  // Fetch admin data using the useGetAdminsQuery from the API
  const { loading, data } = useQuery(GET_ADMINS);

  // Define columns for the DataGrid component
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      // Custom cell renderer to format phone number
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      }
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5
    }
  ];

  // Return JSX for rendering the Admin component
  return (
    <Box m='1.5rem 2.5rem'>
      {/* Header component with title and subtitle */}
      <Header title='ADMINS' subtitle='Managing admins and list of admins' />

      {/* Box containing styling for the DataGrid */}
      <Box
        mt='40px'
        height='75vh'
        sx={{
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
        {/* DataGrid component rendering admin data */}
        <DataGrid
          loading={loading || !data?.getAdmins}
          getRowId={(row) => row._id}
          rows={data?.getAdmins || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

// Export the Admin component as the default export
export default Admin;
