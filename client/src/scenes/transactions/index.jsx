// Import necessary dependencies from React and MUI (Material-UI)
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { GET_TRANSACTIONS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { NumericFormat } from "react-number-format";

// Transactions component displaying a list of transactions
const Transactions = () => {
  // Access MUI theme
  const theme = useTheme();

  // Fetch transaction data using the useGetTransactionsQuery hook
  const { loading, data } = useQuery(GET_TRANSACTIONS);

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
      renderCell: (params) => (
        <NumericFormat
          value={params.value}
          displayType='text'
          prefix='$'
          thousandSeparator=','
          decimalScale={2}
          fixedDecimalScale
        />
      )
    }
  ];

  // Return JSX for rendering the Transactions component
  return (
    <Box m='1.5rem 2.5rem'>
      {/* Header component with title and subtitle */}
      <Header title='TRANSACTIONS' subtitle='Entire list of transactions' />

      {/* DataGrid component for rendering transaction data */}
      <Box
        height='80vh'
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
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
        {/* DataGrid component with custom configuration and features */}
        <DataGrid
          loading={loading || !data?.transactions}
          getRowId={(row) => row._id}
          rows={data?.transactions || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

// Export the Transactions component as the default export
export default Transactions;
