// Import necessary dependencies from React, MUI (Material-UI), MUI Icons, and custom components
import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import profileImage from "../assets/profile.jpeg";

// Define navigation items for the sidebar
const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "Client Facing", icon: null },
  { text: "Products", icon: <ShoppingCartOutlined /> },
  { text: "Customers", icon: <Groups2Outlined /> },
  { text: "Transactions", icon: <ReceiptLongOutlined /> },
  { text: "Geography", icon: <PublicOutlined /> },
  { text: "Sales", icon: null },
  { text: "Overview", icon: <PointOfSaleOutlined /> },
  { text: "Daily", icon: <TodayOutlined /> },
  { text: "Monthly", icon: <CalendarMonthOutlined /> },
  { text: "Breakdown", icon: <PieChartOutlined /> },
  { text: "Management", icon: null },
  { text: "Admin", icon: <AdminPanelSettingsOutlined /> },
  { text: "Performance", icon: <TrendingUpOutlined /> }
];

// Define a functional component named Sidebar
const Sidebar = ({
  // user,
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
  isNonMobile
}) => {
  // Access the location object from React Router
  const { pathname } = useLocation();
  // State to manage the active menu item
  const [active, setActive] = useState("");
  // Access the navigate function from React Router
  const navigate = useNavigate();
  // Access the theme object using the useTheme hook
  const theme = useTheme();

  // Update the active state when the pathname changes
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  // Return JSX for rendering the Sidebar
  return (
    <Box component='nav'>
      {/* Render the Drawer component when the sidebar is open */}
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth
            }
          }}
        >
          <Box width='100%'>
            <Box m='1.5rem 2rem 2rem 3rem'>
              {/* Flex container for the app name and collapse button (for mobile) */}
              <FlexBetween color={theme.palette.secondary.main}>
                {/* App name */}
                <Box display='flex' alignItems='center' gap='0.5rem'>
                  <Typography variant='h4' fontWeight='bold'>
                    OCEAN WAVE
                  </Typography>
                </Box>
                {/* Collapse button for mobile view */}
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            {/* List of navigation items */}
            <List>
              {navItems.map(({ text, icon }) => {
                // Render a simple Typography for non-icon items
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                // Convert text to lowercase for link comparison
                const lcText = text.toLowerCase();

                // Render a ListItemButton for each navigation item
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      // Styling based on whether the item is active
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100]
                      }}
                    >
                      {/* Icon for the navigation item */}
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200]
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      {/* Text label for the navigation item */}
                      <ListItemText primary={text} />
                      {/* Chevron icon for the active item */}
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          {/* User profile section at the bottom */}
          <Box position='absolute' bottom='2rem'>
            {/* Divider line */}
            <Divider />
            {/* Flex container for user profile and settings */}
            <FlexBetween textTransform='none' gap='1rem' m='1.5rem 2rem 0 3rem'>
              {/* User profile image */}
              <Box
                component='img'
                alt='profile'
                src={profileImage}
                height='40px'
                width='40px'
                borderRadius='50%'
                sx={{ objectFit: "cover" }}
              />
              {/* Settings icon */}
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px"
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

// Export the Sidebar component as the default export
export default Sidebar;
