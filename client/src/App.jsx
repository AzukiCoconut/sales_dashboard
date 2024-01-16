import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { themeSettings } from "./theme"; // Importing theme settings from a separate file
import { useSelector } from "react-redux"; // Importing useSelector hook from React-Redux for accessing global state
// import Dashboard from "./scenes/dashboard"; // Importing the Dashboard component
import Layout from "./scenes/layout"; // Importing the Layout component
import Products from "./scenes/products";
import Customers from "./scenes/customers";
import Transactions from "./scenes/transactions";
import Geography from "./scenes/geography";
import Overview from "./scenes/overview";
import Daily from "./scenes/daily";
import Monthly from "./scenes/monthly";
import Admin from "./scenes/admin";
import Performance from "./scenes/performance";
import Login from "./scenes/login";
import Signup from "./scenes/signup";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql"
});
// link to GraphQL server

// middleware to retrieve token from localStorage and set the request headers before making the GraphQL API request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

// instantiate ApolloClient
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  // Accessing the 'mode' property from the global state using the useSelector hook
  const mode = useSelector((state) => state.global.mode);
  // Creating a theme based on the current mode using the useMemo hook
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
  // Rendering the App component
  return (
    <div className='app'>
      <ApolloProvider client={client}>
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
                <Route path='/' element={<Navigate to='/login' replace />} /> {/* Defining a route for the root URL */}
                <Route path='/dashboard' element={<Products />} />
                <Route path='/products' element={<Products />} />
                <Route path='/customers' element={<Customers />} />
                <Route path='/transactions' element={<Transactions />} />
                <Route path='/geography' element={<Geography />} />
                <Route path='/overview' element={<Overview />} />
                <Route path='/daily' element={<Daily />} />
                <Route path='/monthly' element={<Monthly />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/performance' element={<Performance />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

// Exporting the App component for use in other parts of the application
export default App;
