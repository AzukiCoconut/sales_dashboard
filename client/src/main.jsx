import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./utils";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import "./index.css";

const store = configureStore({
  reducer: {
    global: globalReducer
  }
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
