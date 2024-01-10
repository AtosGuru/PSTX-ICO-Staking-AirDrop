import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  email: null,
  walletAddress: null,
  ethAmount: 0,
  pstxAmount: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setEthBalance: (state, action) => {
      state.ethAmount = action.payload;
    },
    setPstxAmount: (state, action) => {
      state.pstxAmount = action.payload;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.walletAddress = null;
    },
  },
});

export const { login, logout, setWalletAddress, setEthBalance, setPstxAmount } =
  authSlice.actions;

export default authSlice.reducer;
