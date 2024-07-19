const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    productId: {
      ref:"product",
      required: true,
      type: String,
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

const wishListModel = mongoose.model("wishList", CartSchema);

module.exports = wishListModel;
