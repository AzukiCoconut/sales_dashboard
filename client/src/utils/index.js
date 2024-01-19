import { createSlice } from "@reduxjs/toolkit";

// Redux state management to handle the switch between light & dark themes.
const initialState = {
  mode: "dark"
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    }
  }
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
