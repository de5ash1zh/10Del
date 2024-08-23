const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Delivery schema for Mongoose with validations
const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order", // Ensure reference model name matches exactly
    required: true,
  },
  deliveryBoy: {
    type: String,
    required: true,
    minlength: 3, // Minimum length for deliveryBoy
    maxlength: 50, // Maximum length for deliveryBoy
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "shipped", "delivered", "cancelled"], // Example statuses; modify as needed
    default: "pending",
  },
  trackingURL: {
    type: String,
    required: true,
  },
  estimatedDeliveryTime: {
    type: Number,
    required: true,
    min: 0, // Ensures estimatedDeliveryTime cannot be negative
  },
}, { timestamps: true }); // Add timestamps

// Create the Delivery model from the schema
const Delivery = mongoose.model("Delivery", deliverySchema);

// Joi validation function for delivery data
function validateDelivery(delivery) {
  const schema = Joi.object({
    order: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Validates ObjectId format
    deliveryBoy: Joi.string().min(3).max(50).required(), // Ensures deliveryBoy is a string with min/max length and required
    status: Joi.string().valid("pending", "shipped", "delivered", "cancelled").required(), // Valid statuses
    trackingURL: Joi.string().uri(),
    estimatedDeliveryTime: Joi.number().min(0).required(), // Ensures estimatedDeliveryTime is a non-negative number
  });

  return schema.validate(delivery);
}

module.exports = {
  deliveryModel:mongoose.model("delivery",deliverySchema),
  validateDelivery,
};
