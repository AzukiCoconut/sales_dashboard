import { useState, useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout";
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
import AuthHandler from "./components/AuthHandler";

// ... existing Apollo Client setup ...
//function to create a new link to the GraphQL server at /graphql.
const httpLink = createHttpLink({
  uri: "/graphql"
});
//function to retrieve the token from localStorage
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});
//Client instance that connects to the API server using the authentication token
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className='app'>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthHandler setIsAuthenticated={setIsAuthenticated} />
            <Routes>
              {!isAuthenticated ? (
                // Public Routes
                <>
                  <Route
                    path='/login'
                    element={<Login setIsAuthenticated={setIsAuthenticated} />}
                  />
                  <Route
                    path='/signup'
                    element={<Signup setIsAuthenticated={setIsAuthenticated} />}
                  />
                  <Route path='/' element={<Navigate to='/login' replace />} />
                </>
              ) : (
                // Protected Routes
                <Route element={<Layout />}>
                  <Route
                    path='/'
                    element={<Navigate to='/dashboard' replace />}
                  />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/products' element={<Products />} />
                  <Route path='/customers' element={<Customers />} />
                  <Route path='/transactions' element={<Transactions />} />
                  <Route path='/geography' element={<Geography />} />
                  <Route path='/overview' element={<Overview />} />
                  <Route path='/daily' element={<Daily />} />
                  <Route path='/monthly' element={<Monthly />} />
                  <Route path='/admin' element={<Admin />} />
                  <Route path='/performance' element={<Performance />} />
                  <Route path='*' element={<Navigate to='/' replace />} />
                </Route>
              )}
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
