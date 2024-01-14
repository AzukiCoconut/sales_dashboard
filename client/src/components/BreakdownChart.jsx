// Import necessary dependencies from React, @nivo/pie, and @mui/material
import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
// import { useGetSalesQuery } from "state/api";

// Define a React functional component named BreakdownChart
const BreakdownChart = ({ isDashboard = false }) => {
  // Commented out code for fetching sales data using an API query
  // const { data, isLoading } = useGetSalesQuery();

  // Fetch theme from MUI (Material-UI) to customize chart appearance
  const theme = useTheme();

  // Check if data is not available or still loading, display a loading message
  if (!data || isLoading) return "Loading...";

  // Define an array of colors based on the MUI theme
  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500]
  ];

  // Format data for the pie chart, extracting category, sales, and assigning colors
  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i]
    })
  );

  // Return JSX for rendering the chart and additional information
  return (
    <Box
      // Set height, width, and position styles for the container Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position='relative'
    >
      {/* Render the ResponsivePie chart from @nivo/pie */}
      <ResponsivePie
        // Pass the formatted data to the chart
        data={formattedData}
        // Customize the theme of the chart, including axis, legend, tooltip styles
        theme={{
          // Styles for axis
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200]
              }
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200]
              }
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1
              },
              text: {
                fill: theme.palette.secondary[200]
              }
            }
          },
          // Styles for legends
          legends: {
            text: {
              fill: theme.palette.secondary[200]
            }
          },
          // Styles for tooltip
          tooltip: {
            container: {
              color: theme.palette.primary.main
            }
          }
        }}
        // Customize colors of the chart elements
        colors={{ datum: "data.color" }}
        // Set margin for the chart
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        // Enable sorting of chart elements by value
        sortByValue={true}
        // Set inner radius for the pie chart
        innerRadius={0.45}
        // Set offset for the outer radius when an arc is active
        activeOuterRadiusOffset={8}
        // Set border width for the chart elements
        borderWidth={1}
        // Set border color for the chart elements
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]]
        }}
        // Enable arc link labels unless it is a dashboard view
        enableArcLinkLabels={!isDashboard}
        // Set text color for arc link labels
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        // Set thickness for arc link labels
        arcLinkLabelsThickness={2}
        // Set color for arc link labels
        arcLinkLabelsColor={{ from: "color" }}
        // Set skip angle for arc labels
        arcLabelsSkipAngle={10}
        // Set text color for arc labels
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]]
        }}
        // Configure legends for the chart
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500]
                }
              }
            ]
          }
        ]}
      />
      {/* Display total sales information in a Box positioned at the center */}
      <Box
        position='absolute'
        top='50%'
        left='50%'
        color={theme.palette.secondary[400]}
        textAlign='center'
        pointerEvents='none'
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)"
        }}
      >
        {/* Display total sales information using Typography component */}
        <Typography variant='h6'>
          {!isDashboard && "Total:"} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};

// Export the BreakdownChart component as the default export
export default BreakdownChart;
