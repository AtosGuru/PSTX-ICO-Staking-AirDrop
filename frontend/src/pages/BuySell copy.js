import {
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TokenIcon from "@mui/icons-material/Token";
import usdtSvg from "../assets/usdt-logo.svg";
import usdcSvg from "../assets/usdc-logo.svg";
import { btnClasses } from "../class/button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLICKEY } from "../config/stripe";
import CheckoutForm from "../components/CheckoutForm";
import { useEffect, useState } from "react";
import backLogo from "../assets/backLogo.png";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { PSTX_PRICE } from "../config/constant";
import BigNumber from "bignumber.js";
import { useDispatch, useSelector } from "react-redux";
import { buyWithUSDC, buyWithUSDT } from "../actions/purchase";
const stripePromise = loadStripe(STRIPE_PUBLICKEY);
const BuySell = () => {
  // const [stripeCurrency, setStripeCurrency] = useState("usd");
  // const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const { walletAddress } = useSelector((state) => state.auth);
  const [options, setOptions] = useState({
    appearance: {
      theme: "night",
    },
    mode: "payment",
    paymentMethodCreation: "manual",
    amount: 100,
    currency: "usd",
  });

  const [paymentMethod, setPaymentMethod] = useState("USDT");
  const [pstxAmount, setPstxAmount] = useState(0);
  const [usdAmount, setUsdAmount] = useState(0);

  useEffect(() => {
    if (usdAmount >= 0.5)
      setOptions({
        ...options,
        amount: usdAmount * 100,
      });
  }, [usdAmount]);
  return (
    <>
      <Stack flexDirection={"row"} padding={10} justifyContent={"space-around"}>
        <Stack width={"450px"} gap={5}>
          <Typography
            sx={{
              fontSize: "46px",
              color: "aquamarine",
            }}
          >
            About PSTX verbiage
          </Typography>
          <Typography>
            <Typography
              sx={{
                fontSize: "20px",
                color: "white",
              }}
            >
              PSTXis the native token of PowerShift Network which is fully
              decentralized, community governed & owned protocl managed by $PSTX
              holders
            </Typography>
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              color: "white",
            }}
          >
            1 PSTX = 0.1 USD
          </Typography>
          <img src={backLogo} alt="backlog" />
        </Stack>
        <Stack>
          <Stack gap={4} paddingBottom={10}>
            <Typography
              sx={{
                fontSize: "46px",
                color: "aquamarine",
                textAlign: "center",
              }}
            >
              Purchase PSTX
            </Typography>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={5}
            >
              <TextField
                type="number"
                InputProps={{
                  inputMode: "decimal",
                  pattern: "[0-9]*",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography padding={1}>PSTX</Typography>
                    </InputAdornment>
                  ),
                  style: {
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "10px",
                    fontSize: "24px",
                    paddingLeft: "20px",
                    width: "200px",
                  },
                }}
                variant="standard"
                value={pstxAmount}
                onInput={(e) => {
                  if (e.target.value === "") {
                    setUsdAmount(0);
                    setPstxAmount(0);
                  } else {
                    setPstxAmount(parseFloat(e.target.value));
                    setUsdAmount(
                      new BigNumber(e.target.value)
                        .multipliedBy(PSTX_PRICE)
                        .toFixed(2)
                    );
                  }
                }}
              />
              <SwapHorizIcon sx={{ color: "white" }} fontSize="large" />
              <TextField
                type="number"
                InputProps={{
                  inputMode: "decimal",
                  pattern: "[0-9]*",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography padding={1}>$</Typography>
                    </InputAdornment>
                  ),
                  style: {
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "10px",
                    fontSize: "24px",
                    paddingLeft: "20px",
                    width: "200px",
                  },
                }}
                variant="standard"
                value={usdAmount}
                onInput={(e) => {
                  if (e.target.value === "") {
                    setUsdAmount(0);
                    setPstxAmount(0);
                  } else {
                    setUsdAmount(parseFloat(e.target.value));
                    setPstxAmount(
                      new BigNumber(e.target.value)
                        .dividedBy(PSTX_PRICE)
                        .toFixed(3)
                    );
                  }
                }}
              />
            </Stack>
            <Stack sx={{ color: "white" }} textAlign={"center"}>
              <Typography>({pstxAmount} PSTX are being purchased)</Typography>
            </Stack>
            {usdAmount > 0 && (
              <Stack>
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                  mt={2}
                >
                  <Typography sx={{ color: "white", fontSize: "24px" }}>
                    Choose A Payment Method
                  </Typography>

                  <FormControl
                    sx={{
                      color: "white",
                    }}
                  >
                    <RadioGroup
                      row={true}
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="USDT"
                      name="radio-buttons-group"
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="USDT"
                        control={
                          <Radio
                            sx={{
                              color: "white",
                              "&.Mui-checked": {
                                color: "white",
                              },
                            }}
                          />
                        }
                        label="USDT"
                      />
                      <FormControlLabel
                        value="USDC"
                        control={
                          <Radio
                            sx={{
                              color: "white",
                              "&.Mui-checked": {
                                color: "white",
                              },
                            }}
                          />
                        }
                        label="USDC"
                      />
                      <FormControlLabel
                        value="CARD"
                        control={
                          <Radio
                            sx={{
                              color: "white",
                              "&.Mui-checked": {
                                color: "white",
                              },
                            }}
                          />
                        }
                        label="Credit Card"
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>
                <Stack alignItems={"center"} mt={2}>
                  {paymentMethod === "USDT" || paymentMethod === "USDC" ? (
                    <Button
                      sx={btnClasses.buttonPrimary}
                      onClick={() => {
                        if (paymentMethod === "USDT") {
                          dispatch(buyWithUSDT(walletAddress, pstxAmount));
                        } else {
                          dispatch(buyWithUSDC(walletAddress, pstxAmount));
                        }
                      }}
                    >
                      Purchase with {paymentMethod}
                    </Button>
                  ) : usdAmount >= 0.5 ? (
                    <Elements stripe={stripePromise} options={options}>
                      <CheckoutForm amount={usdAmount * 100} currency={"usd"} />
                    </Elements>
                  ) : (
                    <Typography
                      sx={{
                        color: "white",
                      }}
                    >
                      You should input at least 0.5 $
                    </Typography>
                  )}
                  {console.log(usdAmount)}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default BuySell;
