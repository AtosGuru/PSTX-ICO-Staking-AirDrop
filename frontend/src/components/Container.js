import { Box, Stack } from "@mui/material";

const Container = ({
  children,
  sxHeader = {},
  sxBody = {},
  header = null,
  marginTop = "15px",
}) => {
  return (
    <Box
      sx={{
        borderRadius: "30px",
        backgroundColor: "background.green",
        ...sxHeader,
      }}
    >
      {header}
      <Stack
        sx={{
          backgroundColor: "background.secondary",
          marginTop: marginTop,
          borderRadius: "25px",
          padding: "8px",
          paddingTop: "20px",
          ...sxBody,
        }}
        flexDirection={"row"}
        justifyContent={"center"}
      >
        {children}
      </Stack>
    </Box>
  );
};

export default Container;
