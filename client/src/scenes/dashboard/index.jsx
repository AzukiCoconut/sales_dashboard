// Import necessary dependencies from React, MUI (Material-UI), and other libraries
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "../../components/BreakdownChart";
import OverviewChart from "../../components/OverviewChart";
// import { useGetDashboardQuery } from "state/api";
import StatBox from "../../components/StatBox";

// Define a functional component named Dashboard
const Dashboard = () => {
  // Access the theme object using the useTheme hook
  const theme = useTheme();

  // Check if the screen width is greater than or equal to 1200px
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // const { data, isLoading } = useGetDashboardQuery();

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

  // Return JSX for rendering the Dashboard component
  return (
    <Box m='1.5rem 2.5rem'>
      {/* Flex container with space-between alignment for header and button */}
      <FlexBetween>
        {/* Header component with title and subtitle */}
        <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />

        {/* Button for downloading reports */}
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px"
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      {/* Container for grid layout */}
      <Box
        mt='20px'
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='160px'
        gap='20px'
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" }
        }}
      >
        {/* Row 1: StatBoxes and OverviewChart */}
        <StatBox
          title='Total Customers'
          value={data && data.totalCustomers}
          increase='+14%'
          description='Since last month'
          icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title='Sales Today'
          value={data && data.todayStats.totalSales}
          increase='+21%'
          description='Since last month'
          icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <Box
          gridColumn='span 8'
          gridRow='span 2'
          backgroundColor={theme.palette.background.alt}
          p='1rem'
          borderRadius='0.55rem'
        >
          {/* OverviewChart component for sales */}
          <OverviewChart view='sales' isDashboard={true} />
        </Box>
        <StatBox
          title='Monthly Sales'
          value={data && data.thisMonthStats.totalSales}
          increase='+5%'
          description='Since last month'
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
        <StatBox
          title='Yearly Sales'
          value={data && data.yearlySalesTotal}
          increase='+43%'
          description='Since last month'
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        {/* Row 2: DataGrid and BreakdownChart */}
        <Box
          gridColumn='span 8'
          gridRow='span 3'
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem"
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
              backgroundColor: theme.palette.background.alt
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
          {/* DataGrid component for transactions */}
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn='span 4'
          gridRow='span 3'
          backgroundColor={theme.palette.background.alt}
          p='1.5rem'
          borderRadius='0.55rem'
        >
          {/* Typography, BreakdownChart, and description */}
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p='0 0.6rem'
            fontSize='0.8rem'
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// Export the Dashboard component as the default export
export default Dashboard;
