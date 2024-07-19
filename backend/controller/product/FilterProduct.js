const productModel = require("../../model/productModel")

const FilterProductController = async(req, res) =>{
  try {

    const categoryList = req?.body?.category || []

    const filterProduct = await productModel.find({
      category : {
        "$in" : categoryList
      }
      
  })

    res.status(200).json({
      data: filterProduct,
      message : "Filtered Product Data",
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

module.exports = FilterProductController