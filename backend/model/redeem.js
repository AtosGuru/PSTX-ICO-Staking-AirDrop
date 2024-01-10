const mongoose = require("mongoose");
const Redeem = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("redeem", Redeem);
