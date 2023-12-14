import { configureStore } from "@reduxjs/toolkit";
import botNumSlice from "./slices/bot.js";

const store = configureStore({
  reducer: { botNumSlice },
});

export default store;
