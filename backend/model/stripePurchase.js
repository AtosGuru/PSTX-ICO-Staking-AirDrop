const mongoose = require("mongoose");
const Purchase = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
  },
  currency: {
    type: String,
  },
  address: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("purchase", Purchase);
