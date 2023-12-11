import { createSlice } from "@reduxjs/toolkit";

const initialState = { phoneNumber: false, managers: {}, launch: false };

const botNumSlice = createSlice({
  name: "botNum",
  initialState,
  reducers: {
    setBotNum(state, action) {
      state.phoneNumber = action.payload;
    },
    setManager(state, action) {
      state.managers[action.payload.manager] = action.payload.phoneNumber;
    },
    setLaunch(state, action) {
      state.launch = action.payload;
    },
  },
});

export const { setBotNum, setManager, setLaunch } = botNumSlice.actions;
export default botNumSlice.reducer;
