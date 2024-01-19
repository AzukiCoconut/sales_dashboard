// Import necessary dependencies from React, MUI (Material-UI), and Nivo
import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_SALES } from "../utils/queries.js";

// THE NIVO CHART WAS STYLED BY EDROH BUT THE DATA WAS IMPLEMENTED BY TEAM 3
// Define a functional component named OverviewChart
const OverviewChart = ({ isDashboard = false, view }) => {
  // Access the theme object using the useTheme hook
  const theme = useTheme();
  const { loading, data } = useQuery(GET_SALES);

  // useMemo hook to memoize the total sales and total units line data
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data?.overallStats[0]) return [];
    const { monthlyData } = data?.overallStats[0];

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

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales }
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits }
        ];

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [data?.overallStats]); // eslint-disable-line react-hooks/exhaustive-deps

  // If data is not available or still loading, display a loading message
  if (!data?.overallStats || loading) return "Loading...";

  // Return the ResponsiveLine chart component from Nivo
  return (
    <ResponsiveLine
      // Data for the chart based on the selected view (sales or units)
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      // Theme customization for axis, legend, and tooltip
      theme={{
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
        legends: {
          text: {
            fill: theme.palette.secondary[200]
          }
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main
          }
        }
      }}
      // Margin for the chart
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      // Scale for x-axis (type: point)
      xScale={{ type: "point" }}
      // Scale for y-axis
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false
      }}
      // Format for y-axis values
      yFormat=' >-,.0f'
      // Curve interpolation type
      curve='catmullRom'
      // Enable area under the line (for dashboard view)
      enableArea={isDashboard}
      // Axis configurations
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          // Truncate month names to 3 characters for the dashboard view
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // Display legend for non-dashboard view
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle"
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // Display legend for non-dashboard view
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle"
      }}
      // Disable grid lines
      enableGridX={false}
      enableGridY={false}
      // Point customization
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      // Enable mesh (grid)
      useMesh={true}
      // Legends configuration (displayed only in non-dashboard view)
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                // Effects on legend item hover
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
            ]
          : undefined
      }
    />
  );
};

// Export the OverviewChart component as the default export
export default OverviewChart;
