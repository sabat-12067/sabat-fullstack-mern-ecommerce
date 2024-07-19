const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../model/productModel");

const UploadProductController = async (req, res) => {
  try {
    const sessionUserId = req.userId;
    if (!(await uploadProductPermission(sessionUserId))) {
      throw new Error("Permission denied..!");
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();
    res.status(200).json({
      data: saveProduct,
      error: false,
      success: true,
      message: "Product uploaded successfully.!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = UploadProductController;
