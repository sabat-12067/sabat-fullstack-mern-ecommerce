const wishListModel = require("../../model/WishList")

const GetWishListController = async(req, res) =>{

  try {

    const currentUser = req?.userId
    const wishListdata = await wishListModel.find({userId : currentUser}).populate("productId").sort({createdAt : -1})
    // console.log(cartdata)

    res.status(200).json({
      data : wishListdata,
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

module.exports = GetWishListController