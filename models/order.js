const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Order schema for Mongoose with validations
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure reference model name matches exactly
    required: true,
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
  status: {
    type: String,
    required: true,
    enum: ["pending", "processed", "shipped", "delivered", "cancelled"], // Example statuses; modify as needed
    default: "pending",
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment", // Ensure reference model name matches exactly
    required: true,
  },
  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Delivery", // Ensure reference model name matches exactly
    required: true,
  },
}, { timestamps: true }); // Add timestamps

// Create the Order model from the schema
const Order = mongoose.model("Order", orderSchema);

// Joi validation function for order data
function validateOrder(order) {
  const schema = Joi.object({
    user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Validates ObjectId format
    products: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).required(), // Validates array of ObjectIds
    totalPrice: Joi.number().min(0).required(), // Ensures totalPrice is a non-negative number
    address: Joi.string().min(10).max(255).required(), // Ensures address has a min/max length
    status: Joi.string().valid("pending", "processed", "shipped", "delivered", "cancelled").required(), // Valid statuses
    payment: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Validates ObjectId format
    delivery: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Validates ObjectId format
  });

  return schema.validate(order);
}

module.exports = {
  orderModel:mongoose.Schema("order",orderSchema),
  validateOrder,
};
