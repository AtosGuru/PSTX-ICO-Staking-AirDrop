import { toast } from "react-toastify";
import { get_airdrop } from "../api/axios";
import { getEthAmount, getPstxTokenAmount } from "./auth";
import store from "../store";

export const airdrop = (address, redeem) => (dispatch) => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  if (isAuthenticated !== true) {
    toast.error("Connect Your Wallet", { theme: "dark" });
  } else {
    const myToast = toast.info("Please wait until process is completed!", {
      theme: "dark",
      autoClose: false,
    });
    get_airdrop(address, redeem)
      .then((res) => {
        dispatch(getPstxTokenAmount(address));
        dispatch(getEthAmount(address));
        toast.dismiss(myToast);
        toast.success("Your airdrop succeeded!", {
          theme: "dark",
        });
        toast.success("Check your PSTX transfer tx here", {
          onClick: () => {
            window.open(
              `https:\\polygonscan.com\tx${res.data.hashPstx}`,
              "_blank"
            );
          },
          theme: "dark",
          autoClose: 10000,
        });
        toast.success("Check your MATIC transfer tx here", {
          onClick: () => {
            window.open(
              `https:\\polygonscan.com\tx${res.data.hashMatic}`,
              "_blank"
            );
          },
          theme: "dark",
          autoClose: 10000,
        });
      })
      .catch((err) => {
        toast.dismiss(myToast);
        toast.error(err.response.data, {
          theme: "dark",
        });
      });
  }
};
