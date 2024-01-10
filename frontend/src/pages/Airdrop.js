import {
  Box,
  Button,
  Checkbox,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import airdropBack from "../assets/airdropBack.png";
import { btnClasses } from "../class/button";
import { useState } from "react";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useDispatch, useSelector } from "react-redux";
import { airdrop } from "../actions/airdrop";
import Container from "../components/Container";
import useCustomClass from "../class/useCustomClasses";
import { getAddress16 } from "../utils/address";
const AirdropPage = () => {
  const accept = localStorage.getItem("acceptTerms") === "true" ? true : false;
  const { walletAddress } = useSelector((state) => state.auth);
  const [redeem, setRedeem] = useState("");
  const [acceptDialog, setAcceptDialog] = useState(!accept);
  const [termChecked, setTermChecked] = useState(false);
  const dispatch = useDispatch();
  const classes = useCustomClass();
  return (
    <>
      <Stack flexDirection={"row"} justifyContent={"center"}>
        <Container>
          <Box sx={classes.container} gap={1}>
            <Box paddingX={2} sx={classes.title1}>
              Register for Airdrop
            </Box>
            <Stack
              px={2}
              sx={classes.subContainer}
              paddingY={2}
              // alignItems={"flex-start"}
            >
              <Stack sx={classes.textGreen}>
                Receive 1,000 PSTX + 0.01 MATIC
              </Stack>
              <Stack sx={{ textAlign: "right", fontSize: "14px" }}>
                To be redeemed to connected wallet{getAddress16(walletAddress)}
              </Stack>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Box pl={1} pr={2} py={1} sx={classes.redeemBox}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                  >
                    <circle cx="3" cy="3" r="3" fill="#287693" />
                  </svg>
                  <Box sx={classes.title2}>Redeem code</Box>
                </Box>
                <TextField
                  InputProps={{
                    disableUnderline: true,
                    sx: classes.redeemInput,
                  }}
                  inputProps={{
                    style: {
                      textAlign: "center",
                    },
                  }}
                  placeholder="redeem code"
                  variant="standard"
                  value={redeem}
                  onInput={(e) => {
                    setRedeem(e.target.value);
                  }}
                />
              </Stack>
              <Box
                sx={{ color: "white", fontSize: "16px", fontWeight: 400 }}
                width={"343px"}
              >
                Take part in our new and exciting Airdrop campaing by
                PowerShift.io
                <br />
                <br />
                To see your PSTX in your wallet you will need to "Import Token"
                in your wallet and add a CUSTOM TOKEN using this contract
                address: 0x39A1c2508A0d2c30EBeCd7D62b35F40C7406D60A
              </Box>
            </Stack>
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
                dispatch(airdrop(walletAddress, redeem));
              }}
            >
              Claim Airdrop
            </Stack>
          </Box>
        </Container>
      </Stack>
    </>
  );
};

export default AirdropPage;
