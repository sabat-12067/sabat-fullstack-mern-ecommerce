const cartModel = require("../../model/Cart");

const CartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req?.userId;

    // Check if product is already in the cart
    const isProdAvailable = await cartModel.findOne({ productId, userId: currentUser });
    if (isProdAvailable) {
      throw new Error("Product already exists in your cart")
    }

    // Create new cart entry
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser
    };

    const newProductToCart = new cartModel(payload);
    const saveProduct = await newProductToCart.save();

    res.status(201).json({
      data: saveProduct,
      message: "Product added successfully.",
      error: false,
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = CartController;
