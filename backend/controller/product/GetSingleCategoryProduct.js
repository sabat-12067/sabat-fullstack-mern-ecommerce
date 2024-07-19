const productModel = require("../../model/productModel")

const GetCategoryProductController = async(req, res) =>{

  try {
    // res.send("Get Category By Product")
    const categoryProduct = await productModel.distinct("category")
    // res.send(categoryProduct)
    //Array to store one product from each category
    const productCategory = []

    for(const category of categoryProduct){
      const product = await productModel.findOne({ category: category })
      if(product){
        productCategory.push(product)
      }
    }

    res.status(200).json({
      data : productCategory,
      message : "Product Category",
      error : false,
      success: true,
    })

  } catch (error) {
    res.status(400).json({
      message : error.message || error,
      error : true,
      success : false
     })
  }

}

module.exports = GetCategoryProductController