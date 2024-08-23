const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Payment schema for Mongoose with validations
const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // Ensure reference model name matches exactly
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Ensures amount cannot be negative
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    transactionID: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Ensure reference model name matches exactly
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0, // Ensures totalPrice cannot be negative
    },
    address: {
      type: String,
      required: true,
      minlength: 10, // Minimum length for address
      maxlength: 255, // Maximum length for address
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment", // Ensure reference model name matches exactly
    },
  },
  { timestamps: true }
); // Add timestamps

// Create the Payment model from the schema
const Payment = mongoose.model("Payment", paymentSchema);

// Joi validation function for payment data
function validatePayment(payment) {
  const schema = Joi.object({
    order: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(), // Validates ObjectId format
    amount: Joi.number().min(0).required(), // Ensures amount is a non-negative number

    status: Joi.string().required(), // Valid statuses
    transactionID: Joi.string().required(), // Ensures transactionID is a required string
    products: Joi.array()
      .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
      .required(), // Validates array of ObjectIds
    totalPrice: Joi.number().min(0).required(), // Ensures totalPrice is a non-negative number
    address: Joi.string().min(10).max(255).required(), // Ensures address has a min/max length
    payment: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional(), // Validates ObjectId format, optional field
  });

  return schema.validate(payment);
}

module.exports = {
  paymentModel: mongoose.Schema("payment", paymentSchema),
  validatePayment,
};
