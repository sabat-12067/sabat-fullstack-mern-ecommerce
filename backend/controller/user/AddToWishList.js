const wishListModel = require("../../model/WishList");

const wishListCOntroller = async(req, res)=>{

  try {

    const { productId } = req?.body;
    const currentUser = req?.userId;

    // console.log("productId",productId)
    if(!currentUser){
      throw new Error("Please Login First")
    }
    // Check if product is already in the cart
    const isProdAvailable = await wishListModel.findOne({ productId, userId: currentUser });
    if (isProdAvailable) {
      throw new Error("Product already exists in your Wishlist")
    }

    // Create new cart entry
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser
    };

    const newProductToCart = new wishListModel(payload);
    const saveProduct = await newProductToCart.save();

    res.status(200).json({
      data : saveProduct,
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

module.exports = wishListCOntroller