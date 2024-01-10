import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provider: null,
  signer: null,
};

export const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setSigner: (state, action) => {
      state.signer = action.payload;
    },
  },
});

export const { setProvider, setSigner } = providerSlice.actions;

export default providerSlice.reducer;
