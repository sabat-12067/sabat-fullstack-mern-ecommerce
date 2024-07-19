const userModel = require("../../model/userModel")

const userDetailController = async (req, res) =>{
  try {
    //  console.log("User Id:", req.userId)
    const user = await userModel.findById(req.userId)
    res.status(200).json({
      data : user,
      error : false,
      success : true,
      message : "User Details"
    })
    // console.log(user)
  } catch (error) {
    res.status(400).json({
      message : error.message || error,
      error : true,
      success : false
     })
  }
}

module.exports = userDetailController