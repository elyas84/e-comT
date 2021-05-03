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
      productImg: {
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
    email: {
      type: String,
    },
    name: {
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
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },

  isPaid: {
    type: Boolean,
    default: false,
    required: true,
  },
  isDelivered: {
    type: Boolean,
    default: false,
    required: true,
  },
  paidAt: { type: Date },
  DeliverdAt: { type: Date },
});

module.exports = mongoose.model("Order", oderSchema);