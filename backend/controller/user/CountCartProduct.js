const cartModel = require("../../model/Cart");

const CountCartProductController = async(req, res)=>{


  try {

    const currentUser = req?.userId
    // console.log("User Id:",currentUser)

    const cartdata = await cartModel.find({userId : currentUser}).populate("productId")
    console.log(cartdata)

    res.status(200).json({
      data : cartdata,
      message : "Cart Product List",
      error : false,
      success : true
    })
    
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }

}

module.exports = CountCartProductController