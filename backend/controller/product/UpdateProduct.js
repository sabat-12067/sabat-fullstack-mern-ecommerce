const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../model/productModel");

const UpdateProductController = async(req, res) => {
  try {
    const sessionUserId = req.userId;
    if (!(await uploadProductPermission(sessionUserId))) {
      throw new Error("Permission denied..!");
    }
    // console.log(sessionUserId)

    const {_id, ...resBody} = req.body
    // console.log("product id", _id)
    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody,{ new: true })

    res.status(200).json({
      data : updateProduct,
      message : "Product updated successfully..!",
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

module.exports = UpdateProductController