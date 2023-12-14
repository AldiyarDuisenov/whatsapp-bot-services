import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phoneNumber: false,
  managers: [],
  qrcode: "",
  url: "http://localhost:8080",
  botFunctions: [],
};

const botNumSlice = createSlice({
  name: "botNum",
  initialState,
  reducers: {
    setBotNum(state, action) {
      state.botNumber = action.payload;
    },
    setManager(state, action) {
      state.managers = action.payload;
    },
    setQrcode(state, action) {
      state.qrcode = action.payload;
    },
    addFunctions(state, action) {
      state.botFunctions = action.payload;
    },
  },
});

export const { setBotNum, setManager, setQrcode, addFunctions } =
  botNumSlice.actions;
export default botNumSlice.reducer;
