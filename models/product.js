const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Product schema for Mongoose with validations
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensures price cannot be negative
    },
    category: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    stock: {
      type: Boolean,
      required: true,
      default: true,
    },
    description: {
      type: String,
      maxlength: 1000, // Optional field, max length 1000
    },
    image: {
      type: String,
    },
  },
  { timestamps: true } // Add timestamps
);

// Create the Product model from the schema
const Product = mongoose.model("Product", productSchema);

// Joi validation function for product data
function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(), // Ensures name has a min/max length
    price: Joi.number().min(0).required(), // Ensures price is a non-negative number
    category: Joi.string().min(3).max(50).required(), // Ensures category has a min/max length
    stock: Joi.boolean().required(), // Ensures stock is a boolean
    description: Joi.string().optional(), // Ensures description has a max length, optional field
    image: Joi.string().optional(), // Ensures image URL has a max length, optional field
  });

  return schema.validate(product);
}

module.exports = {
  productModel: mongoose.Schema("product", productSchema),
  validateProduct,
};
