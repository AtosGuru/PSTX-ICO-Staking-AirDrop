import { ethers } from "ethers";
import { addresses } from "../config/address";
import store from "../store";
import { toast } from "react-toastify";
import BigNumber from "bignumber.js";
import { getPstxTokenAmount } from "./auth";
const controller_ABI = require("../abis/controller.json");
const ERC20_ABI = require("../abis/erc20.json");

export const buyWithUSDT = (address, pstx_amount) => async (dispatch) => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  if (isAuthenticated !== true) {
    toast.error("Connect Your Wallet", { theme: "dark" });
  } else {
    try {
      const signer = store.getState().provider.signer;
      const usdtContract = new ethers.Contract(
        addresses.USDT,
        ERC20_ABI,
        signer
      );
      const balance = await usdtContract.balanceOf(address);
      const allowance = await usdtContract.allowance(
        address,
        addresses.CONTROLLER
      );

      const controllerContract = new ethers.Contract(
        addresses.CONTROLLER,
        controller_ABI,
        signer
      );
      console.log(balance, allowance);
      if (balance < pstx_amount * 10 ** 5) {
        toast.error("You don't have enough USDT to buy PSTX", {
          theme: "dark",
        });
      } else {
        if (allowance < pstx_amount * 10 ** 5) {
          const tx = await usdtContract.approve(
            addresses.CONTROLLER,
            pstx_amount * 10 ** 5
          );
          await tx.wait();
        }
        const tx = await controllerContract.buyWithUSDT(
          BigNumber(pstx_amount * 10 ** 3).toString()
        );
        const myToast = toast.info("Please wait until process is completed!", {
          theme: "dark",
          autoClose: false,
        });
        await tx.wait();
        toast.success("successfully bought, check your tx here", {
          theme: "dark",
          autoClose: 10000,
          onClose: () => {
            window.open(`https://polygonscan.com/tx/${tx.hash}`, "_blank");
          },
        });
        toast.dismiss(myToast);
        dispatch(getPstxTokenAmount(address));
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export const buyWithUSDC = (address, pstx_amount) => async (dispatch) => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  if (isAuthenticated !== true) {
    toast.error("Connect Your Wallet", { theme: "dark" });
  } else {
    try {
      const signer = store.getState().provider.signer;
      const usdcContract = new ethers.Contract(
        addresses.USDC,
        ERC20_ABI,
        signer
      );
      const balance = await usdcContract.balanceOf(address);
      const allowance = await usdcContract.allowance(
        address,
        addresses.CONTROLLER
      );

      const controllerContract = new ethers.Contract(
        addresses.CONTROLLER,
        controller_ABI,
        signer
      );
      console.log(balance, allowance);
      if (balance < pstx_amount * 10 ** 5) {
        toast.error("You don't have enough USDC to buy PSTX", {
          theme: "dark",
        });
      } else {
        if (allowance < pstx_amount * 10 ** 5) {
          const tx = await usdcContract.approve(
            addresses.CONTROLLER,
            pstx_amount * 10 ** 5
          );
          await tx.wait();
        }
        const tx = await controllerContract.buyWithUSDC(
          BigNumber(pstx_amount * 10 ** 3).toString()
        );

        const myToast = toast.info("Please wait until process is completed!", {
          theme: "dark",
          autoClose: false,
        });
        await tx.wait();
        toast.success("successfully bought, check your tx here", {
          theme: "dark",
          autoClose: 10000,
          onClose: () => {
            window.open(`https://polygonscan.com/tx/${tx.hash}`, "_blank");
          },
        });
        toast.dismiss(myToast);
        dispatch(getPstxTokenAmount(address));
      }
    } catch (err) {
      console.log(err);
    }
  }
};
