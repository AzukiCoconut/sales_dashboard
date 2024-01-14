// Import necessary dependencies from MUI (Material-UI)
import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Define a styled component named FlexBetween based on MUI's Box component
const FlexBetween = styled(Box)({
  // Set the styled component's display property to 'flex'
  display: "flex",
  // Align items along the main axis to 'space-between'
  justifyContent: "space-between",
  // Align items along the cross axis to 'center'
  alignItems: "center"
});

// Export the FlexBetween component as the default export
export default FlexBetween;
