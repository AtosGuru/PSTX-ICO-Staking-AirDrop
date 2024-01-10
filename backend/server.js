require("dotenv").config();
const express = require("express");
const fs = require("fs");
const { ethers } = require("ethers");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SK);
const connectDB = require("./config/db");
const provider = new ethers.JsonRpcProvider(process.env.RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const app = express();
connectDB();
app.use(cors());
const PSTX_ABI = require("./ABI/PSTX.json");
const AIRDROP_ABI = require("./ABI/AIRDROP.json");
const contract_pstx = new ethers.Contract(
  process.env.PSTX_ADDRESS,
  PSTX_ABI,
  provider
);

const contract_airdrop = new ethers.Contract(
  process.env.AIRDROP_ADDRESS,
  AIRDROP_ABI,
  provider
);

const Redeem = require("./model/redeem");
const Purchase = require("./model/stripePurchase");
app.use(express.json());
app.post("/create-confirm-intent", async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.create({
      confirm: true,
      amount: req.body.amount,
      currency: req.body.currency,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: { enabled: true },
      payment_method: req.body.paymentMethodId, // the PaymentMethod ID sent by your client
      return_url: "https://example.com/order/123/complete",
      use_stripe_sdk: true,
      mandate_data: {
        customer_acceptance: {
          type: "online",
          online: {
            ip_address: req.ip,
            user_agent: req.get("user-agent"),
          },
        },
      },
    });
    console.log(intent.status);
    if (intent.status === "succeeded") {
      const tx = await contract_pstx.mint.populateTransaction(
        req.body.address,
        ~~req.body.amount * 100
      );
      const rawTx = await wallet.sendTransaction(tx);
      await rawTx.wait();
      const txId = await rawTx.getTransaction();

      const newPurhcase = new Purchase({
        paymentId: req.body.paymentMethodId,
        amount: req.body.amount,
        currency: req.body.currency,
        address: req.body.address,
        date: Date.now(),
      });
      await newPurhcase.save();
      return res.json({
        client_secret: intent.client_secret,
        status: intent.status,
        hash: rawTx.hash,
      });
    } else {
      return res.json({
        client_secret: intent.client_secret,
        status: intent.status,
      });
    }
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

app.get("/get_airdrop_matic", async (req, res) => {
  const address = req.query?.address;
  const redeem_code = req.query?.redeem;

  const redeem = await Redeem.findOne({
    code: redeem_code,
  });
  if (redeem === null || redeem === undefined) {
    return res.status(500).send("Redeem code is invalid");
  } else if (redeem && redeem.status === true) {
    return res.status(500).send("Redeem code is already used");
  }
  //remove from redeem code
  redeem.status = true;
  redeem.address = address;
  await redeem.save();
  try {
    const isClaimed = await contract_airdrop.isClaimed(address);
    if (isClaimed) {
      res.status(500).send("You already claimed");
    } else {
      try {
        const tx = {
          to: address,
          value: ethers.parseEther("0.01"),
          gasLimit: 21000, // Set an appropriate gas limit for your transaction
          // gasPrice: 30000000000, // Set an appropriate gas price
        };
        const rawTx = await wallet.sendTransaction(tx);
        await rawTx.wait();
        const tx2 = await contract_airdrop.airdrop.populateTransaction(address);
        const rawTx2 = await wallet.sendTransaction(tx2);
        await rawTx2.wait();

        res.json({
          message: "successs",
          hashPstx: rawTx2.hash,
          hashMatic: rawTx.hash,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("Error occured while executing tx");
      }
    }
  } catch (err) {
    res.json({ error: err });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
