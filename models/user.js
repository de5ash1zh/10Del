const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Address schema for Mongoose
const AddressSchema = mongoose.Schema({
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  zip: {
    type: Number,
    required: true,
    min: 100000, // Assuming zip should have at least 6 digits
    max: 9999999999, // Assuming max zip code digits as 10
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
});

// Define the User schema for Mongoose
const userSchema = mongoose.Schema(
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
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Updated regex
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
    phone: {
      type: String, // Changed to String to accommodate regex and common phone formats
      required: true,
      match: /^\+?(\d{1,3})?[-. (]*\d{3}[-. )]*\d{3}[-. ]*\d{4}$/, // Regex for phone validation
    },
    addresses: {
      type: [AddressSchema],
    },
  },
  { timestamps: true }
);

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Joi validation function for user data
function validateUser(user) {
  const addressSchema = Joi.object({
    state: Joi.string().min(2).max(50).required(),
    zip: Joi.number().min(100000).max(9999999999).required(), // Corrected zip validation
    city: Joi.string().min(2).max(50).required(),
    address: Joi.string().min(5).max(100).required(),
  });

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(255).required(),
    phone: Joi.string()
      .pattern(/^\+?(\d{1,3})?[-. (]*\d{3}[-. )]*\d{3}[-. ]*\d{4}$/)
      .required(), // Phone regex in Joi
    addresses: Joi.array().items(addressSchema).min(1).required(),
  });

  return schema.validate(user);
}

module.exports = {
  userModel: mongoose.model("user",userSchema), // Exporting the User model created above
  validateUser,
};
