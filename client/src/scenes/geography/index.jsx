// Import necessary dependencies from React, MUI (Material-UI), and other libraries
import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../../utils/geoData.js";
import { useQuery } from "@apollo/client";
import { GET_GEOGRAPHY } from "../../utils/queries.js";

// Define a functional component named Geography
const Geography = () => {
  // Access the theme object using the useTheme hook
  const theme = useTheme();
  // Fetch data using the useGetGeographyQuery hook
  const { data } = useQuery(GET_GEOGRAPHY);

  // Return JSX for rendering the Geography component
  return (
    <Box m='1.5rem 2.5rem'>
      {/* Header component with title and subtitle */}
      <Header title='GEOGRAPHY' subtitle='Find where your users are located.' />
      <Box
        mt='40px'
        height='75vh'
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius='4px'
      >
        {/* Check if data is available */}
        {data ? (
          <ResponsiveChoropleth
            data={data?.getGeography}
            // Theme customization for axis, legends, and tooltip
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
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor='#666666'
            label='properties.name'
            valueFormat='.2s'
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor='#ffffff'
            // Legends configuration
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                // Effects on hover
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
        ) : (
          // Display loading message if data is not available
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

// Export the Geography component as the default export
export default Geography;
