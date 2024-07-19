const userModel = require("../../model/userModel")

const allUsers = async(req, res) =>{
  try {
    // console.log("All users: ", req.userId)
    const user = await userModel.find()
    res.status(200).json({
      data : user,
      error : false,
      success : true,
      message : "All User Detail"
    })
  } catch (error) {
    res.status(400).json({
      message : error.message || error,
      error : true,
      success : false
     })
  }
}

module.exports = allUsers