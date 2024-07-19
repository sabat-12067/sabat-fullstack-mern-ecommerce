const wishListModel = require("../../model/WishList")


const CountAddToWishListProductController = async(req, res) =>{

  try {

    const currentUser = req?.userId

    const wishListProductCount = await wishListModel.countDocuments({
      userId : currentUser
    })



    res.status(200).json({
      data : {
        count : wishListProductCount
      },
      message : "Added to WishList",
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

module.exports = CountAddToWishListProductController