import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSidebar: false,
  adminSidebar: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: {
    toggleSidebar: (state) => {
      state.openSidebar = !state.openSidebar;
    },
    toggleAdminSidebar: (state) => {
      state.adminSidebar = !state.adminSidebar;
    },
  },
});

export const { toggleSidebar, toggleAdminSidebar } = appSlice.actions;
export default appSlice.reducer;
