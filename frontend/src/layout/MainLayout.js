import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Popover,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { navClasses } from "../class/nav";
import { Link, Outlet, useLocation } from "react-router-dom";
import { typoClasses } from "../class/Typo";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useRef, useState } from "react";
import { btnClasses } from "../class/button";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWallet,
  disconnectWallet,
  getEthAmount,
  getPstxTokenAmount,
  showWalletUI,
} from "../actions/auth";
import { getAddress16 } from "../utils/address";
import { logout } from "../slices/authSlice";
import powershitfLogo from "../assets/POWERSHIFT.IO.svg";
import moreDetail from "../assets/detail.svg";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import youtube from "../assets/youtube.png";
import unsecuredCopyToClipboard from "../utils/clipboard";
const ethers = require("ethers");
const MainLayout = ({ children }) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const [popOpen, setPopOpen] = useState(false);
  const anchor = useRef(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [side, setSide] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(getPstxTokenAmount(auth.walletAddress));
      dispatch(getEthAmount(auth.walletAddress));
    }
  }, [auth.isAuthenticated, auth.walletAddress, dispatch]);
  return (
    <>
      <Stack
        marginTop={"42px"}
        alignItems={"center"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        paddingX={"60px"}
        paddingBottom={5}
        sx={{
          ...navClasses.navbar,
          [theme.breakpoints.down(480)]: {
            paddingX: "30px",
          },
        }}
      >
        <Stack alignItems={"center"} flexDirection={"row"}>
          <img src={powershitfLogo} alt="logo" />
        </Stack>
        <Stack
          sx={{
            backgroundColor: "background.secondary",
            borderRadius: 3,
            padding: 1,
            [theme.breakpoints.down(990)]: {
              display: "none",
            },
          }}
          flexDirection={"row"}
        >
          <Box>
            <Link to="/airdrop" style={{ padding: 0 }}>
              <Box
                sx={{
                  ...navClasses.navLink,
                  backgroundColor:
                    pathname === "/airdrop" ? "background.light" : "none",
                }}
              >
                Airdrop
              </Box>
            </Link>
          </Box>
          <Box>
            <Link to="/purchase" style={{ padding: 0 }}>
              <Box
                sx={{
                  ...navClasses.navLink,
                  backgroundColor:
                    pathname === "/purchase" ? "background.light" : "none",
                }}
              >
                Purchase
              </Box>
            </Link>
          </Box>
          <Box>
            <Link to="/stake" style={{ padding: 0 }}>
              <Box
                sx={{
                  ...navClasses.navLink,
                  backgroundColor:
                    pathname === "/stake" ? "background.light" : "none",
                }}
              >
                Stake
              </Box>
            </Link>
          </Box>
        </Stack>

        <Stack flexDirection={"row"} alignItems={"space-between"} gap={6}>
          {auth.isAuthenticated === true ? (
            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
              <IconButton
                onClick={() => {
                  dispatch(showWalletUI());
                }}
              >
                <AccountCircleIcon
                  fontSize="large"
                  style={{ color: "white" }}
                />
              </IconButton>
              <Stack
                sx={{
                  color: "white",
                  fontFamily: "Roboto",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                flexDirection={"row"}
                alignItems={"center"}
                gap={0.5}
                onClick={() => {
                  unsecuredCopyToClipboard(auth.walletAddress);
                }}
              >
                {getAddress16(auth.walletAddress)}
              </Stack>
              <IconButton
                onClick={() => {
                  setPopOpen(true);
                }}
              >
                <ArrowDropDownIcon
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  style={{ color: "white" }}
                  ref={anchor}
                />
              </IconButton>
              <Popover
                open={popOpen}
                anchorEl={anchor.current}
                onClose={() => {
                  setPopOpen(false);
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Stack paddingX={2} paddingTop={2} gap={1} width={"120px"}>
                  <Stack
                    sx={{ color: "black", fontFamily: "Roboto" }}
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={0.5}
                  >
                    {`${parseFloat(
                      ethers.utils.formatEther(auth.ethAmount)
                    ).toFixed(4)} MATIC`}
                  </Stack>
                  <Divider />
                  <Stack
                    sx={{ color: "black", fontFamily: "Roboto" }}
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={0.5}
                  >
                    {`${parseFloat(
                      ethers.utils.formatUnits(auth.pstxAmount, 3)
                    ).toFixed(3)} PSTX`}
                  </Stack>
                  <Divider />
                  <Button
                    onClick={() => {
                      dispatch(disconnectWallet());
                      setPopOpen(false);
                    }}
                  >
                    log out
                  </Button>
                </Stack>
              </Popover>
            </Stack>
          ) : (
            <Button
              sx={{
                ...btnClasses.buttonPrimary,
                backgroundColor: "#287693",
                fontSize: "18px",
                [theme.breakpoints.down(640)]: {
                  display: "none",
                },
              }}
              onClick={() => {
                dispatch(connectWallet());
              }}
            >
              Connect Wallet
            </Button>
          )}
          <Box
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              setSide(true);
            }}
          >
            <img src={moreDetail} alt="more detail" />
          </Box>
          <Drawer
            anchor="right"
            open={side}
            onClose={() => {
              setSide(false);
            }}
          >
            <Stack
              sx={{
                padding: 2,
                pt: 5,
                backgroundColor: "background.secondary",
                height: "100%",
              }}
              gap={2}
            >
              <Box>
                <Link to="/airdrop" style={{ padding: 0 }}>
                  <Box
                    sx={{
                      ...navClasses.navLinkSide,
                      backgroundColor:
                        pathname === "/airdrop" ? "background.light" : "none",
                    }}
                  >
                    Airdrop
                  </Box>
                </Link>
              </Box>
              <Box>
                <Link to="/purchase" style={{ padding: 0 }}>
                  <Box
                    sx={{
                      ...navClasses.navLinkSide,
                      backgroundColor:
                        pathname === "/purchase" ? "background.light" : "none",
                    }}
                  >
                    Purchase
                  </Box>
                </Link>
              </Box>
              <Box>
                <Link to="/stake" style={{ padding: 0 }}>
                  <Box
                    sx={{
                      ...navClasses.navLinkSide,
                      backgroundColor:
                        pathname === "/stake" ? "background.light" : "none",
                    }}
                  >
                    Stake
                  </Box>
                </Link>
              </Box>
            </Stack>
          </Drawer>
        </Stack>
      </Stack>
      <Stack minHeight={"60vh"}>
        <Outlet>{children}</Outlet>
      </Stack>
      <Stack
        width={"100%"}
        sx={{ color: "white" }}
        pt={2}
        pb={5}
        gap={3}
        mt={20}
      >
        <Grid
          container
          rowSpacing={5}
          justifyContent={"center"}
          margin={"auto"}
        >
          <Grid item xs={12} sm={6} md={6} lg={3} gap={2} px={10}>
            <Stack justifyContent={"flex-start"} gap={2}>
              <Box
                sx={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Company
              </Box>
              <Stack
                sx={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 400,
                }}
                gap={2}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "text.accent",
                    },
                  }}
                  onClick={() => {
                    window.open(
                      "https://app.glassfrog.com/organizations/1732/orgnav/roles/2517352/overview",
                      "_blank"
                    );
                  }}
                >
                  DAO Structure
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "text.accent",
                    },
                  }}
                  onClick={() => {
                    window.open(
                      "https://app.glassfrog.com/organizations/1732/orgnav/roles/2517352/overview",
                      "_blank"
                    );
                  }}
                >
                  Governance
                </Box>
                <Box>Terms & Conditions</Box>
                <Box>Privacy Policy</Box>
                <Box>KYC/AML</Box>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} gap={2} px={10}>
            <Stack justifyContent={"flex-start"} gap={2}>
              <Box
                sx={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                App
              </Box>

              <Stack
                sx={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 400,
                }}
                gap={2}
              >
                <Box>Purchase</Box>
                <Box>Stake</Box>
                <Box>Marketplace</Box>
                <Box>Community</Box>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} gap={2} px={10}>
            <Stack justifyContent={"flex-start"} gap={2}>
              <Box
                sx={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Understand
              </Box>
              <Stack
                sx={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 400,
                }}
                gap={2}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "text.accent",
                    },
                  }}
                  onClick={() => {
                    window.open(
                      "https://encode-org.gitbook.io/the-powershift-ecosystem/powershift-tm-dao-whitepaper",
                      "_blank"
                    );
                  }}
                >
                  Whitepaper
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "text.accent",
                    },
                  }}
                  onClick={() => {
                    window.open(
                      "https://encode-org.gitbook.io/the-powershift-ecosystem/",
                      "_blank"
                    );
                  }}
                >
                  Docs(gitbook)
                </Box>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3} gap={2} px={10}>
            <Stack justifyContent={"flex-start"} gap={2}>
              <Box
                sx={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Partners
              </Box>
              <Stack
                sx={{
                  color: "white",
                  fontSize: "18px",
                  fontWeight: 400,
                }}
                gap={2}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "text.accent",
                    },
                  }}
                  onClick={() => {
                    window.open("https://www.just.work/", "_blank");
                  }}
                >
                  PowerShift People
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "text.accent",
                    },
                  }}
                  onClick={() => {
                    window.open("https://powershift.properties/", "_blank");
                  }}
                >
                  PowerShift Properties
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "text.accent",
                    },
                  }}
                  onClick={() => {
                    window.open("https://entheowork.org/", "_blank");
                  }}
                >
                  Entheo Work
                </Box>
                <Box>Etc.</Box>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3} gap={2} px={10}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
              <img src={facebook} alt="facebook" />
              <img src={twitter} alt="twitter" />
              <img src={instagram} alt="instagram" />
              <img src={youtube} alt="youtube" />
            </Stack>
          </Grid>
        </Grid>
        <Stack alignItems={"center"}>
          <img src={powershitfLogo} alt="logo" />
        </Stack>
      </Stack>
    </>
  );
};
export default MainLayout;
