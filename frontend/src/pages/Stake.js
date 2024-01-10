import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Container from "../components/Container";
import { useState } from "react";
import useCustomClass from "../class/useCustomClasses";

const Stake = () => {
  const [stakeTab, setStakeTab] = useState("stake");
  const [stakeAmount, setStakeAmount] = useState(0);
  const [stakePeriod, setStakePeriod] = useState(0);
  const classes = useCustomClass();
  return (
    <>
      <Stack gap={2}>
        <Stack flexDirection={"row"} justifyContent={"center"}>
          <Box
            sx={{
              color: "white",
              fontSize: "36px",
              backgroundColor: "background.secondary",
              padding: "20px",
              borderRadius: 5,
              mb: 5,
            }}
          >
            Note: this is a preview. Staking details and functionality coming
            soon.
          </Box>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"center"}>
          <Container>
            <Box sx={classes.container} gap={1}>
              <Box>
                <Stack
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                  gap={2}
                  paddingX={2}
                >
                  <Stack
                    onClick={() => {
                      setStakeTab("stake");
                    }}
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      backgroundColor:
                        stakeTab === "stake" ? "background.stone" : "none",
                      borderRadius: "16px",
                      "&:hover": {
                        backgroundColor: "background.light",
                        cursor: "pointer",
                      },
                      "&:active": {
                        backgroundColor: "background.secondary",
                        cursor: "pointer",
                      },
                    }}
                    paddingX={4}
                    paddingY={1}
                  >
                    Stake
                  </Stack>
                  <Stack
                    onClick={() => {
                      setStakeTab("withdraw");
                    }}
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      backgroundColor:
                        stakeTab === "withdraw" ? "background.stone" : "none",
                      borderRadius: "16px",
                      "&:hover": {
                        backgroundColor: "background.light",
                        cursor: "pointer",
                      },
                      "&:active": {
                        backgroundColor: "background.secondary",
                        cursor: "pointer",
                      },
                    }}
                    paddingX={4}
                    paddingY={1}
                  >
                    Withdraw
                  </Stack>
                </Stack>
                <Box paddingX={2} sx={{ fontStyle: "italic" }} mt={1}>
                  {stakeTab === "stake" ? (
                    <Box>
                      Rewards vest and are available for withdrawal every 30
                      days
                    </Box>
                  ) : (
                    <Box display={"flex"} gap={1}>
                      Next vesting date:
                      <Box sx={{ fontWeight: "700", fontStyle: "normal" }}>
                        Dec 22, 2023
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box>
                {stakeTab === "withdraw" && (
                  <Box
                    sx={{ color: "white", textAlign: "right" }}
                    pr={1}
                    my={2}
                  >
                    Withdrawable Amount : 5,598.98
                  </Box>
                )}
                <TextField
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
                  value={stakeAmount}
                  variant="standard"
                  onChange={(e) => {
                    setStakeAmount(e.target.value);
                  }}
                ></TextField>
              </Box>

              <Box>
                {stakeTab === "stake" && (
                  <Stack
                    sx={{
                      backgroundColor: "background.light",
                      borderRadius: "30px",
                      paddingX: "12px",
                      paddingY: "9px",
                    }}
                    justifyContent={"space-around"}
                    gap={1}
                    flexDirection={"row"}
                    container
                  >
                    <Stack
                      sx={{
                        textAlign: "center",
                        color: "white",
                        width: "30%",
                        fontSize: "20px",
                        padding: "18px",
                        backgroundColor:
                          stakePeriod === 0
                            ? "background.green"
                            : "background.stone",
                        borderRadius: "16px",
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor:
                            stakePeriod === 0
                              ? "background.green"
                              : "background.light",
                          opacity: 0.9,
                        },
                        "&:active": {
                          cursor: "pointer",
                          backgroundColor: "background.primary",
                        },
                        ...classes.title3,
                      }}
                      onClick={() => {
                        setStakePeriod(0);
                      }}
                    >
                      None - 1x
                    </Stack>

                    <Stack
                      sx={{
                        textAlign: "center",
                        color: "white",
                        width: "30%",
                        fontSize: "20px",
                        padding: "18px",
                        backgroundColor:
                          stakePeriod === 6
                            ? "background.green"
                            : "background.stone",
                        borderRadius: "16px",
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor:
                            stakePeriod === 6
                              ? "background.green"
                              : "background.light",
                          opacity: 0.9,
                        },
                        "&:active": {
                          cursor: "pointer",
                          backgroundColor: "background.primary",
                        },
                        ...classes.title3,
                      }}
                      onClick={() => {
                        setStakePeriod(6);
                      }}
                    >
                      6 mos - 1.2x
                    </Stack>
                    <Stack
                      sx={{
                        textAlign: "center",
                        color: "white",
                        width: "30%",
                        fontSize: "20px",
                        padding: "18px",
                        backgroundColor:
                          stakePeriod === 12
                            ? "background.green"
                            : "background.stone",
                        borderRadius: "16px",
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor:
                            stakePeriod === 12
                              ? "background.green"
                              : "background.light",
                          opacity: 0.9,
                        },
                        "&:active": {
                          cursor: "pointer",
                          backgroundColor: "background.primary",
                        },
                        ...classes.title3,
                      }}
                      onClick={() => {
                        setStakePeriod(12);
                      }}
                    >
                      12 mos - 1.5x
                    </Stack>
                  </Stack>
                )}

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
                  }}
                >
                  {stakeTab === "stake" ? "Stake" : "Withdraw"} {stakeAmount}{" "}
                  PSTX ({(stakeAmount / 10).toFixed(3)}
                  USD)
                </Stack>
              </Box>
            </Box>
          </Container>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"center"}>
          <Container
            marginTop="0"
            sxHeader={{
              backgroundColor: "background.light",
            }}
            sxBody={{
              background: "linear-gradient(180deg, #1F1F1F 0%, #000 100%)",
            }}
            header={
              <Stack gap={2} padding={2}>
                <Stack paddingX={1} sx={{ color: "white", fontSize: "18pxx" }}>
                  Total PSTX Staked
                </Stack>
                <Stack
                  sx={{
                    backgroundColor: "background.green",
                    borderRadius: "16px",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "white",
                  }}
                  padding={2}
                >
                  50,000.00 PSTX
                </Stack>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                  <Stack
                    sx={{
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      color: "white",
                      backgroundColor: "background.light",
                      fontSize: "18px",
                      borderRadius: "20px",
                    }}
                    padding={2}
                    px={4}
                    gap={1}
                  >
                    <Box sx={classes.title3}>Total PSTX Earned</Box>
                    <Box sx={classes.title4} fontSize={"25px"}>
                      3558.33 PSTX
                    </Box>
                  </Stack>
                  <Stack
                    sx={{
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      color: "white",
                      backgroundColor: "background.light",
                      fontSize: "18px",
                      borderRadius: "20px",
                    }}
                    padding={2}
                    px={4}
                    gap={1}
                  >
                    <Box sx={classes.title3}>Current APY</Box>
                    <Box sx={classes.title4} fontSize={"25px"}>
                      8.0 %
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            }
          >
            <Stack sx={classes.container} gap={1}>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                px={2}
                py={1}
              >
                <Box
                  sx={{
                    fontSize: "18px",
                    fontWeight: 700,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  Sort by &nbsp;
                  <span style={{ textDecoration: "underline" }}>date</span>
                  <Box
                    sx={{
                      paddingLeft: "14px",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="7"
                      viewBox="0 0 14 7"
                      fill="none"
                    >
                      <path d="M1 1L7 6L13 1" stroke="white" />
                    </svg>
                  </Box>
                </Box>
                <Box
                  sx={{
                    fontSize: "18px",
                    fontStyle: "italic",
                    fontWeight: 700,
                  }}
                >
                  1 PSTX = 0.10 USD
                </Box>
              </Stack>
              <Stack
                sx={{
                  backgroundColor: "background.light",
                  borderRadius: "30px",
                }}
                flexDirection={"row"}
                paddingX={3}
                paddingY={2}
                gap={4}
              >
                <Stack gap={1}>
                  <Stack
                    sx={{
                      fontSize: "25px",
                    }}
                  >
                    10000.00 PSTX
                  </Stack>
                  <Box
                    sx={{
                      backgroundColor: "background.green",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 600,
                      paddingX: "53px",
                      paddingY: "16px",
                      borderRadius: "17px",
                      textAlign: "center",
                    }}
                  >
                    Unstake
                  </Box>
                </Stack>

                <Stack width={"50%"} justifyContent={"space-around"}>
                  <Stack flexDirection={"row"}>
                    <Box
                      width={"50%"}
                      sx={{
                        color: "text.secondary",
                        wordWrap: "normal",
                      }}
                    >
                      Stake date:
                    </Box>
                    <Box
                      sx={{
                        color: "text.contrast",
                        wordWrap: "normal",
                      }}
                    >
                      Jul 2, 2023
                    </Box>
                  </Stack>
                  <Stack flexDirection={"row"}>
                    <Box
                      width={"50%"}
                      sx={{
                        color: "text.secondary",
                        wordWrap: "normal",
                      }}
                    >
                      Stake date:
                    </Box>
                    <Box
                      sx={{
                        color: "text.contrast",
                        wordWrap: "normal",
                      }}
                    >
                      Jul 2, 2023
                    </Box>
                  </Stack>
                  <Stack flexDirection={"row"}>
                    <Box
                      width={"50%"}
                      sx={{
                        color: "text.secondary",
                        wordWrap: "normal",
                      }}
                    >
                      Stake date:
                    </Box>
                    <Box
                      sx={{
                        color: "text.contrast",
                        wordWrap: "normal",
                      }}
                    >
                      Jul 2, 2023
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                sx={{
                  backgroundColor: "background.light",
                  borderRadius: "30px",
                }}
                flexDirection={"row"}
                paddingX={3}
                paddingY={2}
                gap={4}
              >
                <Stack gap={1}>
                  <Stack
                    sx={{
                      fontSize: "25px",
                    }}
                  >
                    10000.00 PSTX
                  </Stack>
                  <Box
                    sx={{
                      backgroundColor: "background.green",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 600,
                      paddingX: "53px",
                      paddingY: "16px",
                      borderRadius: "17px",
                      textAlign: "center",
                    }}
                  >
                    Unstake
                  </Box>
                </Stack>

                <Stack width={"50%"} justifyContent={"space-around"}>
                  <Stack flexDirection={"row"}>
                    <Box
                      width={"50%"}
                      sx={{
                        color: "text.secondary",
                        wordWrap: "normal",
                      }}
                    >
                      Stake date:
                    </Box>
                    <Box
                      sx={{
                        color: "text.contrast",
                        wordWrap: "normal",
                      }}
                    >
                      Jul 2, 2023
                    </Box>
                  </Stack>
                  <Stack flexDirection={"row"}>
                    <Box
                      width={"50%"}
                      sx={{
                        color: "text.secondary",
                        wordWrap: "normal",
                      }}
                    >
                      Stake date:
                    </Box>
                    <Box
                      sx={{
                        color: "text.contrast",
                        wordWrap: "normal",
                      }}
                    >
                      Jul 2, 2023
                    </Box>
                  </Stack>
                  <Stack flexDirection={"row"}>
                    <Box
                      width={"50%"}
                      sx={{
                        color: "text.secondary",
                        wordWrap: "normal",
                      }}
                    >
                      Stake date:
                    </Box>
                    <Box
                      sx={{
                        color: "text.contrast",
                        wordWrap: "normal",
                      }}
                    >
                      Jul 2, 2023
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Stack>
        <Stack sx={classes.stakeDetail}>
          <Stack
            sx={{
              color: "#FFF",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            STAKE PSTX
          </Stack>
          <Stack
            sx={{
              color: "white",
              fontSize: "20px",
              fontWeight: 400,
            }}
          >
            Staking PSTX earns you between 15-50% APY in PSTX depending on the
            quantity of stakers. Lock it up for longer, earn more. Or, don't
            stake and go explore the Powershift Ecosystem in search of
            discounts. Learn more about PSTX and Staking in our docs.
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Stake;
