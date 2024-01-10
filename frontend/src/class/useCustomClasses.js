import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const defaultClasses = {
  title1: {},
  title2: {},
  title3: {},
  title4: {},
  textGreen: {},
  button: {},
  container: {},
  redeemBox: {},
  redeemInput: {},
  subContainer: {},
  amountInput: {},
  paymentMethodSelect: {},
  paymentMethod: {},
  endComponent: {},
  stakeDetail: {},
};
const useCustomClass = () => {
  const theme = useTheme();
  const [classes, setClasses] = useState(defaultClasses);
  useEffect(() => {
    setClasses({
      stakeDetail: {
        marginTop: 5,
        paddingLeft: "155px",
        maxWidth: "700px",
        gap: 5,
        [theme.breakpoints.down("md")]: {
          paddingLeft: "100px",
          maxWidth: "480px",
        },
        [theme.breakpoints.down("sm")]: {
          paddingLeft: "100px",
          maxWidth: "350px",
        },
      },
      title4: {
        [theme.breakpoints.down("md")]: {
          fontSize: "20px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "18px",
        },
      },
      title3: {
        [theme.breakpoints.down("md")]: {
          fontSize: "16px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "14px",
        },
      },
      endComponent: {
        color: "white",
        borderRadius: "30px",
        fontSize: "35px",
        fontWeight: 600,
        paddingLeft: "20px",
        [theme.breakpoints.down("md")]: {
          fontSize: "30px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "26px",
        },
      },
      paymentMethod: {
        [theme.breakpoints.down("md")]: {
          fontSize: "30px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "26px",
        },
      },
      paymentMethodSelect: {
        backgroundColor: "background.secondary",
        fontSize: "18px",
        [theme.breakpoints.down("md")]: {
          fontSize: "16px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "14px",
        },
      },
      amountInput: {
        backgroundColor: "background.light",
        color: "white",
        borderRadius: "30px",
        fontSize: "35px",
        fontWeight: 500,
        paddingRight: "20px",
        paddingY: 2,
        [theme.breakpoints.down("md")]: {
          fontSize: "30px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "26px",
        },
      },
      redeemInput: {
        backgroundColor: "background.secondary",
        color: "white",
        borderRadius: "30px",
        fontSize: "24px",
        fontWeight: 500,
        textAlign: "center",
      },

      subContainer: {
        px: 2,
        backgroundColor: "background.light",
        borderRadius: "30px",
        gap: 3,
        [theme.breakpoints.down("md")]: {
          gap: 2,
        },
      },
      redeemBox: {
        borderRadius: "16px",
        backgroundColor: "background.green",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      },
      title1: {
        color: "white",
        fontSize: "18px",
        fontWeight: 500,
        // [theme.breakpoints.down("md")]: {
        //   fontSize: "16px",
        // },
        // [theme.breakpoints.down("sm")]: {
        //   fontSize: "14px",
        // },
      },
      title2: {
        fontSize: "16px",
        fontWeight: 500,
        color: "white",
        [theme.breakpoints.down("md")]: {
          fontSize: "14px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "12px",
        },
      },
      textGreen: {
        color: "#10B1A7",
        fontSize: "19px",
        fontWeight: 500,
        [theme.breakpoints.down("md")]: {
          fontSize: "17px",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "15px",
        },
      },
      container: {
        color: "white",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "555px",
        [theme.breakpoints.down("md")]: {
          width: "480px",
        },
        [theme.breakpoints.down("sm")]: {
          width: "350px",
        },
      },
    });
  }, []);
  return classes;
};

export default useCustomClass;
