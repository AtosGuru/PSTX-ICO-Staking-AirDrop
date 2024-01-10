import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button, Stack } from "@mui/material";
import { btnClasses } from "../class/button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getPstxTokenAmount } from "../actions/auth";
import { api } from "../config/axios";
export default function CheckoutForm({ amount, currency, onReset = () => {} }) {
  const dispatch = useDispatch();
  const { walletAddress, isAuthenticated } = useSelector((state) => state.auth);
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };
  const handleServerResponse = async (response, myToast) => {
    if (response.error) {
      // Show error from server on payment form
    } else if (response.status === "requires_action") {
      // Use Stripe.js to handle the required next action
      const { error, paymentIntent } = await stripe.handleNextAction({
        clientSecret: response.clientSecret,
      });

      if (error) {
        // Show error from Stripe.js in payment form
      } else {
        // Actions handled, show success message
      }
    } else {
      // No actions needed, show success message
      toast.dismiss(myToast);
      dispatch(getPstxTokenAmount(walletAddress));
      toast.success(`Your credit payment confirmed!`, {
        theme: "dark",
      });
      toast.success(`Click here to see the tx`, {
        onClick: () => {
          window.open(
            `https://polygonscan.com/tx/${response.data.hash}`,
            "_blank"
          );
        },
        theme: "dark",
        autoClose: 10000,
      });
      onReset();
    }
  };
  const handleSubmit = async (event) => {
    if (isAuthenticated !== true) {
      return toast.error("You have to connect your wallet!", { theme: "dark" });
    }
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // Create the PaymentMethod using the details collected by the Payment Element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      elements,
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // creating the PaymentMethod. Show the error to your customer (for example, payment details incomplete)
      handleError(error);
      return;
    }

    const myToast = toast.info("Please wait until process is completed!", {
      theme: "dark",
      autoClose: false,
    });
    // Create the PaymentIntent
    try {
      const data = await api.post("/create-confirm-intent", {
        paymentMethodId: paymentMethod.id,
        amount: amount,
        currency: currency,
        address: walletAddress,
      });

      // Handle any next actions or errors. See the Handle any next actions step for implementation.
      handleServerResponse(data, myToast);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Stack mt={1}>
        <Button
          sx={{
            fontFamily: "Livvic",
            textTransform: "none",
            color: "white",
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
          type="submit"
          disabled={!stripe || loading}
        >
          Purchase
        </Button>
      </Stack>

      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}
