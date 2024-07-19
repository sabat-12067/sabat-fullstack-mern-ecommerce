const productModel = require("../../model/productModel")

const GetProductController = async(req, res) => {
  try {

    const getProduct = await productModel.find().sort({createdAt : -1})
    res.status(200).json({
      data : getProduct,
      error : false,
      success : true,
      message : "All Product Details"
    })
    
  } catch (error) {
    res.status(400).json({
      message : error.message || error,
      error : true,
      success : false
     })
  }
} 

module.exports = GetProductController