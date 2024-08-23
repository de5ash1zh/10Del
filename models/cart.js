const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Cart schema for Mongoose with validations
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Ensure reference model name matches exactly
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",  // Ensure reference model name matches exactly
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,  // Ensure totalPrice cannot be negative
  },
}, { timestamps: true });  // Add timestamps

// Create the Cart model from the schema
const Cart = mongoose.model("Cart", cartSchema);

// Joi validation function for cart data
function validateCart(cart) {
  const schema = Joi.object({
    user: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // Validates ObjectId format
    products: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).required(), // Validates array of ObjectIds
    totalPrice: Joi.number().min(0).required(), // Ensures totalPrice is a non-negative number
  });

  return schema.validate(cart);
}

module.exports = {
  cartModel:mongoose.model("cart",cartSchema),
  validateCart,
};
