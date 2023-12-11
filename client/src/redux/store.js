import { configureStore } from "@reduxjs/toolkit";
import botNumSlice from "./slices/botNumSlice.js";

const store = configureStore({
  reducer: { botNumSlice },
});

export default store;
