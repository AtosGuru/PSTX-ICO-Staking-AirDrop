import { addresses } from "../config/address";
import store from "../store";
const ethers = require("ethers");
const pstxABI = require("../abis/pstx.json");
export const getPstxAmount = async (address) => {
  const provider = store.getState().provider.provider;
  const contract = new ethers.Contract(addresses.PSTX, pstxABI, provider);
  return contract.balanceOf(address);
};
export const getEthBalance = async (address) => {
  const provider = store.getState().provider.provider;
  return provider.getBalance(address);
};
