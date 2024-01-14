// Importing necessary components and utilities from Material-UI and React
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { themeSettings } from "./theme"; // Importing theme settings from a separate file
import { useSelector } from "react-redux"; // Importing useSelector hook from React-Redux for accessing global state
import Dashboard from "./scenes/dashboard"; // Importing the Dashboard component
import Layout from "./scenes/layout"; // Importing the Layout component

// Main App component
function App() {
  // Accessing the 'mode' property from the global state using the useSelector hook
  const mode = useSelector((state) => state.global.mode);

  // Creating a theme based on the current mode using the useMemo hook
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));

  // Rendering the App component
  return (
    <div className='app'>
      {/* Using BrowserRouter to enable routing in the application */}
      <BrowserRouter>
        {/* Providing the theme to the entire application using ThemeProvider */}
        <ThemeProvider theme={theme}>
          {/* Applying a baseline style to improve cross-browser consistency */}
          <CssBaseline />
          {/* Defining the routes for the application */}
          <Routes>
            {/* Setting a default route to the Layout component */}
            <Route element={<Layout />}>
              <Route path='/' /> {/* Defining a route for the root URL */}
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

// Exporting the App component for use in other parts of the application
export default App;
