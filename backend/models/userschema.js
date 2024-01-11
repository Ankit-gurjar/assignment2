const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email_id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    orders: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        totalPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        totalPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    cart_value: {
      type: Number,
      default: 0,
    },
    oders_inCart: {
      type: Number,
      default: 0,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("Product", userSchema);

module.exports = User;
