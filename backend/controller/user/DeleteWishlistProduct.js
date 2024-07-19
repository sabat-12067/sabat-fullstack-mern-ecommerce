const cartModel = require("../../model/Cart");
const wishListModel = require("../../model/WishList");

const DeleteWishlistProductController = async(req, res) =>{
  try {

    const currentUser = req?.userId
    const wishlistId = req?.body?.wishlistId

    console.log(wishlistId)

    const deletedProduct = await wishListModel.findByIdAndDelete({_id:wishlistId})

    // console.log(deletedProduct)
    res.status(200).json({
      data : deletedProduct,
      message: "Removed from wishlist",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = DeleteWishlistProductController