import { Box, Button, Stack } from "@mui/material";
import backLogo from "../assets/backLogo.png";
import { btnClasses } from "../class/button";
const HomePage = () => {
  return (
    <>
      <Stack
        flexDirection={"row"}
        paddingTop={10}
        justifyContent={"center"}
        gap={20}
      >
        <Stack justifyContent={"center"} gap={3}>
          <Box
            sx={{
              color: "white",
              fontSize: "48px",
            }}
          >
            Start and Build your Crypto DAO project
          </Box>
          <Box
            sx={{
              color: "white",
              fontSize: "20px",
              lineHeight: "32px",
              fontWeight: "300",
            }}
            maxWidth={"500px"}
          >
            Only at CryptoCap, you can build a good portfolio and learn best
            practices about cryptocurrency.
          </Box>
          <Box>
            <Button sx={btnClasses.buttonPrimary}> Get Started</Button>
          </Box>
        </Stack>
        <Stack padding={5}>
          <img src={backLogo} alt="backlogo" />
        </Stack>
      </Stack>
    </>
  );
};

export default HomePage;
