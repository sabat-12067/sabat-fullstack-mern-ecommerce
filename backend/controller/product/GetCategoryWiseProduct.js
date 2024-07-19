const productModel = require("../../model/productModel")


const getCategoryWiseProductController = async(req, res) =>{
  try {
    const category = req.params.category;
    const getProduct = await productModel.find({category})
    // console.log(getProduct)
    res.status(200).json({
      product : getProduct,
      message : "Product Category Wise",
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

module.exports = getCategoryWiseProductController