const mongoose = require("mongoose");
const OrderProductSchema = new mongoose.Schema({
  productDetails: {
    type: Array,
    default: [],
  },
  email : {
    type : String,
    default : ""
  },
  userId : {
    type : String,
    default : ""
  },
  paymentDetails : {
    paymentId : {
      type : String,
      default : ""
    },
    payment_method_type : [],
    payment_status : {
      type : String,
      default : ""
    }
  },
  shipping_options : [],
  total_amount : {
    type : String,
    default : ""
  },
},{
  timestamps : true
});

const orderModel = mongoose.model("order", OrderProductSchema);

module.exports = orderModel;
