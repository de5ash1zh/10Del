const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Category schema for Mongoose with validations
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,  // Minimum length for name
    maxlength: 50, // Maximum length for name
    unique:true,
  },
});

// Create the Category model from the schema
const Category = mongoose.model("Category", categorySchema);

// Joi validation function for category data
function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(), // Ensures name is a string with min/max length and required
  });

  return schema.validate(category);
}

module.exports = {
  categoryModel:mongoose.model("category", categorySchema),
  validateCategory,
};
