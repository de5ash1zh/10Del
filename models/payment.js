const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
  amount: Number,
  method: String,
  status: String,
  transactionID: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  totalPrice: Number,
  address: String,
  status: String,
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
  },
});

module.exports = mongoose.model("payment", paymentSchema);
