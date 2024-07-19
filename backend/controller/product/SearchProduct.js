const productModel = require("../../model/productModel")

const SearchProductController = async(req, res) =>{

  try {
    const query = req.query.q

    // console.log(query)

    const regex = new RegExp(query,"ig")

    const searchProd = await productModel.find({
      "$or" : [
        {
          productName : regex
        },
        {
          brandName : regex
        },
        {
          category : regex
        }
      ]
    })

    res.status(200).json({
      data:searchProd,
      message : "Search Product data",
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

module.exports = SearchProductController
