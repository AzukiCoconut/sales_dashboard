// Importing necessary React-related modules
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Importing the main App component
import { configureStore } from "@reduxjs/toolkit"; // Importing configureStore function from Redux Toolkit
import globalReducer from "./utils"; // Importing the globalReducer from the utils directory
import { Provider } from "react-redux"; // Importing Provider to connect React with Redux
import { setupListeners } from "@reduxjs/toolkit/query"; // Importing setupListeners function for Redux Toolkit query slices
import "./index.css"; // Importing styles for the application

// Configuring the Redux store with the globalReducer
const store = configureStore({
  reducer: {
    global: globalReducer, // Using the globalReducer to manage global state
  },
});

// Setting up listeners for Redux Toolkit query slices
setupListeners(store.dispatch);

// Rendering the main React application using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrapping the entire application with React.StrictMode for additional checks in development mode
  <React.StrictMode>
    {/* Providing the Redux store to the entire application using Provider */}
    <Provider store={store}>
      {/* Rendering the main App component */}
      <App />
    </Provider>
  </React.StrictMode>
);
