// Import necessary dependencies from React, MUI (Material-UI), and other libraries
import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";

// Define a functional component named Monthly
const Monthly = () => {
  // Fetch sales data using the useGetSalesQuery hook
  const { data } = useGetSalesQuery();
  // Access the theme object from MUI
  const theme = useTheme();

  // Use useMemo to format data only when data changes
  const [formattedData] = useMemo(() => {
    // Return an empty array if data is not available
    if (!data) return [];

    // Extract monthlyData from the fetched data
    const { monthlyData } = data;

    // Initialize lines for totalSales and totalUnits
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: []
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: []
    };

    // Loop through monthlyData to populate lines
    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [...totalSalesLine.data, { x: month, y: totalSales }];
      totalUnitsLine.data = [...totalUnitsLine.data, { x: month, y: totalUnits }];
    });

    // Return formatted data array containing totalSalesLine and totalUnitsLine
    return [totalSalesLine, totalUnitsLine];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  // Return JSX for rendering the Monthly component
  return (
    <Box m='1.5rem 2.5rem'>
      {/* Header component */}
      <Header title='MONTHLY SALES' subtitle='Chart of monthly sales' />
      <Box height='75vh'>
        {/* Display a line chart using ResponsiveLine from nivo */}
        {data ? (
          <ResponsiveLine
            data={formattedData}
            // Styling and theming configurations
            theme={{
              // Axis and legend styling
              axis: {
                domain: { line: { stroke: theme.palette.secondary[200] } },
                legend: { text: { fill: theme.palette.secondary[200] } },
                ticks: { line: { stroke: theme.palette.secondary[200], strokeWidth: 1 }, text: { fill: theme.palette.secondary[200] } }
              },
              // Tooltip styling
              tooltip: { container: { color: theme.palette.primary.main } },
              // Legends styling
              legends: { text: { fill: theme.palette.secondary[200] } }
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
            yFormat=' >-.2f'
            axisTop={null}
            axisRight={null}
            // Configuration for x-axis
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle"
            }}
            // Configuration for y-axis
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle"
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            // Legends configuration
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                // Effects on hover
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

// Export the Monthly component as the default export
export default Monthly;
