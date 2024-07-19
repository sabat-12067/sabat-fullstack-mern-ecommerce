const productModel = require("../../model/productModel");

const GetSingleProductController = async(req, res)=>{

  try {

    const { id } = req.params;

    const product = await productModel.findById(id)
    // console.log(product)
    res.status(200).json({
      product : product,
      message : "Single Product Details",
      error : false,
      success : true
     })
    
  } catch (error) {
    res.status(400).json({
      message : error.message || error,
      error : true,
      success : false
     })
  }

}

module.exports = GetSingleProductController