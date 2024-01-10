import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
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
import Container from "../components/Container";
import useCustomClass from "../class/useCustomClasses";
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

  const [paymentMethod, setPaymentMethod] = useState("USD");
  const [pstxAmount, setPstxAmount] = useState(0);
  const [usdAmount, setUsdAmount] = useState(0);
  const [methodOpen, setMethodOpen] = useState(false);
  const classes = useCustomClass();
  const reset = () => {
    setPstxAmount(0);
    setUsdAmount(0);
  };
  useEffect(() => {
    if (usdAmount >= 0.5)
      setOptions({
        ...options,
        amount: usdAmount * 100,
      });
  }, [usdAmount]);
  return (
    <>
      <Stack alignItems={"center"}>
        <Container>
          <Box sx={classes.container}>
            <Stack
              px={2}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Box sx={classes.title1}>Purchase PSTX</Box>
              <Box fontStyle={"italic"} sx={classes.title1}>
                1 PSTX = 0.10 USD
              </Box>
            </Stack>
            <Stack py={1} gap={1}>
              <TextField
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
                type="number"
                InputProps={{
                  disableUnderline: true,
                  inputMode: "decimal",
                  pattern: "[0-9]*",
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{
                          backgroundColor: "background.green",
                          color: "white",
                        }}
                        mx={2}
                        px={2}
                        py={1}
                        gap={2}
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderRadius={4}
                      >
                        <Box sx={classes.paymentMethod}>{paymentMethod}</Box>
                        <Stack
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                          position={"relative"}
                        >
                          {methodOpen && (
                            <Stack
                              position={"absolute"}
                              sx={classes.paymentMethodSelect}
                              borderRadius={2}
                              top={0}
                              left={0}
                              px={2}
                              zIndex={10}
                            >
                              <Stack
                                sx={{
                                  color:
                                    paymentMethod === "USD" ? "white" : "grey",
                                  "&:hover": {
                                    color: "text.contrast",
                                  },
                                }}
                                onClick={() => {
                                  setPaymentMethod("USD");
                                  setMethodOpen(false);
                                }}
                              >
                                USD($)
                              </Stack>
                              <Stack
                                sx={{
                                  color:
                                    paymentMethod === "USDT" ? "white" : "grey",
                                  "&:hover": {
                                    color: "text.contrast",
                                  },
                                }}
                                onClick={() => {
                                  setPaymentMethod("USDT");
                                  setMethodOpen(false);
                                }}
                              >
                                USDT
                              </Stack>
                              <Stack
                                sx={{
                                  color:
                                    paymentMethod === "USDC" ? "white" : "grey",
                                  "&:hover": {
                                    color: "text.contrast",
                                  },
                                }}
                                onClick={() => {
                                  setPaymentMethod("USDC");
                                  setMethodOpen(false);
                                }}
                              >
                                USDC
                              </Stack>
                            </Stack>
                          )}
                          <IconButton
                            onClick={() => {
                              setMethodOpen(true);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="11"
                              viewBox="0 0 22 11"
                              fill="none"
                            >
                              <path d="M1 1L11 10L21 1" stroke="white" />
                            </svg>
                          </IconButton>
                        </Stack>
                      </Box>
                    </InputAdornment>
                  ),
                  sx: classes.amountInput,
                }}
                value={usdAmount}
                variant="standard"
              ></TextField>
              <TextField
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
                type="number"
                InputProps={{
                  disableUnderline: true,
                  inputMode: "decimal",
                  pattern: "[0-9]*",
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography padding={1} sx={classes.endComponent}>
                        PSTX
                      </Typography>
                    </InputAdornment>
                  ),
                  sx: classes.amountInput,
                }}
                value={pstxAmount}
                variant="standard"
              ></TextField>
            </Stack>

            {usdAmount >= 0.5 && paymentMethod === "USD" && (
              <Stack px={1}>
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm
                    onReset={reset}
                    amount={usdAmount * 100}
                    currency={"usd"}
                  />
                </Elements>
              </Stack>
            )}
            {paymentMethod !== "USD" && (
              <Stack
                marginTop={1}
                sx={{
                  backgroundColor: "background.green",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "17px",
                  paddingY: "15px",
                  textAlign: "center",
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "background.light",
                  },
                  "&:active": {
                    backgroundColor: "background.stone",
                  },
                }}
                onClick={() => {
                  if (paymentMethod === "USDT") {
                    dispatch(buyWithUSDT(walletAddress, pstxAmount));
                  } else {
                    dispatch(buyWithUSDC(walletAddress, pstxAmount));
                  }
                }}
              >
                Purchase
              </Stack>
            )}
          </Box>
        </Container>
      </Stack>
      {methodOpen && (
        <Stack
          position={"fixed"}
          width={"100vw"}
          height={"100vh"}
          top={0}
          sx={{}}
          onClick={() => {
            setMethodOpen(false);
          }}
        ></Stack>
      )}
    </>
  );
};
export default BuySell;
