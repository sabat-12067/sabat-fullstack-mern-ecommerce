const cartModel = require("../../model/Cart");

const DeleteCartProductController = async(req, res) =>{
  try {

    const currentUser = req?.userId
    const cartProductId = req?.body?.cartProductId

    const deletedProduct = await cartModel.findByIdAndDelete({_id:cartProductId})

    console.log(deletedProduct)
    res.status(200).json({
      data : deletedProduct,
      message: "Product deleted from the cart",
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

module.exports = DeleteCartProductController