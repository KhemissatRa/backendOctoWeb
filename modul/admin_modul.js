const mongoose = require('mongoose');
const joi = require('joi');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Validation function
const validateAdmin = (data) => {
  const schema = joi.object({
    email: joi.string().min(3).max(50).required().email(),
    password: joi.string().min(5).max(1024).required(),
  });
  return schema.validate(data);
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = { Admin, validateAdmin };
