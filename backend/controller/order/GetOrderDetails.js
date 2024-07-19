const orderModel = require("../../model/OrderProductModel");

const GetOderDetails = async(req, res)=>{
  try {

    const userId = req?.userId
    // console.log("UserId : ", userId)
    const orderData = await orderModel.find({userId : userId}).sort({createdAt : -1})

    // console.log("Ordered Data : ",orderData)

    res.status(200).json({
      data : orderData,
      message: "Ordered Product Details",
      error: false,
      success: true,
    });
    
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = GetOderDetails