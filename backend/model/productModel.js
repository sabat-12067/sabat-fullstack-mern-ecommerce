const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName: {
    required : true,
    type : String
  },
  brandName: {
    required : true,
    type : String
  },
  category : {
    required : true,
    type : String
  },
  productImage :{
    required : true,
    type : []
  },
  productDesc :{
    required : true,
    type : String
  },
  price:{
    required : true,
    type : Number
  },
  sellingPrice :{
    required : true,
    type : Number
  }

},{
  timestamps : true
})

const productModel = mongoose.model('product', productSchema)

module.exports = productModel