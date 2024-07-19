const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    productId: {
      ref:"product",
      required: true,
      type: String,
    },
    quantity: {
      required: true,
      type: Number
    },
    userId: {
      required: true,
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("cart", CartSchema);

module.exports = cartModel;
