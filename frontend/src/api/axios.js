import { api } from "../config/axios";
export const get_airdrop = (address, redeem) => {
  return api.get(`/get_airdrop_matic?address=${address}&redeem=${redeem}`);
};
