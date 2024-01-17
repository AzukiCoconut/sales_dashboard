// Import necessary dependencies from React, MUI (Material-UI), MUI Icons, and custom components
import React, { useState } from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../utils';
import profileImage from '../assets/profile.jpeg';
import {
  AppBar,
  useTheme,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import Auth from '../utils/auth';

// Define a functional component named Navbar
const Navbar = ({ user, isSideBarOpen, setIsSideBarOpen }) => {
  // Access the Redux dispatch function
  const dispatch = useDispatch();
  // Access the theme object using the useTheme hook
  const theme = useTheme();

  // State to manage the anchor element for the user menu
  const [anchorEl, setAnchorEl] = useState(null);
  // Determine if the menu is open based on the anchor element
  const isOpen = Boolean(anchorEl);
  // Handler to open the user menu
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  // Handler to close the user menu
  const handleClose = () => setAnchorEl(null);

  // Return JSX for rendering the Navbar
  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          {/* IconButton to toggle the sidebar */}
          <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            <MenuIcon />
          </IconButton>
          {/* Flex container for search input and search button */}
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius='9px'
            gap='3rem'
            p='0.1rem 1.5rem'
          >
            <InputBase placeholder='Search...' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap='1.5rem'>
          {/* IconButton to toggle light/dark mode */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          {/* IconButton for settings */}
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>

          {/* Flex container for user profile and dropdown */}
          <FlexBetween>
            {/* Button with user profile image and dropdown arrow */}
            <Button
              onClick={handleClick}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'none',
                gap: '1rem',
              }}
            >
              <Box
                component='img'
                alt='profile'
                src={profileImage}
                height='32px'
                width='32px'
                borderRadius='50%'
                sx={{ objectFit: 'cover' }}
              />
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
              />
            </Button>
            {/* User menu */}
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              {/* Menu item for logging out */}
              <MenuItem onClick={Auth.logout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

// Export the Navbar component as the default export
export default Navbar;
