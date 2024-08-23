const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Admin schema for Mongoose with validations
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Improved email regex
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "superadmin"], // Example roles; modify as needed
      default: "admin",
    },
  },
  { timestamps: true } // Correct placement of timestamps
);

// Create the Admin model from the schema
const Admin = mongoose.model("Admin", adminSchema);

// Joi validation function for admin data
function validateAdmin(admin) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) // Improved email regex
      .required(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().valid("admin", "superadmin").required(), // Valid roles; consistency maintained
  });

  return schema.validate(admin);
}

module.exports = {
  adminModel:mongoose.model("admin",adminSchema),
  validateAdmin,
};
