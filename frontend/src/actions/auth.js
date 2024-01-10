import { getEthBalance, getPstxAmount } from "../utils/api";
import {
  login,
  logout,
  setEthBalance,
  setPstxAmount,
  setWalletAddress,
} from "../slices/authSlice";
import { setProvider, setSigner } from "../slices/providerSlice";

const ethers = require("ethers");
const { Magic } = require("magic-sdk");

const customNodeOptions = {
  rpcUrl: "https://polygon-rpc.com/", // Polygon RPC URL
  chainId: 137, // Polygon chain id
};

const magic = new Magic(process.env.REACT_APP_MAGIC, {
  network:
    process.env.REACT_APP_NETWORK === "polygon" ? customNodeOptions : "goerli",
});
export const showWalletUI = () => async (dispatch) => {
  try {
    await magic.wallet.showUI().on("disconnect", () => {
      dispatch(disconnectWallet());
    });
  } catch (err) {}
};
export const connectWallet = () => async (dispatch) => {
  try {
    let provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    let signer;
    await magic.wallet.connectWithUI();

    try {
      await magic.wallet.showUI().on("disconnect", () => {
        dispatch(disconnectWallet());
      });
    } catch (err) {
      const magicProvider = await magic.wallet.getProvider();
      provider = new ethers.providers.Web3Provider(magicProvider);
    }

    signer = provider.getSigner();
    let address = await signer.getAddress();
    dispatch(setProvider(provider));
    dispatch(setSigner(signer));
    dispatch(setWalletAddress(address));
    dispatch(login());
  } catch (err) {
    console.log(err);
  }
};

export const getPstxTokenAmount = (address) => async (dispatch) => {
  let pstxBalance = (await getPstxAmount(address)).toString();
  dispatch(setPstxAmount(pstxBalance));
};
export const getEthAmount = (address) => async (dispatch) => {
  let eth = (await getEthBalance(address)).toString();
  dispatch(setEthBalance(eth));
};
export const disconnectWallet = () => async (dispatch) => {
  const isLoggedIn = await magic.user.isLoggedIn();
  try {
    if (isLoggedIn) {
      await magic.user.logout();
    } else {
      await magic.wallet.disconnect();
    }
  } catch (err) {}
  dispatch(logout());
};
