// Import necessary dependencies from React, MUI (Material-UI), and other libraries
import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
// import { useGetUserQuery } from "state/api";

// Define a functional component named Layout
function Layout() {
  const { loading, data } = useQuery(QUERY_ME);
  // Use the useMediaQuery hook to check for non-mobile screens
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  // State to manage the open/closed state of the sidebar
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  // Extract the userId from the global state using the useSelector hook
  const userId = useSelector((state) => state.global.userId);
  // Fetch user data based on the userId using the useGetUserQuery hook (commented out)

  // Return JSX for rendering the Layout component
  return (
    <Box display={isNonMobile ? "flex" : "block"} width='100%' height='100%'>
      {/* Sidebar component */}
      <Sidebar
        //user={data?.me || {}} // Pass user data to the Sidebar component
        isNonMobile={isNonMobile}
        drawerWidth='250px'
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Box flexGrow={1}>
        {/* Navbar component */}
        <Navbar
          //user={data?.me || {}} // Pass user data to the Navbar component
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        {/* Outlet component to render child components based on the route */}
        <Outlet />
      </Box>
    </Box>
  );
}

// Export the Layout component as the default export
export default Layout;
