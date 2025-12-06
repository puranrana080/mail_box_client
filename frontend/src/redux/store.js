import { configureStore } from "@reduxjs/toolkit";
import inboxReducer from "./slice/inboxSlice.js";

export const store = configureStore({
  reducer: {
    mail: inboxReducer,
  },
});
