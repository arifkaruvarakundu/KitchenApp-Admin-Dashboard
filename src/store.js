// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import darkModeReducer from "./features/darkMode/darkModeSlice";

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    darkMode: darkModeReducer,

  },
});

export default store;
