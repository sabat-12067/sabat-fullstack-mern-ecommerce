const userModel = require("../../model/userModel");

const UpdateuserRole = async (req, res) => {
  // const {userId, role,} = req.body
  // res.send(user)

  try {
    const userId = req.params.id;
    // console.log(userId);
    const updatedData = req.body;
    // console.log(updatedData);
    const options = { new: true };

    const result = await userModel.findByIdAndUpdate(userId, updatedData, options);
    // res.send("Update");

    res.status(200).json({
      data : result,
      message : "Profile updated successfully..!",
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
};

module.exports = UpdateuserRole;
