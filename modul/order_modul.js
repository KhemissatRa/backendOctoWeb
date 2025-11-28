const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema({
  order: {
    type: Object, // cart items array
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true
  },
  willaya: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  Number: {
    type: String,   // keep as string to allow leading 0
    required: true,
    minlength: 8,
    maxlength: 15
  },
  totalPrice: {
    type: Number,
    required: true
  },
  Done: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
