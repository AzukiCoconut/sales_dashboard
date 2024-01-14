// Import necessary dependencies from React, MUI (Material-UI), and other libraries
import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define a functional component named Daily
const Daily = () => {
  // State variables for date range selection using React-DatePicker
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));

  // Fetch sales data using the useGetSalesQuery from the API
  const { data } = useGetSalesQuery();

  // Access the theme object using the useTheme hook
  const theme = useTheme();

  // Memoized computation of formatted data based on the selected date range
  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { dailyData } = data;
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

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);

        totalSalesLine.data = [
          ...totalSalesLine.data,
          {
            x: splitDate,
            y: totalSales
          }
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits }
        ];
      }
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  // Return JSX for rendering the Daily component
  return (
    <Box m='1.5rem 2.5rem'>
      {/* Header component with title and subtitle */}
      <Header title='DAILY SALES' subtitle='Chart of daily sales' />

      {/* Container for the date range selection and the Nivo Line Chart */}
      <Box height='75vh'>
        {/* Date range selection using React-DatePicker */}
        <Box display='flex' justifyContent='flex-end'>
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

        {/* Conditional rendering based on data availability */}
        {data ? (
          // Nivo ResponsiveLine component rendering the formatted data
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                // Styling for axis elements
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
                // Styling for tooltip container
                container: {
                  color: theme.palette.primary.main
                }
              }
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false
            }}
            yFormat=' >-.2f'
            curve='catmullRom'
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle"
            }}
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
            legends={[
              // Legend configuration
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
          // Loading state when data is being fetched
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

// Export the Daily component as the default export
export default Daily;
