const cartModel = require("../../model/Cart");

const UpdatePlusCartQuantityController = async(req, res) =>{

  try {

    const currentUser = req?.userId
    const productId = req.body.productId //Id of the cart table 
    const quantity = req.body.quantity

    // console.log("ProductId : ", productId)
    // console.log("Quantity : ", quantity)

    const updateProductQuantity = await cartModel.updateOne({_id:productId}, {
      ...(quantity && {quantity : quantity})
    })

    res.status(200).json({
      data:updateProductQuantity,
      message: "Qunatity Updated",
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

module.exports = UpdatePlusCartQuantityController