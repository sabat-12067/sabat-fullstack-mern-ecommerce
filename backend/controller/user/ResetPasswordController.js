const userModel = require("../../model/userModel");
const bcrypt = require('bcrypt');

const ResetPasswordController = async(req, res)=>{

  try {

    const password = req?.body?.password
    const email = req?.body?.email
    console.log(email, password)
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong");
    }

    const payload = {
      password : hashPassword
    } 
    const options = { new: true };
    const updatedPassword = await userModel.findOneAndUpdate(
      {email : email},
      payload,
      options
    );
    
    res.status(200).json({
      data : updatedPassword,
      message : "Password changed successfully. Please login",
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

module.exports = ResetPasswordController