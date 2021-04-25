const mongoose = require("mongoose");
const oderSchema = new mongoose.Schema({
  costumer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      Total: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    updateTime: {
      type: String,
    },
    email_address: {
      type: String,
    },
  },

  isPaid: {
    type: Boolean,
    default: false,
    required: true,
  },
  paidAt: { type: Date },
});

module.exports = mongoose.model("Order", oderSchema);